import { NextRequest } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

import { getAuthenticatedUser } from "@/lib/auth";
import { resolveDocPath } from "@/lib/docs";

function sanitizeFilename(filename: string) {
  const normalized = path.normalize(filename).replace(/^\.\/+/, "");

  if (normalized.includes("..")) {
    return null;
  }

  if (!normalized.toLowerCase().endsWith(".pdf")) {
    return null;
  }

  return normalized;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const safeName = sanitizeFilename(params.filename);

  if (!safeName) {
    return new Response(JSON.stringify({ error: "Invalid document" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const filePath = resolveDocPath(safeName);
    const file = await fs.readFile(filePath);

    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${safeName}"`,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Document not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}

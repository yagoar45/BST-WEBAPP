import { NextRequest } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

import { getAuthenticatedEmail } from "@/lib/auth";
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
  context: { params: Promise<{ filename?: string | string[] }> }
) {
  const { filename } = await context.params;
  const requested = Array.isArray(filename)
    ? filename.map((segment) => decodeURIComponent(segment)).join("/")
    : filename
      ? decodeURIComponent(filename)
      : "";

  const email = await getAuthenticatedEmail();

  if (!email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const safeName = sanitizeFilename(requested);

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

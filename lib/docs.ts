import { promises as fs } from "node:fs";
import path from "node:path";

const DOCS_DIR = path.join(process.cwd(), "docs");

export type DocFile = {
  filename: string;
  title: string;
};

function formatTitle(filename: string) {
  return filename
    .replace(/\.pdf$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export async function listDocs(): Promise<DocFile[]> {
  const entries = await fs.readdir(DOCS_DIR);

  return entries
    .filter((file) => file.toLowerCase().endsWith(".pdf"))
    .map((file) => ({
      filename: file,
      title: formatTitle(file),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function resolveDocPath(filename: string) {
  return path.join(DOCS_DIR, filename);
}

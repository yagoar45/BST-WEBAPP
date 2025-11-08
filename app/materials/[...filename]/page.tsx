import { notFound, redirect } from "next/navigation";

import { getAuthenticatedEmail } from "@/lib/auth";
import { listDocs } from "@/lib/docs";

interface MateriaisDetailPageProps {
  params: Promise<{
    filename?: string | string[];
  }>;
}

export default async function MateriaisDetailPage({
  params,
}: MateriaisDetailPageProps) {
  const resolvedParams = await params;
  const rawParam = resolvedParams.filename;

  const email = await getAuthenticatedEmail();

  if (!email) {
    const requested = Array.isArray(rawParam)
      ? rawParam.map((segment) => decodeURIComponent(segment)).join("/")
      : rawParam
        ? decodeURIComponent(rawParam)
        : "";
    redirect(`/login?redirectTo=/materials/${encodeURIComponent(requested)}`);
  }

  const docs = await listDocs();
  const requestedFile = Array.isArray(rawParam)
    ? rawParam.map((segment) => decodeURIComponent(segment)).join("/")
    : rawParam
      ? decodeURIComponent(rawParam)
      : "";
  const currentDoc = docs.find((doc) => doc.filename === requestedFile);

  if (!currentDoc) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="absolute -left-1/3 top-1/4 hidden h-[35rem] w-[35rem] rounded-full bg-indigo-500/20 blur-[180px] sm:block" aria-hidden />
      <div className="absolute bottom-1/4 -right-1/4 hidden h-[30rem] w-[30rem] rounded-full bg-purple-500/20 blur-[160px] sm:block" aria-hidden />
      <div className="absolute -bottom-20 left-1/2 hidden h-[28rem] w-[40rem] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[220px] sm:block" aria-hidden />

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-8 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.8)] backdrop-blur-2xl sm:gap-8 sm:px-8 sm:py-10">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            document sécurisé
          </p>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">
            {currentDoc.title}
          </h1>
          <p className="text-sm text-white/60">
            Si le lecteur ne s'affiche pas, vous pouvez
            {" "}
            <a
              href={`/api/documents/${encodeURIComponent(requestedFile)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-300 underline decoration-indigo-300/60 underline-offset-4 hover:decoration-indigo-200"
            >
              ouvrir le PDF dans un nouvel onglet
            </a>
            .
          </p>
        </header>

        <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-inner sm:aspect-[4/5] lg:aspect-[4/3]">
          <iframe
            src={`/api/documents/${encodeURIComponent(requestedFile)}`}
            className="h-full w-full border-0"
            title={currentDoc.title}
          />
        </div>
      </main>
    </div>
  );
}

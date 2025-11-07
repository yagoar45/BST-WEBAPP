import { notFound, redirect } from "next/navigation";

import { getAuthenticatedUser } from "@/lib/auth";
import { listDocs } from "@/lib/docs";

interface MateriaisDetailPageProps {
  params: {
    filename: string;
  };
}

export default async function MateriaisDetailPage({
  params,
}: MateriaisDetailPageProps) {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect(`/login?redirectTo=/materiais/${encodeURIComponent(params.filename)}`);
  }

  const docs = await listDocs();
  const currentDoc = docs.find((doc) => doc.filename === params.filename);

  if (!currentDoc) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-12 text-white sm:px-8">
      <div className="absolute -left-1/3 top-1/4 h-[35rem] w-[35rem] rounded-full bg-indigo-500/20 blur-[180px]" aria-hidden />
      <div className="absolute bottom-1/4 -right-1/4 h-[30rem] w-[30rem] rounded-full bg-purple-500/20 blur-[160px]" aria-hidden />
      <div className="absolute -bottom-20 left-1/2 h-[28rem] w-[40rem] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[220px]" aria-hidden />

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8 rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-10 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.8)] backdrop-blur-2xl sm:px-10">
        <header className="space-y-2">
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
              href={`/api/documents/${encodeURIComponent(params.filename)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-300 underline decoration-indigo-300/60 underline-offset-4 hover:decoration-indigo-200"
            >
              ouvrir le PDF dans un nouvel onglet
            </a>
            .
          </p>
        </header>

        <div className="h-[75vh] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-inner">
          <iframe
            src={`/api/documents/${encodeURIComponent(params.filename)}`}
            className="h-full w-full border-0"
            title={currentDoc.title}
          />
        </div>
      </main>
    </div>
  );
}

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
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-12 text-white xs:px-5 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-1/3 top-1/4 hidden h-[32rem] w-[32rem] rounded-full bg-indigo-500/25 blur-[170px] sm:block"
          aria-hidden
        />
        <div
          className="absolute bottom-1/4 -right-1/4 hidden h-[28rem] w-[28rem] rounded-full bg-purple-500/25 blur-[160px] sm:block"
          aria-hidden
        />
        <div
          className="absolute -bottom-24 left-1/2 hidden h-[26rem] w-[36rem] -translate-x-1/2 rounded-full bg-emerald-400/15 blur-[200px] sm:block"
          aria-hidden
        />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-6">
        <section className="rounded-3xl border border-white/10 bg-white/[0.08] px-4 py-6 shadow-[0_30px_90px_-65px_rgba(15,23,42,1)] backdrop-blur-xl xs:px-5 sm:px-7 sm:py-7">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">
            document sécurisé
          </p>
          <h1 className="mt-3 text-2xl font-semibold leading-snug text-white sm:text-3xl">
            {currentDoc.title}
          </h1>
          <p className="mt-3 text-sm text-white/65 sm:text-base">
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
        </section>

        <section className="rounded-[28px] border border-white/10 bg-black/55 p-2 shadow-[0_40px_120px_-70px_rgba(15,23,42,0.9)] backdrop-blur-xl sm:p-3">
          <div
            className="hidden w-full overflow-hidden rounded-[18px] border border-white/10 bg-black/90 shadow-inner sm:block"
            style={{ height: "clamp(70vh, calc(100dvh - 240px), 84vh)" }}
          >
            <iframe
              src={`/api/documents/${encodeURIComponent(requestedFile)}`}
              className="h-full w-full border-0"
              title={currentDoc.title}
            />
          </div>

          <div className="flex flex-col gap-4 rounded-[18px] border border-white/10 bg-white/[0.05] p-5 shadow-inner text-white/80 sm:hidden">
            <p className="text-sm leading-6">
              Pour une lecture optimale sur mobile, ouvrez le document dans un
              nouvel onglet. Vous pourrez zoomer et faire défiler toutes les pages
              sans limitation depuis votre navigateur.
            </p>
            <a
              href={`/api/documents/${encodeURIComponent(requestedFile)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-400"
            >
              Ouvrir le PDF dans un onglet dédié
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

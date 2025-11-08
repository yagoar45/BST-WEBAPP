import Link from "next/link";
import { redirect } from "next/navigation";

import { getAuthenticatedEmail } from "@/lib/auth";
import { listDocs } from "@/lib/docs";

export const metadata = {
  title: "Materiais do Programa",
  description:
    "Acesse os e-books e fichas práticas do Protocole de traitement de l'impuissance.",
};

export default async function MateriaisPage() {
  const email = await getAuthenticatedEmail();

  if (!email) {
    redirect("/login?redirectTo=/materials");
  }

  const docs = await listDocs();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-14 text-white xs:px-5 sm:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/3 top-1/4 hidden h-[35rem] w-[35rem] rounded-full bg-indigo-500/20 blur-[180px] sm:block" aria-hidden />
        <div className="absolute bottom-1/4 -right-1/4 hidden h-[30rem] w-[30rem] rounded-full bg-purple-500/20 blur-[160px] sm:block" aria-hidden />
        <div className="absolute -bottom-20 left-1/2 hidden h-[28rem] w-[40rem] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[220px] sm:block" aria-hidden />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8 rounded-[28px] border border-white/10 bg-white/[0.04] px-4 py-8 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.8)] backdrop-blur-2xl xs:px-5 xs:py-9 sm:gap-10 sm:px-8 sm:py-12 lg:px-14">
        <header className="space-y-4 text-center sm:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            bibliothèque du protocole
          </span>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Vos ressources thérapeutiques
          </h1>
          <p className="text-base text-white/70">
            Explorez les e-books et fiches pratiques disponibles. Cliquez pour les
            consulter en toute sécurité.
          </p>
        </header>

        {docs.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-white/60 sm:p-8">
            Aucun document n'est disponible pour le moment.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {docs.map((doc) => (
              <article
                key={doc.filename}
                className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-[0_25px_80px_-50px_rgba(15,23,42,1)] transition hover:border-white/40 hover:bg-white/[0.08] sm:p-6"
              >
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-white">
                    {doc.title}
                  </h2>
                  <p className="text-sm text-white/60">Format PDF</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                    lecture sécurisée
                  </span>
                  <Link
                    href={`/materials/${encodeURIComponent(doc.filename)}`}
                    className="inline-flex items-center rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400"
                  >
                    Ouvrir
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

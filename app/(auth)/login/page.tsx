import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Connexion | BST",
  description:
    "Accédez à votre espace BST et suivez vos performances en temps réel.",
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black px-6 py-16 text-slate-50">
      <div className="absolute inset-x-10 top-12 -z-10 h-72 rounded-full bg-indigo-500/20 blur-[140px]" aria-hidden />
      <div className="absolute bottom-12 right-12 -z-10 h-56 w-56 rounded-full bg-emerald-500/10 blur-[120px]" aria-hidden />

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_120px_-50px_rgba(15,23,42,0.9)] backdrop-blur-xl">
        <header className="space-y-3 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
            plateforme bst
          </span>
          <h1 className="text-3xl font-semibold text-white">Connexion</h1>
          <p className="text-sm text-white/70">
            Saisissez votre adresse e-mail professionnelle. Nous vous enverrons
            un lien sécurisé pour accéder à votre compte.
          </p>
        </header>

        <form className="mt-10 space-y-6" noValidate>
          <fieldset className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white/80"
            >
              Adresse e-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="prenom.nom@entreprise.fr"
              className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-base text-white placeholder:text-white/40 shadow-[0_10px_40px_-25px_rgba(15,23,42,1)] outline-none transition focus:border-white/60 focus:ring-2 focus:ring-white/30"
            />
          </fieldset>

          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-indigo-500 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300/60"
          >
            Envoyer le lien de connexion
          </button>
        </form>

        <footer className="mt-10 space-y-2 text-center text-xs text-white/50">
          <p>
            Besoin d&apos;aide ?
            <Link
              href="mailto:support@bst.fr"
              className="ml-1 underline decoration-white/30 underline-offset-4 hover:decoration-white/60"
            >
              Contactez notre support
            </Link>
            .
          </p>
          <p>
            En continuant, vous acceptez nos
            <Link
              href="/conditions"
              className="ml-1 underline decoration-white/30 underline-offset-4 hover:decoration-white/60"
            >
              Conditions d&apos;utilisation
            </Link>
            et notre
            <Link
              href="/confidentialite"
              className="ml-1 underline decoration-white/30 underline-offset-4 hover:decoration-white/60"
            >
              Politique de confidentialité
            </Link>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}


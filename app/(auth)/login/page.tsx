import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Connexion – Protocole de traitement de l'impuissance",
  description:
    "Connectez-vous pour suivre vos patients et automatiser vos séquences Protocole de traitement de l'impuissance.",
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <BackgroundGlow />
      <div className="relative z-10 grid min-h-screen w-full grid-cols-1 items-center justify-items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-16">
        <HeroPanel />
        <AuthCard />
      </div>
    </div>
  );
}

function HeroPanel() {
  return (
    <section className="hidden w-full max-w-xl flex-col gap-10 rounded-3xl border border-white/10 bg-white/[0.02] p-10 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.8)] backdrop-blur-xl lg:flex">
      <div className="flex flex-col gap-6">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          protocole bst
        </span>
        <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
          Votre espace patient pour le Protocole de traitement de l'impuissance.
        </h1>
        <p className="text-base text-white/70">
          Accédez à vos e-books, fiches pratiques et rappels quotidiens directement dans la plateforme pour avancer sereinement à chaque étape du programme.
        </p>
      </div>

      <div className="grid gap-4">
        <FeatureHighlight
          title="Bibliothèque guidée"
          description="Consultez les e-books et fiches pédagogiques organisés selon la progression de votre traitement."
        >
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/20 p-3 text-indigo-300">
            <ArrowRight className="h-full w-full" />
          </div>
        </FeatureHighlight>
        <FeatureHighlight
          title="Rappels et soutien"
          description="Recevez des rappels intelligents et des conseils pour rester constant dans vos lectures et exercices."
        >
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 p-3 text-emerald-300">
            <ArrowRight className="h-full w-full" />
          </div>
        </FeatureHighlight>
      </div>
    </section>
  );
}

function AuthCard() {
  return (
    <section className="relative w-full max-w-md">
      <div className="absolute inset-0 -z-[1] rounded-3xl bg-white/10 blur-3xl" aria-hidden />
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/80 via-slate-950/60 to-slate-900/80 p-8 shadow-[0_30px_120px_-40px_rgba(15,23,42,0.9)] backdrop-blur-2xl">
        <header className="flex flex-col gap-3 text-center">
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-white/50">
            espace patient
          </span>
          <h2 className="text-3xl font-semibold text-white">Connectez-vous à votre programme</h2>
          <p className="text-sm text-white/60">
            Entrez l'e-mail que vous avez utilisé lors de votre inscription pour recevoir l'accès à vos contenus du Protocole de traitement de l'impuissance.
          </p>
        </header>

        <form className="mt-10 space-y-6" noValidate>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/80">
              Votre adresse e-mail
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="prenom.nom@email.com"
                className="pl-10 text-white placeholder:text-white/30"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <Button type="submit" className="h-11 w-full text-base font-semibold">
            Recevoir mon lien sécurisé
          </Button>

          <p className="text-xs text-white/50">
            Utilisez la même adresse e-mail que lors de votre achat : nous vous enverrons immédiatement un lien pour accéder à vos e-books et fiches d'exercices dans la plateforme, sans mot de passe.
          </p>
        </form>

        <footer className="mt-10 flex flex-col gap-3 text-center text-xs text-white/40">
          <p>
            Vous n'avez pas reçu vos identifiants ?
            <Link href="mailto:contact@votresante.site" className="ml-1 underline decoration-white/30 underline-offset-4 hover:decoration-white/60">
              Écrivez-nous
            </Link>
            et nous vous aiderons à accéder au programme.
          </p>
          <p>
            En vous connectant, vous acceptez nos
            <Link href="/conditions" className="ml-1 underline decoration-white/30 underline-offset-4 hover:decoration-white/60">
              Conditions d'utilisation
            </Link>
            et notre
            <Link href="/confidentialite" className="ml-1 underline decoration-white/30 underline-offset-4 hover:decoration-white/60">
              Politique de confidentialité
            </Link>
            .
          </p>
        </footer>
      </div>
    </section>
  );
}

function FeatureHighlight({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <article className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_15px_70px_-40px_rgba(15,23,42,1)]">
      <div>{children}</div>
      <div className="space-y-1">
        <h3 className="text-base font-medium text-white">{title}</h3>
        <p className="text-sm text-white/60">{description}</p>
      </div>
    </article>
  );
}

function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-1/3 top-1/4 h-[35rem] w-[35rem] rounded-full bg-indigo-500/20 blur-[180px]" aria-hidden />
      <div className="absolute bottom-1/4 -right-1/4 h-[30rem] w-[30rem] rounded-full bg-purple-500/20 blur-[160px]" aria-hidden />
      <div className="absolute -bottom-20 left-1/2 h-[28rem] w-[40rem] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[220px]" aria-hidden />
    </div>
  );
}

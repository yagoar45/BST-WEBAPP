import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description:
    "Consultez les conditions générales d'utilisation de la plateforme Protocole de traitement de l'impuissance.",
};

export default function TermsPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <BackgroundGlow />
      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-3xl border border-white/10 bg-white/[0.04] px-8 py-16 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.8)] backdrop-blur-2xl sm:px-12">
        <section className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Protocole de traitement de l'impuissance
            </p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">
              Conditions d&apos;utilisation
            </h1>
            <p className="text-sm text-white/40">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
            </p>
          </div>
          <p className="text-base leading-7 text-white/70">
            Ces conditions d&apos;utilisation décrivent les règles essentielles qui encadrent l&apos;accès et l&apos;usage de la
            plateforme dédiée au Protocole de traitement de l&apos;impuissance. En vous connectant ou en utilisant nos
            services, vous reconnaissez avoir lu, compris et accepté les présentes conditions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">1. Accès au service</h2>
          <p className="text-base leading-7 text-white/70">
            L&apos;accès est strictement réservé aux patients ayant acquis le programme. L&apos;usage de la plateforme est
            personnel et ne peut être partagé avec des tiers. Nous pouvons suspendre ou interrompre votre accès en cas
            d&apos;utilisation frauduleuse, abusive ou contraire aux présentes conditions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">2. Contenus</h2>
          <p className="text-base leading-7 text-white/70">
            Tous les contenus disponibles (e-books, fiches pratiques, rappels et ressources) sont protégés par les lois
            relatives à la propriété intellectuelle. Il est interdit de copier, distribuer, revendre ou diffuser ces
            contenus sans autorisation écrite préalable.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">3. Responsabilités</h2>
          <p className="text-base leading-7 text-white/70">
            Les informations proposées sont à visée éducative. Elles ne remplacent pas l&apos;avis, le diagnostic ou la
            prise en charge personnalisée d&apos;un professionnel de santé. Vous restez responsable de votre parcours
            thérapeutique et de l&apos;application des recommandations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">4. Données personnelles</h2>
          <p className="text-base leading-7 text-white/70">
            Nous collectons uniquement les données nécessaires à votre authentification et au suivi de votre
            progression. Pour en savoir plus sur l&apos;usage de vos informations, veuillez consulter notre
            {" "}
            <Link href="/confidentialite" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white/60">
              Politique de confidentialité
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">5. Évolution du service</h2>
          <p className="text-base leading-7 text-white/70">
            Nous pouvons faire évoluer les fonctionnalités, suspendre ou modifier temporairement l&apos;accès à certains
            contenus pour maintenance ou amélioration du programme. Dans la mesure du possible, vous serez informé à
            l&apos;avance de tout changement majeur.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">6. Contact</h2>
          <p className="text-base leading-7 text-white/70">
            Pour toute question à propos de ces conditions, vous pouvez nous contacter à l&apos;adresse
            {" "}
            <a
              href="mailto:contact@votresante.site"
              className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white/60"
            >
              contact@votresante.site
            </a>
            .
          </p>
        </section>
      </main>
    </div>
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

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Découvrez comment nous protégeons vos données personnelles au sein du Protocole de traitement de l'impuissance.",
};

export default function PrivacyPage() {
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
              Politique de confidentialité
            </h1>
            <p className="text-sm text-white/40">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
            </p>
          </div>
          <p className="text-base leading-7 text-white/70">
            Cette politique de confidentialité présente la manière dont nous collectons, utilisons et protégeons vos
            données lorsque vous accédez à la plateforme du Protocole de traitement de l&apos;impuissance. Nous nous
            engageons à respecter votre vie privée et à assurer la sécurité de vos informations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">1. Données collectées</h2>
          <p className="text-base leading-7 text-white/70">
            Nous collectons uniquement les données strictement nécessaires à la création de votre compte patient, à
            votre authentification et au suivi de votre progression : nom, adresse e-mail, informations liées à vos
            achats et interactions avec les contenus mis à disposition.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">2. Utilisation des données</h2>
          <p className="text-base leading-7 text-white/70">
            Vos informations servent à vous authentifier, personnaliser votre expérience, vous envoyer des rappels,
            mesurer votre progression et améliorer la qualité du programme. Nous ne vendons ni ne louons vos données à
            des tiers.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">3. Partage des données</h2>
          <p className="text-base leading-7 text-white/70">
            Vos données peuvent être partagées avec des prestataires de services strictement nécessaires au bon
            fonctionnement de la plateforme (hébergement, service e-mail, analytics). Ces partenaires sont soumis à des
            obligations de confidentialité et de sécurité conformes à la réglementation.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">4. Sécurité</h2>
          <p className="text-base leading-7 text-white/70">
            Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données
            contre toute perte, accès non autorisé ou divulgation. Malgré nos efforts, aucun système n&apos;est totalement
            inviolable ; nous vous encourageons à contacter notre équipe en cas de suspicion d&apos;usage abusif.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">5. Conservation des données</h2>
          <p className="text-base leading-7 text-white/70">
            Vos informations sont conservées pendant la durée de votre accès au programme et peuvent être archivées pour
            des obligations légales ou des finalités statistiques. Vous pouvez demander la suppression de vos données en
            nous contactant.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">6. Vos droits</h2>
          <p className="text-base leading-7 text-white/70">
            Conformément à la réglementation, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
            limitation et d&apos;opposition au traitement de vos données, ainsi qu&apos;d&apos;un droit à la portabilité. Vous pouvez
            exercer ces droits en nous écrivant à l&apos;adresse suivante :
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

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">7. Modifications</h2>
          <p className="text-base leading-7 text-white/70">
            Nous pouvons mettre à jour cette politique pour refléter les évolutions légales ou fonctionnelles de notre
            service. La date de dernière mise à jour est indiquée en haut de la page et, en cas de changement majeur, nous
            vous en informerons par e-mail ou notification dans la plateforme.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">8. Contact</h2>
          <p className="text-base leading-7 text-white/70">
            Pour toute question relative à cette politique ou à la gestion de vos données personnelles, vous pouvez nous
            écrire à l&apos;adresse
            {" "}
            <a
              href="mailto:contact@votresante.site"
              className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white/60"
            >
              contact@votresante.site
            </a>
            .
          </p>
          <p className="text-sm text-white/40">
            Vous pouvez également consulter nos
            {" "}
            <Link href="/conditions" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white/60">
              Conditions d'utilisation
            </Link>
            {" "}
            pour plus d&apos;informations sur le cadre contractuel de la plateforme.
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

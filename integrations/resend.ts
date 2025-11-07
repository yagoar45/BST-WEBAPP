import { Resend } from "resend";

import ProtocoleEmail from "./mail";
import { render } from "@react-email/render";

const resendApiKey =
  process.env.NEXT_RESEND_API_KEY ?? process.env.RESEND_API_KEY;

if (!resendApiKey) {
  throw new Error(
    "Missing NEXT_RESEND_API_KEY (or RESEND_API_KEY) environment variable"
  );
}

const resend = new Resend(resendApiKey);

const DEFAULT_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "support@votresante.site";
const APP_BASE_URL =
  process.env.APP_BASE_URL ?? "https://app.votresante.site";

type WelcomeEmailPayload = {
  email: string;
  name?: string | null;
};

export async function sendWelcomeEmail({
  email,
  name,
}: WelcomeEmailPayload) {
  const safeName = name?.trim();
  const greeting = safeName ? `Bonjour ${safeName},` : "Bonjour,";

  const subject =
    "Votre accès au Protocole de traitement de l'impuissance est prêt";

  const html = render(
    ProtocoleEmail({ name: safeName ?? undefined, appUrl: APP_BASE_URL })
  );

  const text = `${greeting}

Merci pour votre confiance. Votre accès à la plateforme du Protocole de traitement de l'impuissance est désormais actif.

Pour commencer, rendez-vous sur ${APP_BASE_URL} et connectez-vous avec l'adresse e-mail utilisée lors de votre achat. Aucun mot de passe n'est nécessaire : vous recevrez un lien sécurisé directement dans votre boîte mail.

Besoin d'aide ? Écrivez-nous à contact@votresante.site.

À très vite,
L'équipe Votre Santé`;

  await resend.emails.send({
    from: DEFAULT_FROM_EMAIL,
    to: email,
    subject,
    html: await html,
    text,
  });
}
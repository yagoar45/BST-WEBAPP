import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

const ProtocoleEmail = (props: { name?: string; appUrl?: string }) => {
  const appUrl = props.appUrl ?? "https://app.votresante.site";
  return (
    <Html lang="fr" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Votre accès à la plateforme Votre Santé est maintenant actif</Preview>
        <Body className="font-sans bg-black py-[40px]">
          <Container className="max-w-[600px] mx-auto bg-gray-900 rounded-[12px] overflow-hidden">
            
            {/* Header avec logo stylisé */}
            <Section className="bg-gradient-to-r from-gray-800 to-gray-700 py-[32px] px-[24px] text-center">
              <Heading className="text-white text-[32px] font-bold m-0 tracking-wide">
                Votre Santé
              </Heading>
              <Text className="text-gray-300 text-[14px] m-0 mt-[8px] font-light">
                Protocole de traitement de l'impuissance
              </Text>
            </Section>

            {/* Contenu principal */}
            <Section className="px-[32px] py-[40px]">
              
              {/* Saudação personalizada com fallback */}
              <Text className="text-white text-[18px] mb-[24px] m-0">
                {/* Variable dynamique: utiliser {{name}} si disponible */}
                {props.name ? `Bonjour ${props.name},` : 'Bonjour,'}
              </Text>

              {/* Confirmation d'accès */}
              <Text className="text-gray-200 text-[16px] leading-[24px] mb-[24px] m-0">
                Nous avons le plaisir de vous confirmer que <strong className="text-white">votre accès à la plateforme est maintenant actif</strong>. 
                Vous pouvez désormais accéder à l'ensemble de vos ressources exclusives du protocole de traitement.
              </Text>

              <Text className="text-gray-200 text-[16px] leading-[24px] mb-[32px] m-0">
                Pour votre sécurité, la connexion se fait exclusivement via votre adresse e-mail grâce à notre système de <strong className="text-white">lien magique sécurisé</strong>.
              </Text>

              {/* Bouton CTA principal */}
              <Section className="text-center mb-[40px]">
                <Button
                  href={appUrl}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-[16px] px-[32px] rounded-[8px] text-[16px] no-underline box-border inline-block transition-colors"
                >
                  Accéder à la plateforme
                </Button>
              </Section>

              {/* Instructions étape par étape */}
              <Section className="bg-gray-800 rounded-[8px] p-[24px] mb-[32px] border border-gray-700">
                <Heading className="text-white text-[20px] font-semibold mb-[16px] m-0">
                  Comment accéder à vos ressources :
                </Heading>
                
                <Text className="text-gray-300 text-[15px] leading-[22px] mb-[12px] m-0">
                  <strong className="text-white">1.</strong> Cliquez sur le bouton "Accéder à la plateforme" ci-dessus
                </Text>
                
                <Text className="text-gray-300 text-[15px] leading-[22px] mb-[12px] m-0">
                  <strong className="text-white">2.</strong> Saisissez l'adresse e-mail utilisée lors de votre achat
                </Text>
                
                <Text className="text-gray-300 text-[15px] leading-[22px] mb-[12px] m-0">
                  <strong className="text-white">3.</strong> Vérifiez votre boîte mail pour recevoir le lien sécurisé
                </Text>
                
                <Text className="text-gray-300 text-[15px] leading-[22px] m-0">
                  <strong className="text-white">4.</strong> Accédez instantanément à vos ebooks et fiches pratiques
                </Text>
              </Section>

              {/* Section Support */}
              <Section className="border-t border-gray-700 pt-[24px] mb-[24px]">
                <Heading className="text-white text-[18px] font-semibold mb-[12px] m-0">
                  Besoin d'aide ?
                </Heading>
                <Text className="text-gray-300 text-[15px] leading-[22px] m-0">
                  Notre équipe support est à votre disposition : 
                  <strong className="text-white"> contact@votresante.site</strong>
                </Text>
              </Section>

            </Section>

            {/* Rodapé discreto */}
            <Section className="bg-gray-800 px-[32px] py-[24px] text-center border-t border-gray-700">
              <Text className="text-gray-400 text-[12px] m-0">
                © 2024 Votre Santé. Tous droits réservés.
              </Text>
              <Text className="text-gray-500 text-[11px] m-0 mt-[8px]">
                Cet e-mail contient des informations confidentielles destinées uniquement au destinataire.
              </Text>
            </Section>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ProtocoleEmail.PreviewProps = {
  name: "{{name}}",
  appUrl: "https://app.votresante.site",
};

export default ProtocoleEmail;
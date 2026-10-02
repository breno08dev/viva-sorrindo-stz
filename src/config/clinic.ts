/**
 * CONFIGURAÇÃO CENTRAL DA CLÍNICA
 * ------------------------------------------------------------
 * Substitua os valores entre [COLCHETES] pelos dados reais.
 * Enquanto `confirmed` estiver false, dados estruturados (JSON-LD),
 * mapa e links de WhatsApp/telefone NÃO são exibidos como verdade.
 */
export const clinic = {
  /** Mude para true somente quando TODOS os dados abaixo forem reais e revisados. */
  confirmed: false,

  name: "[NOME DA CLÍNICA]",
  shortName: "[NOME]",
  city: "[CIDADE]",
  state: "[UF]",
  address: {
    street: "[ENDEREÇO]",
    neighborhood: "[BAIRRO]",
    zip: "[CEP]",
  },
  /** Somente dígitos com DDI, ex.: "5511999999999". Vazio = não configurado. */
  whatsappNumber: "",
  whatsappMessage: "Olá! Gostaria de agendar uma avaliação.",
  /** Ex.: "+55 11 3333-3333". Vazio = não configurado. */
  phone: "",
  phoneDisplay: "[TELEFONE]",
  email: "",
  hours: [] as { days: string; time: string }[], // ex.: { days: "Seg a Sex", time: "8h às 18h" }
  hoursPlaceholder: "[HORÁRIOS]",
  social: {
    instagram: "", // ex.: "https://instagram.com/suaclinica"
  },
  googleBusinessUrl: "", // [LINK GOOGLE BUSINESS PROFILE]
  /** URL de incorporação do Google Maps (iframe src). Vazio = mapa oculto. */
  mapEmbedUrl: "",
  siteUrl: "https://www.exemplo.com.br", // [URL DO SITE]
  technicalResponsible: "[RESPONSÁVEL TÉCNICO — CRO/UF 00000]",
  accessibilityInfo: "",
  parkingInfo: "",
  /** Diferenciais: preencha somente os confirmados pela clínica. */
  highlights: [
    { title: "Atendimento humanizado", text: "[Descreva como a clínica acolhe cada paciente.]" },
    { title: "Equipe especializada", text: "[Informe especialidades confirmadas da equipe.]" },
    { title: "Estrutura moderna", text: "[Descreva a estrutura e equipamentos reais.]" },
  ],
} as const;

export const isSet = (v: string | undefined | null) => !!v && !v.startsWith("[");

export function whatsappUrl(message: string = clinic.whatsappMessage) {
  if (!clinic.whatsappNumber) return null;
  return `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const cityLabel = `${clinic.city}/${clinic.state}`;

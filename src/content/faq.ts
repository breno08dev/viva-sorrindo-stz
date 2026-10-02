/** FAQ — respostas PROVISÓRIAS, revisar com o dentista responsável. */
const R = "[Resposta provisória — substituir pela informação real da clínica e revisar com o dentista.]";

export const faqCategories: { name: string; items: { q: string; a: string }[] }[] = [
  {
    name: "Agendamento",
    items: [
      { q: "Como faço para agendar uma avaliação?", a: `Você pode solicitar um horário pelo WhatsApp ou pela página de contato. A consulta só é considerada marcada após a confirmação da equipe. ${R}` },
      { q: "Posso remarcar ou cancelar?", a: R },
    ],
  },
  {
    name: "Pagamentos",
    items: [
      { q: "Quais formas de pagamento são aceitas?", a: R },
      { q: "A clínica atende convênios?", a: R },
    ],
  },
  {
    name: "Atendimento",
    items: [
      { q: "Qual é o horário de atendimento?", a: R },
      { q: "Vocês atendem crianças?", a: R },
    ],
  },
  {
    name: "Localização",
    items: [
      { q: "Onde a clínica fica?", a: R },
      { q: "Há estacionamento no local?", a: R },
    ],
  },
  {
    name: "Procedimentos",
    items: [
      { q: "Preciso de avaliação antes de qualquer tratamento?", a: `Sim. A indicação e o planejamento de qualquer tratamento dependem de avaliação profissional. ${R}` },
      { q: "Os tratamentos doem?", a: `Cada caso é diferente; converse com o profissional sobre conforto e anestesia durante a avaliação. ${R}` },
    ],
  },
  {
    name: "Cuidados",
    items: [
      { q: "Com que frequência devo ir ao dentista?", a: R },
      { q: "Quais cuidados ter após um procedimento?", a: R },
    ],
  },
];

export const homeFaq = faqCategories.flatMap((c) => c.items).slice(0, 5);

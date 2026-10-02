# Como editar o site

- **Dados da clínica** (nome, cidade, endereço, telefone, WhatsApp, horários, Instagram, Google, mapa, URL): `src/config/clinic.ts`. Ao concluir, mude `confirmed` para `true` — isso libera indexação, JSON-LD e mapa.
- **Cores e fontes**: variáveis em `src/styles.css` (`:root`) e link de fontes em `src/routes/__root.tsx`.
- **Logo**: componente `Logo` em `src/components/site/Header.tsx`; favicon em `public/favicon.ico`.
- **Tratamentos**: `src/content/services.ts`.
- **Profissionais**: `src/content/team.ts`.
- **FAQ**: `src/content/faq.ts`.
- **Blog**: `src/content/blog.ts` (`draft: false` para publicar).
- **Formulário de contato**: `src/routes/contato.tsx` (`FORM_ENDPOINT_CONFIGURED`) — integrar a um backend seguro.
- **Fotos**: substitua as imagens em `src/assets/` por fotos reais.
- **robots.txt**: `public/robots.txt` (atualizar domínio).

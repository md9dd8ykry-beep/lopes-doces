/* =========================================================
   LOPES DOCES — CONFIGURAÇÕES DO SITE
   ---------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa editar para
   atualizar links, número do WhatsApp e fotos da galeria.
   ========================================================= */

const CONFIG = {

  /* ---------- WHATSAPP ----------
     Só números, com DDI (55) + DDD + número.
     Exemplo: "5565999998888"
     Enquanto estiver como "PREENCHER", o botão avisa que o
     número ainda não foi configurado. */
  WHATSAPP_NUMERO: "5566996997435",

  /* Mensagem enviada pelo botão "Conversar pelo WhatsApp" (página inicial) */
  WHATSAPP_MSG_CONTATO: "Olá! Vim através do site da Lopes Doces.",

  /* Mensagem enviada pelo botão de orçamento (página de festas) */
  WHATSAPP_MSG_ORCAMENTO:
    "Olá! Vim através do site da Lopes Doces e gostaria de solicitar um orçamento de docinhos para festa. Poderiam me enviar o cardápio de sabores e valores?",

  /* ---------- INSTADELIVERY ----------
     Cole aqui o link completo do cardápio, começando com https://
     Enquanto estiver como "PREENCHER", o botão avisa que o link
     ainda não foi configurado. */
  INSTADELIVERY_URL: "https://instadelivery.com.br/lopesdocedocesartesanais",

  /* ---------- INSTAGRAM ---------- */
  INSTAGRAM_URL: "https://www.instagram.com/lopesdoces_2026/",
  INSTAGRAM_USUARIO: "@lopesdoces_2026",

  /* ---------- GALERIA DE DOCINHOS PARA FESTAS ----------
     Para adicionar uma foto nova:
       1. Coloque o arquivo na pasta assets/festas/
       2. Acrescente uma linha abaixo com o nome do arquivo e
          uma descrição curta (usada por leitores de tela).
     A galeria se monta sozinha a partir desta lista. */
  FOTOS_FESTAS: [
    { arquivo: "docinhos-festa-01.jpg", descricao: "Caixa com docinhos artesanais da Lopes Doces enfileirados em forminhas" },
    { arquivo: "docinhos-festa-02.jpg", descricao: "Bandeja com variedade de docinhos artesanais para festa" },
    { arquivo: "docinhos-festa-03.jpg", descricao: "Docinho em forminha laranja em formato de flor" },
    { arquivo: "docinhos-festa-04.jpg", descricao: "Docinho em forminha azul-marinho em formato de flor" },
    { arquivo: "docinhos-festa-05.jpg", descricao: "Docinho em forminha azul-clara em formato de flor" }
  ]
};

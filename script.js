/* =========================================================
   LOPES DOCES — FUNCIONAMENTO DO SITE
   Os dados (número, links, fotos) ficam em config.js.
   Aqui só fica a lógica — normalmente não precisa mexer.
   ========================================================= */

(function () {
  "use strict";

  /* Ícones usados pelo JavaScript (lupa, setas, fechar) */
  const ICONES = {
    lupa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5M11 8v6M8 11h6"/></svg>'
  };

  /* ---------------------------------------------------------
     1. Utilitários
     --------------------------------------------------------- */

  // Retorna true se o valor ainda não foi preenchido em config.js
  function naoConfigurado(valor) {
    return !valor || valor === "PREENCHER";
  }

  // Mostra um aviso discreto na parte de baixo da tela
  let avisoTimer;
  function mostrarAviso(mensagem) {
    let aviso = document.querySelector(".aviso");
    if (!aviso) {
      aviso = document.createElement("div");
      aviso.className = "aviso";
      aviso.setAttribute("role", "status");
      aviso.setAttribute("aria-live", "polite");
      document.body.appendChild(aviso);
    }
    aviso.textContent = mensagem;
    // pequeno atraso para a animação funcionar
    requestAnimationFrame(() => aviso.classList.add("visivel"));
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(() => aviso.classList.remove("visivel"), 3500);
  }

  // Monta o link do WhatsApp com mensagem pronta
  function linkWhatsApp(mensagem) {
    const numero = String(CONFIG.WHATSAPP_NUMERO).replace(/\D/g, "");
    return "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);
  }

  /* ---------------------------------------------------------
     2. Links (WhatsApp, InstaDelivery, Instagram)
     Cada link no HTML tem um atributo data-link dizendo o tipo.
     --------------------------------------------------------- */
  function configurarLinks() {
    document.querySelectorAll("[data-link]").forEach(function (el) {
      const tipo = el.dataset.link;
      let url = null;
      let pendente = null; // mensagem de aviso se ainda faltar o dado

      if (tipo === "whatsapp-contato" || tipo === "whatsapp-orcamento") {
        if (naoConfigurado(CONFIG.WHATSAPP_NUMERO)) {
          pendente = "O número do WhatsApp ainda não foi configurado (config.js).";
        } else {
          const msg = tipo === "whatsapp-orcamento"
            ? CONFIG.WHATSAPP_MSG_ORCAMENTO
            : CONFIG.WHATSAPP_MSG_CONTATO;
          url = linkWhatsApp(msg);
        }
      } else if (tipo === "instadelivery") {
        if (naoConfigurado(CONFIG.INSTADELIVERY_URL)) {
          pendente = "O link do InstaDelivery ainda não foi configurado (config.js).";
        } else {
          url = CONFIG.INSTADELIVERY_URL;
        }
      } else if (tipo === "instagram") {
        url = CONFIG.INSTAGRAM_URL;
      }

      if (url) {
        el.href = url;
        el.target = "_blank";                 // abre em nova aba
        el.rel = "noopener noreferrer";
      } else if (pendente) {
        el.href = "#";
        el.dataset.pendente = "true";
        el.addEventListener("click", function (e) {
          e.preventDefault();
          mostrarAviso(pendente);
        });
      }
    });

    // Usuário do Instagram em qualquer lugar marcado com data-instagram-usuario
    document.querySelectorAll("[data-instagram-usuario]").forEach(function (el) {
      el.textContent = CONFIG.INSTAGRAM_USUARIO;
    });
  }

  /* ---------------------------------------------------------
     3. Galeria de festas — montada a partir de CONFIG.FOTOS_FESTAS
     --------------------------------------------------------- */
  function montarGaleriaFestas() {
    const lista = document.getElementById("galeria-festas");
    if (!lista || !Array.isArray(CONFIG.FOTOS_FESTAS)) return;

    CONFIG.FOTOS_FESTAS.forEach(function (foto, i) {
      const src = foto.arquivo; // fotos ficam na mesma pasta do site
      const descricao = foto.descricao || "Docinhos para festas da Lopes Doces";

      // Criado elemento por elemento (aceita qualquer texto na descrição com segurança)
      const li = document.createElement("li");
      const botao = document.createElement("button");
      botao.type = "button";
      botao.dataset.ampliar = src;
      botao.setAttribute("aria-label", "Ampliar foto " + (i + 1) + ": " + descricao);

      const img = document.createElement("img");
      img.src = src;
      img.alt = descricao;
      img.loading = i < 3 ? "eager" : "lazy"; // as primeiras aparecem logo
      img.decoding = "async";
      img.width = 900;
      img.height = 1600;

      const lupa = document.createElement("span");
      lupa.className = "lupa";
      lupa.innerHTML = ICONES.lupa; // ícone fixo, definido acima

      botao.append(img, lupa);
      li.appendChild(botao);
      lista.appendChild(li);
    });
  }

  /* ---------------------------------------------------------
     4. Lightbox — ampliação das fotos
     Funciona com qualquer botão data-ampliar dentro de um
     elemento data-galeria. Setas, teclado e deslizar o dedo.
     --------------------------------------------------------- */
  function configurarLightbox() {
    const lb = document.getElementById("lightbox");
    if (!lb) return;

    const img = lb.querySelector("img");
    const contador = lb.querySelector(".lightbox-contador");
    const btnFechar = lb.querySelector(".lightbox-fechar");
    const btnAnt = lb.querySelector(".lightbox-anterior");
    const btnProx = lb.querySelector(".lightbox-proxima");

    let fotos = [];        // lista de {src, alt} do grupo aberto
    let atual = 0;
    let ultimoFoco = null; // para devolver o foco ao fechar

    function mostrar(i) {
      atual = (i + fotos.length) % fotos.length;
      img.src = fotos[atual].src;
      img.alt = fotos[atual].alt;
      contador.textContent = (atual + 1) + " de " + fotos.length;
      const varias = fotos.length > 1;
      btnAnt.hidden = !varias;
      btnProx.hidden = !varias;
      contador.hidden = !varias;
    }

    function abrir(grupo, i) {
      fotos = Array.from(grupo.querySelectorAll("[data-ampliar]")).map(function (b) {
        const miniatura = b.querySelector("img");
        return { src: b.dataset.ampliar, alt: miniatura ? miniatura.alt : "" };
      });
      ultimoFoco = document.activeElement;
      mostrar(i);
      lb.classList.add("aberto");
      lb.setAttribute("aria-hidden", "false");
      document.body.classList.add("sem-rolagem");
      btnFechar.focus();
    }

    function fechar() {
      lb.classList.remove("aberto");
      lb.setAttribute("aria-hidden", "true");
      document.body.classList.remove("sem-rolagem");
      if (ultimoFoco) ultimoFoco.focus();
    }

    // Clique nas miniaturas
    document.addEventListener("click", function (e) {
      const botao = e.target.closest("[data-ampliar]");
      if (!botao) return;
      const grupo = botao.closest("[data-galeria]") || document;
      const todos = Array.from(grupo.querySelectorAll("[data-ampliar]"));
      abrir(grupo, todos.indexOf(botao));
    });

    btnFechar.addEventListener("click", fechar);
    btnAnt.addEventListener("click", function () { mostrar(atual - 1); });
    btnProx.addEventListener("click", function () { mostrar(atual + 1); });

    // Clicar no fundo escuro fecha
    lb.addEventListener("click", function (e) {
      if (e.target === lb) fechar();
    });

    // Teclado: Esc fecha, setas navegam, Tab fica dentro do lightbox
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("aberto")) return;
      if (e.key === "Escape") fechar();
      if (e.key === "ArrowLeft") mostrar(atual - 1);
      if (e.key === "ArrowRight") mostrar(atual + 1);
      if (e.key === "Tab") {
        const focaveis = Array.from(lb.querySelectorAll("button:not([hidden])"));
        const i = focaveis.indexOf(document.activeElement);
        e.preventDefault();
        const prox = e.shiftKey ? i - 1 : i + 1;
        focaveis[(prox + focaveis.length) % focaveis.length].focus();
      }
    });

    // Deslizar o dedo no celular
    let inicioX = null;
    lb.addEventListener("touchstart", function (e) { inicioX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (inicioX === null) return;
      const dx = e.changedTouches[0].clientX - inicioX;
      if (Math.abs(dx) > 50) mostrar(dx < 0 ? atual + 1 : atual - 1);
      inicioX = null;
    });
  }

  /* ---------------------------------------------------------
     5. Ano atual no rodapé
     --------------------------------------------------------- */
  function anoRodape() {
    document.querySelectorAll("[data-ano]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* Inicia tudo quando a página carregar */
  document.addEventListener("DOMContentLoaded", function () {
    montarGaleriaFestas();
    configurarLinks();
    configurarLightbox();
    anoRodape();
  });
})();

# Site Lopes Doces — versão de demonstração (não publicada)

## Como abrir no navegador (sem instalar nada)
1. Descompacte o arquivo `lopes-doces.zip`.
2. Abra a pasta `lopes-doces` e dê dois cliques em `index.html`.
3. O site abre no navegador. Daí dá para ir para a página de festas pelo botão.

No celular: envie a pasta para o computador e abra por lá. Também dá para ver
no modo celular do Chrome: aperte F12 e clique no ícone de celular.

## Estrutura
```
lopes-doces/
├── index.html            página inicial
├── festas.html           docinhos para festas
├── css/style.css         visual (cores no topo do arquivo)
├── css/fonte-montserrat.css  fonte embutida (não precisa editar)
├── js/config.js          ← ÚNICO arquivo para editar links, WhatsApp e fotos
├── js/script.js          funcionamento (links, galeria, ampliação)
└── assets/
    ├── logo-lopes-doces.webp / .png  (webp é mais leve; png é reserva)
    ├── foto-principal.jpg
    ├── favicon.png / apple-touch-icon.png
    ├── produtos/         fotos da faixa "delícias" da página inicial
    ├── festas/           fotos da galeria de festas
    └── fonts/            fonte Montserrat (local, licença OFL)
```

## Dados em `js/config.js`
| Campo | O que colocar | Exemplo |
|---|---|---|
| `WHATSAPP_NUMERO` | DDI + DDD + número (só números) | `"5566996997435"` (configurado) |
| `INSTADELIVERY_URL` | link completo do cardápio | `https://instadelivery.com.br/lopesdocedocesartesanais` (configurado) |

Se algum deles voltar a ficar como `"PREENCHER"`, o botão mostra um aviso
"ainda não foi configurado" em vez de abrir um link quebrado.

## Como adicionar fotos na galeria de festas
1. Coloque a foto em `assets/festas/` (ex.: `docinhos-festa-06.jpg`).
   Dica: deixe com no máximo ~1000 px de largura para carregar rápido.
2. Em `js/config.js`, na lista `FOTOS_FESTAS`, acrescente:
   `{ arquivo: "docinhos-festa-06.jpg", descricao: "Descrição curta da foto" },`

A galeria se monta sozinha.

## Observações
- A logo não foi alterada: só foi removido o excesso de fundo rosa liso ao
  redor dela (o arquivo original era vertical, com muito espaço vazio).
- Nenhum preço, sabor, prazo ou condição comercial foi inventado.
- Ao publicar: troque o caminho da `og:image` (no topo de index.html e festas.html)
  pelo endereço completo, para a prévia aparecer ao compartilhar o link.
- O site não foi publicado.

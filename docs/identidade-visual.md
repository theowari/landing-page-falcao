# Identidade visual da Somark Mídia

Este é o documento de referência da identidade visual do site. Quando houver dúvida de cor, fonte, forma ou tom, vale o que está aqui.

- **Origem:** o media kit da Somark Mídia (PDF, 6 slides), escolhido pelo cliente como a identidade a seguir. O PDF não é um manual de marca: ele não define papéis de cor, regras de logo nem tipografia. Por isso o que vem do PDF está marcado como **do PDF**, e o que foi definido depois, para o site funcionar, está marcado como **definido no projeto**.
- **Onde está implementado:** os valores abaixo vivem como variáveis CSS em `prototipos/v2/css/styles.css` (bloco `:root`).
- **O PDF original** foi removido do repositório depois que tudo foi extraído para cá. Se precisar dele: `git show c071087:docs/identidade-visual.pdf > somark-kit.pdf`.

---

## 1. Essência

- **Quem:** Somark Mídia, agência criativa e orientada por dados, fundada por Sergio Godoy. Gestão de redes, estratégia, criação de conteúdo, filmagens e fotos.
- **Sensação:** confiança e proximidade. Mais agência do que autor, mais tech do que corporativo frio.
- **Ideia que costura o site:** "Somark" lê-se como **somar + mark**. Números com "+", quatro frentes que somam, briefing + roteiro + aprovação = execução, cada plano soma ao anterior. Vale usar o "+" como recurso de texto, sempre com sentido, nunca como enfeite.
- **Frases da marca (do PDF):** "Cresça conosco!", "Marketing digital é mais do que números!", "Vamos crescer juntos?".

---

## 2. Cor

Verde é a cor da marca. Toda cor é **chapada**: sem degradê, sem sombra, sem linha fina. Um bloco se separa do outro por **degrau de tom**.

### 2.1 Cores da marca (do PDF)

| Nome | Hex | Origem e uso |
|---|---|---|
| **Verde da marca** | `#3F523D` | Presente em todos os slides. É o campo principal: faixas, rodapé, destaques, texto claro por cima |
| **Verde vivo** | `#247D1A` | Slides 1 a 4. Usado em sinais pequenos: ícones e o "+" sobre fundo claro, um bloco do rodapé |
| **Neon** | `#00FF8C` | Slide de planos. É o **acento**: botão de ação e o plano em destaque. Nunca como cor de texto sobre fundo claro |
| **Menta** | `#D9FFEE` | Ponta clara do fundo do slide de planos. Reservada, ainda não usada no site |
| **Sálvia do logo** | `#DCE0DC` | Letras "rk" do logo (medida no arquivo do logo) |
| Preto e branco | `#000000` e `#FFFFFF` | Presentes nos slides. No site viram os tons de tinta e de papel abaixo |

### 2.2 Tons de apoio (definidos no projeto)

Derivados do verde da marca, para ter degraus de tom entre os blocos.

| Variável | Hex | Papel |
|---|---|---|
| `--desk` | `#E4EBE2` | Fundo da página, em volta do quadro |
| `--tile` | `#F6F9F5` | Bloco claro |
| `--tile-2` | `#DCE6D9` | Bloco um degrau mais escuro |
| `--sage` | `#7E967A` | Verde acinzentado, tom intermediário |
| `--field` | `#3F523D` | Verde da marca, campo cheio |
| `--night` / `--night-2` | `#18231B` / `#1F2C22` | Verde quase preto, palco dos vídeos e das linhas escuras |
| `--ink` | `#0F1A12` | Texto principal. Nunca preto puro |
| `--ink-soft` | `#3C4A3F` | Texto secundário sobre claro |
| `--light` | `#F3F7F2` | Texto principal sobre verde escuro |
| `--light-soft` | `#D3DFD0` | Texto secundário sobre verde escuro |
| `--green` | `#247D1A` | Verde vivo, só em sinais pequenos |
| `--accent` | `#00FF8C` | Neon |

### 2.3 Combinações aprovadas (contraste WCAG calculado)

| Texto sobre fundo | Razão | Uso |
|---|---|---|
| `--ink` sobre `--tile` | 16,8:1 | Texto corrido |
| `--ink` sobre `--tile-2` | 13,9:1 | Texto em bloco mais escuro |
| `--ink-soft` sobre `--tile` | 8,8:1 | Notas e legendas |
| `--light` sobre `--field` | 7,8:1 | Texto sobre o verde da marca |
| `--light-soft` sobre `--field` | 6,1:1 | Texto secundário no verde |
| `--light` sobre `--night` | 15,0:1 | Texto sobre o verde escuro |
| `--ink` sobre `--accent` | 13,3:1 | Texto do botão neon |
| `--accent` sobre `--night` | 12,1:1 | Números e ícones em neon |
| `--accent` sobre `--field` | 6,3:1 | Números e ícones em neon |
| `--ink` sobre `--sage` | 5,5:1 | Texto no bloco intermediário |
| `--green` sobre `--tile` | 4,9:1 | Ícones e o "+" (só texto grande ou sinal) |

### 2.4 Regras

- **Um acento só:** o neon. Aparece no botão de ação, no plano em destaque e em números ou ícones sobre campo escuro.
- **Neon nunca vira texto sobre fundo claro** (não tem contraste). Sobre claro ele é só preenchimento de bloco, com texto escuro por cima.
- Sem degradê. Sem sombra em nada que está parado. Sem borda ou linha fina: separar por tom.
- Sem roxo, índigo, nem creme com terracota.

---

## 3. Tipografia

**Escolha atual: opção B.** Foi a escolhida pelo João Otávio entre três testes. O cliente ainda não confirmou. Se ele pedir outra, o site troca por variável CSS.

| Papel | Fonte | Peso | Detalhe |
|---|---|---|---|
| **Títulos e números** | **Fraunces** (serifada) | 500 e 600 | Entrelinha 0,8 a 1,15, espaçamento entre letras de −0,015 a −0,045em |
| **Texto, interface, botões** | **Montserrat** (sem serifa) | 400 a 700 | Entrelinha 1,5 |

- **Montserrat** vem do PDF (confirmada pelas fontes embutidas: Regular, SemiBold e Bold).
- **Fraunces** é proposta do projeto: é uma serifada de contraste alto que conversa com a serifada do logo.
- Fontes carregadas do Google Fonts. Para publicar, hospedar no próprio site.

**Cinco tamanhos, nenhum a mais:**

| Variável | Valor | Uso |
|---|---|---|
| `--t-small` | 14 px | Legendas, notas, rótulos de tabela |
| `--t-body` | 17 px | Texto corrido, botões |
| `--t-lead` | 20 a 34 px | Frases de apoio, números, títulos de linha |
| `--t-head` | 32 a 60 px | Títulos de seção |
| `--t-name` | 48 a 200 px | O nome "Somark Mídia" na abertura e no rodapé |

Regras: título com no máximo 2 linhas em qualquer largura; texto corrido com 16 px ou mais; sem caixa-alta espaçada; sem fonte monoespaçada.

---

## 4. Logo

- **O que é:** o nome **"Somark"** numa serifada de contraste alto, com o **S** em floreio, e as letras **"rk"** em sálvia claro (`#DCE0DC`). Abaixo, **"MÍDIA"** em caixa-alta leve, bem espaçada, em sans.
- **Arquivo disponível:** `assets/brand/somark-logo-branco.png` (903 × 367 px, fundo transparente). É só a **versão branca**, em imagem raster, extraída do PDF. Serve para conferir e como solução provisória, **não para produção**.
- **Onde pode ir:** apenas sobre o verde da marca (`--field`) ou o verde escuro (`--night`). Sobre fundo claro some.
- **Regras provisórias** (o PDF não traz manual): não esticar, não girar, não trocar a cor das letras, não colocar sobre foto sem escurecer o fundo.
- **No site hoje:** um texto "Somark Mídia" em Fraunces 600 faz o papel do logo, em escala enorme, no topo e no rodapé (construído em blocos de cor).
- **Pendente do cliente:** logo em **SVG**, em versões **colorida** e **escura**, e o manual de uso, se existir.

---

## 5. Forma e layout

- **Quadro de blocos:** a página é um tabuleiro de blocos encaixados, com **8 px** de espaço entre eles, como uma mesa arrumada vista de cima.
- **Cantos:** **6 px** em tudo (blocos, fotos, botões). Um raio só.
- **Largura:** no desktop, o quadro tem no máximo **1200 px** e fica **centralizado**. No celular vai de borda a borda. A maior parte do público acessa pelo celular, então o celular é o ponto de partida.
- **Compacto:** pouco respiro vazio. Cada bloco é uma coisa só: o nome, uma frase, uma foto, um número, uma lista.
- **Botões:** retangulares, de cor chapada, 48 px de altura mínima. Primário em neon com texto escuro ou em tinta com texto claro.
- **Sem:** sombras, bordas, degradês, vidro fosco, selos acima de títulos, ícone no topo de card.

---

## 6. Imagem

- **Tratamento:** toda foto passa pelo mesmo tratamento, em **tom verde** (mistura de luminosidade sobre o verde da marca), para as fotos terem a mesma cara e as provisórias não serem confundidas com material real.
- **Estado atual:** as fotos são **provisórias** (Picsum/Unsplash). As fotos finais serão pedidas ao cliente.
- **Fotos já extraídas**, guardadas em `assets/img/` (origem e licença **não confirmadas**, confirmar antes de publicar). As sete primeiras vieram do PDF; `founder.webp` veio do site antigo:

| Arquivo | O que é |
|---|---|
| `team.webp`, `team-faces.webp` | Um homem e uma mulher de camiseta preta com o logo Somark, num escritório quente (confirmar quem são) |
| `laptop.webp` | Profissional de óculos e fone no notebook |
| `reviews.webp` | Pessoa avaliando atendimento no celular, suéter vermelho |
| `megaphone.webp` | Megafone 3D sobre um post de rede social, em verde escuro |
| `store.webp` | Fachada da Cores & Cia |
| `coffee.webp` | Mãos com grãos de café |
| `founder.webp` | Retrato preto e branco de um homem de boné branco, do site antigo do Sergio |

- **Logos de clientes:** `assets/logos/` (18 arquivos, baixa resolução, até 440 px). Uso: esteira automática, em blocos claros ou verdes conforme a cor do logo.
- **Vídeos do portfólio:** são vídeos **do próprio site**, sem YouTube. Formato dos reais: **MP4 H.264**, vertical 9:16 de preferência, comprimidos (até uns 8 MB). Tocam sozinhos e sem som no hover; no celular, tocam ao toque.

---

## 7. Ícones

- **Phosphor Icons**, pesos **regular** e **fill**, carregados por CDN.
- Sempre **ao lado do texto**, nunca num quadrado colorido no topo de um card.
- Cor: tinta, verde vivo (sobre claro) ou neon (sobre escuro). Tamanho acompanha o texto, ou 24 a 32 px quando estão sozinhos.
- Um mesmo traço (peso) em toda a página.

---

## 8. Movimento

- **Só `transform`, `opacity` e `clip-path`.** Nada que mexa em largura, altura ou posição.
- **Curvas:** entradas com `cubic-bezier(0.22, 1, 0.36, 1)` ou `(0.16, 1, 0.3, 1)`; troca de painel com `(0.76, 0, 0.24, 1)`. Nada de bounce.
- **Entradas:** os blocos assentam em cascata (60 a 90 ms entre eles), uma vez só, subindo 16 a 24 px. Fotos abrem de baixo para cima.
- **Feedback:** todo botão e link responde ao toque (escala 0,97 ao apertar). Hover só em dispositivo com mouse.
- **Esteira de logos:** movimento contínuo e lento, em dois sentidos, que pausa no hover.
- **Quem pede menos movimento** (`prefers-reduced-motion`) vê tudo parado e completo.

---

## 9. Voz e texto

- **Plural**, sempre: "somos", "cuidamos", "produzimos". O site antigo era em primeira pessoa e foi adaptado.
- **Direto e curto.** Frases que dizem uma coisa. Palavras-chave da marca: **crescer**, **somar**, **estratégia**, **assinatura**.
- **Português do Brasil**, grafia "Portfólio" (o site antigo escrevia "Portifólio" e "Portfolio").
- **Sem clichês de agência** ("soluções inovadoras", "elevar", "next-level") e **sem emojis**.
- **Sem preços** no site: por decisão do cliente, o valor é combinado na conversa. A ação é sempre o **WhatsApp**.
- **Números** (+95% satisfação, +35% engajamento, +65% vendas) vêm do PDF e **precisam ser confirmados pelo cliente** antes de publicar.

---

## 10. O que não seguir: a identidade antiga

O site anterior (Canva, "Creative Serjo", portfólio pessoal do Sergio) usava **vermelho `#F40002` sobre creme `#EAE8DD`**, títulos gigantes em fonte condensada, texto em monoespaçada, estrelas e selos serrilhados, e fotos de cantos muito arredondados. **Isso não faz parte da identidade da Somark e não deve voltar.** Do site antigo só aproveitamos o **conteúdo** (ver `projeto.md`).

---

## 11. Pendente de identidade

| Item | Quem resolve |
|---|---|
| Logo em SVG, versões colorida e escura, e manual de uso | Cliente |
| Confirmar a tipografia B (Fraunces + Montserrat) | Cliente |
| Fotos finais (equipe, trabalhos) e vídeos reais | Cliente |
| Origem e licença das fotos que vieram do PDF | Cliente |
| Logos de clientes em alta resolução; confirmar os nomes "Édmais" e "WF", deduzidos do desenho | Cliente |
| Se o verde vivo `#247D1A` e a menta `#D9FFEE` devem ganhar mais espaço | Cliente |

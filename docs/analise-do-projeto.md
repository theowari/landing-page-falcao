# Análise do projeto: novo site da Somark Mídia

> Documento de alinhamento **antes de escrever qualquer código**. Resume o que foi recebido em `docs/`, o que já está decidido, o que ainda falta e o que proponho construir.
> **Versão 3**, atualizada com as respostas do João Otávio e com o que o protótipo 1 já implementa (seção 11).
> Itens marcados com ⚠️ precisam de confirmação. Itens marcados com _(inferido)_ são leitura minha, não informação dada pelo cliente.

---

## 1. Resumo rápido

- **Cliente:** **Sergio Godoy** ("Serjo", apelido **"Falcão"**), dono da **Somark Mídia**, agência criativa e orientada por dados. Daí o nome da pasta do projeto.
- **Site:** novo site da **Somark Mídia**, mais detalhado, no lugar do site atual feito no Canva (Creative Serjo).
- **Identidade visual:** a do **PDF** (Somark Mídia). Paleta **verde**, com Montserrat como ponto de partida para a tipografia.
- **Voz:** **plural** ("somos uma agência"). O site atual é em primeira pessoa e precisará ser adaptado.
- **Ainda não temos:** logo, imagens finais e tipografia definida. Serão pedidos ou testados.
- **Dá para começar** com placeholders; nada disso trava o design (ver seção 8).

---

## 2. Decisões confirmadas

| # | Decisão | Origem |
|---|---|---|
| 1 | A identidade visual a seguir é a do **PDF** (verde), a pedido do cliente | João Otávio |
| 2 | **"Falcão"** é o apelido do Sergio. Mantemos os nomes como estão (Sergio Godoy, Serjo, Creative Serjo, Somark Mídia) | João Otávio |
| 3 | O texto fica no **plural**, como no PDF ("Somos uma agência…") | João Otávio |
| 4 | O Sergio é **dono da Somark**. Isso explica por que o PDF da agência é a identidade dele | João Otávio |
| 5 | **Logo**: não veio. Será pedida ao cliente | João Otávio |
| 6 | **Imagens**: as necessárias serão pedidas depois | João Otávio |
| 7 | **Tipografia indefinida**: vamos testar opções. Ponto de partida: **Montserrat** (a do PDF) | João Otávio |
| 8 | Podem seguir para o **primeiro protótipo** do site | João Otávio |
| 9 | As produções do portfólio são **vídeos que tocam dentro do próprio site**, sem embed do YouTube. É um ponto a implementar e a preservar | João Otávio |
| 10 | **Os preços não aparecem no site**, por decisão do cliente. Os planos (LITE, PRO, PRIME) ficam só com o que cada um inclui. O contato vai por WhatsApp | João Otávio, após conversar com o cliente |
| 11 | **Tipografia escolhida: B**, Fraunces nos títulos e Montserrat no texto | João Otávio |
| 12 | O V1 ficou arejado demais. Página **centralizada e compacta** no desktop, porque a maioria acessa pelo **celular** | João Otávio |
| 13 | **Fotos provisórias** (placeholders) no lugar das do PDF, que se repetiam | João Otávio |
| 14 | **Ícones Phosphor** na página | João Otávio |
| 15 | Portfólio **sem conteúdo por enquanto**. Os vídeos tocam **sozinhos no hover** | João Otávio |
| 16 | Marcas em **carrossel automático de logos** (esteira), a pedido do cliente | João Otávio |
| 17 | **Redesign geral** em um protótipo novo (V2), mantendo o V1 em `prototipos/v1` | João Otávio |

**Como fica a inconsistência da v1:** o PDF ser da Somark deixou de ser problema. O Sergio é o dono, então ele **é** a identidade certa. Falta só o que o PDF não traz (logo, tipografia oficial, manual de uso).

---

## 3. Material recebido

| Arquivo | O que é | Uso no projeto |
|---|---|---|
| `docs/identidade-visual.pdf` | Media kit da Somark Mídia, 6 slides (1440×810, exportado do Canva) | **Fonte da identidade visual** e de parte do conteúdo |
| `docs/reference-images/primeira.png` | Captura do site atual: hero + banner + Sobre-mim | **Conteúdo e estrutura** do site antigo |
| `docs/reference-images/segunda.png` | Captura: Portfólio + início de Experiência | idem |
| `docs/reference-images/terceira.png` | Captura: Experiência completa + início de Serviços | idem |
| `docs/reference-images/quarta.png` | Captura: fim de Serviços + Contatos | idem |
| `docs/fonts.md` | Só 2 links: site atual no Canva e Instagram `@creativeserjo`. **Não lista fontes**, apesar do nome | Referência |

**Limitações da minha leitura:**

- O link do Canva é renderizado por JavaScript e voltou **vazio** (só o título "Creative Serjo"). O conteúdo do site atual vem **das 4 capturas**, não do HTML.
- As capturas são screenshots (~1500px de largura): servem de referência, **não de imagem de produção**.
- Não consegui renderizar os slides do PDF inteiros (falta o poppler). Li **texto, imagens embutidas, fontes embutidas e cores de preenchimento**. A composição visual exata de cada slide eu não vi.
- Não consegui abrir o Instagram.

---

## 4. Identidade visual a seguir (PDF da Somark)

### 4.1 Cores

Lidas dos preenchimentos do PDF, então são **exatas**:

| Cor | Hex | Onde aparece |
|---|---|---|
| Verde escuro (marca) | `#3F523D` (RGB 63, 82, 61) | Presente em todos os slides. Fundo do slide 4 |
| Verde mais vivo | `#247D1A` (RGB 36, 125, 26) | Slides 1 a 4 |
| Verde neon | `#00FF8C` (RGB 0, 255, 140) | Slide de planos (5) |
| Verde-menta em degradê | ≈ branco → `#D9FFEE` | Fundo do slide de planos (5) |
| Verde-sálvia claro | _(a medir no logo)_ | Letras "rk" do logo |
| Preto e branco | `#000000` / `#FFFFFF` | Textos e fundos |

⚠️ O PDF dá poucas cores e **nenhum papel definido** para elas (qual é fundo, qual é destaque, qual é botão). Vou propor os papéis nos tokens de design, com **contraste verificado** (WCAG), principalmente do neon sobre fundo claro e do verde `#3F523D` com texto branco.

### 4.2 Tipografia

- **No PDF (confirmado pelas fontes embutidas):** **Montserrat** em Regular, SemiBold e Bold.
- **Cliente:** ainda não definiu o que quer. **Vamos testar.**
- **Plano de testes:** montar uma página de comparação com 3 opções, trocáveis por variável CSS, para ficar barato mudar depois:
  - **A.** Montserrat sozinha (literal do PDF).
  - **B.** Serifada display elegante nos títulos, ecoando o logo, mais Montserrat no corpo. Candidatas: Fraunces, Playfair Display, DM Serif Display.
  - **C.** Outra combinação a combinar com você depois de ver A e B.

### 4.3 Logo

- Wordmark **"Somark"** em serifada display elegante, com "rk" em verde-sálvia claro, mais **"MÍDIA"** em caixa-alta leve e espaçada.
- O PDF só traz a **versão branca**, em raster (1080×1350, fundo transparente). **Não serve como logo de produção.**
- Vou precisar de **SVG ou PNG de alta resolução**, em versões colorida e escura/clara. Até lá, uso um **placeholder em texto**.

### 4.4 Estilo geral _(inferido)_

Fotos escuras e quentes de escritório, 3D de megafone sobre verde-musgo, tom entre corporativo e tech. Passa **confiança e proximidade**, mais "agência" que "autor".

### 4.5 Imagens embutidas no PDF

O PDF tem imagens com resolução utilizável, que dão para usar **como placeholder ou até como material final**, se o cliente confirmar:

| Imagem | Resolução | Observação |
|---|---|---|
| Homem no notebook com fone (capa) | 1909×1448 | |
| Dois integrantes com camisetas Somark (slide 2) | 1370×843 | Parece a foto da equipe |
| Pessoa avaliando atendimento no celular, suéter vermelho (slide 3) | 3716×2477 | Aparência de banco de imagens |
| Megafone 3D sobre feed (slide 4) | 2800×1750 | Aparência de banco de imagens |
| Fachada da Cores & Cia (slide 6) | 688×1529 | Foto de cliente |
| Mãos com grãos de café (slide 6) | 800×600 | Aparência de banco de imagens |

⚠️ Não sei a origem nem a licença de nenhuma delas. Confirmar antes de publicar.

---

## 5. Conteúdo vindo do PDF

### 5.1 Texto institucional
- **"Cresça conosco!"**
- _"Marketing digital é mais do que números! É conexão, estratégia e resultados reais. Somos uma agência criativa e orientada por dados, especializada em transformar marcas em referências no ambiente online."_
- Frase de fechamento: **"Vamos crescer juntos?"**

### 5.2 Resultados
**+95%** satisfação dos clientes · **+35%** engajamento nas redes · **+65%** crescimento em vendas.
⚠️ Confirmar que o cliente consegue sustentar esses números (fonte, período) antes de publicar.

### 5.3 Marcas atendidas
Título: **"Marcas que confiam e confiaram no nosso trabalho"**. São 18 slots de logos. Cerca de 13 aparecem sobre o fundo claro e 10 têm nome legível: Rede Bem Drogarias, Cores & Cia (Lukscolor), AFS Distribuidora, Magu Clean, É Mais, Unifeob, Palini Alves, Confort Clean, Cooper Batata e Textil São João. Vários outros estão em branco sobre fundo branco e só aparecem em fundo escuro.
⚠️ Os logos embutidos têm **baixa resolução** (a maioria 300–450px). Preciso dos arquivos originais.

### 5.4 O que fazemos (4 serviços)
| Serviço | Descrição no PDF |
|---|---|
| **Gestão de Redes** | Cuidamos das suas redes com conteúdo que conecta e engaja. |
| **Estratégia** | Planejamento personalizado com base em dados e objetivos claros. |
| **Criação de Conteúdo** | Produzimos conteúdos que comunicam, posicionam e vendem. |
| **Filmagens e Fotos** | Produzimos conteúdos com estratégia. |

### 5.5 Planos
> **Decisão do cliente: os valores do PDF (R$500, R$800 e R$1700 por mês) não entram no site.** A tabela abaixo mantém só o conteúdo de cada plano.

| | **LITE** | **PRO** · _mais escolhido_ | **PRIME** |
|---|---|---|---|
| Chamada | Ideal para quem está começando! | Para quem quer ter mais resultados | Para quem busca resultados acelerados |
| Posts por mês | até 12 | até 16 | até 20 |
| Copywriting para anúncios | ✓ | ✓ | ✓ |
| Gestão de redes sociais | ✓ | ✓ | ✓ |
| Produção audiovisual | ✓ | ✓ | ✓ |
| Cobertura de eventos | | ✓ | ✓ |
| Acompanhamento da agência | | semanal | diário |
| Google Meu Negócio | | | ✓ |
| Reuniões quinzenais | | | ✓ |
| Desenvolvimento de sites | | | ✓ |

⚠️ **Inconsistências no PDF que preciso confirmar:**
- No **PRO**, a descrição diz "acompanhamento **diário**", mas a lista de itens diz "acompanhamento **semanal**".
- No **PRIME**, o PDF escreve "Desenvolvimen**te** de sites" (erro de digitação).

---

## 6. Conteúdo do site atual (Creative Serjo)

O visual vermelho/creme **fica de fora** (a identidade agora é verde). O que aproveito é o **conteúdo e a estrutura**. Página única, rolagem vertical, em ordem:

### 6.1 Hero
Título gigante **SERGIO GODOY**, subtítulo **"Portifólio"** (⚠️ o correto é "Portfólio"), banner largo com foto escura em contraluz.

### 6.2 Sobre-mim
Texto atual, em primeira pessoa:

> Sou **Sergio Godoy**, tenho 23 anos, alguns me conhecem como **Serjo**. A **criatividade** sempre foi **natural** pra mim: **nunca enxerguei** o **cotidiano** como **algo comum**. Desde pequeno **crio histórias** na **minha mente**; hoje, tenho as **ferramentas** para colocá-las no mundo. Sou **versátil**, aberto a ideias e **crio fora da caixa**, sempre com a **estratégia necessária** para que o conteúdo funcione dentro da **linguagem do marketing**

⚠️ Esse texto fala de uma pessoa ("tenho 23 anos"). O site novo é da agência, no plural. Preciso decidir com você: vira **história do fundador** ("Fundada por Sergio Godoy…") ou é reescrito como texto institucional.

### 6.3 Portfólio
Título "PORTFOLIO" (em inglês, sem acento), legenda **"Algumas produções:"**. Três cartões verticais com cantos arredondados: macacão de corrida em fundo verde (⚠️ aparece **girado 90°** no site atual), moedor de café com luz azul e cabeleireiro atendendo cliente. Sem legenda de cliente.

> **Esses três cartões são vídeos, não fotos.** Tocam **dentro do próprio site**, sem embed do YouTube (correção do João Otávio; as capturas só mostram o quadro de abertura). Isso é um diferencial a manter: o visitante assiste sem sair da página. Detalhes de como foi implementado na seção 11.

### 6.4 Experiência
Título "EXPERIÊNCIA" (⚠️ não consegui confirmar a grafia exata na captura), layout em diagrama de ramificações, com 3 ramos:

1. **CRIAÇÃO DE CONTEÚDO AUDIOVISUAL ESTRATÉGICO**: _Desenvolvimento de vídeos e fotos pensados para performance, posicionamento de marca e linguagem de marketing, não apenas estética._
2. **ATUAÇÃO COM MARCAS DE DIFERENTES SEGMENTOS**: Hospitalidade · Gastronomia · Automotivo · Saúde · ETC
3. **PROCESSO CRIATIVO ESTRUTURADO**: _Trabalho baseado em método:_ Briefing → Roteiro → Aprovação e execução!

### 6.5 Serviços
Três cards: **VÍDEO ESTRATÉGICO** (drink com flores e vinil), **COLOR GRADING PROFISSIONAL** (Porsche branco em fundo escuro) e **FOTOGRAFIA COM ASSINATURA** (interior de carro, banco vermelho). Lista de marcadores:

- Criação de conteúdo audiovisual
- Roteirização e desenvolvimento criativo com base em estratégia e marketing
- Conteúdos para redes sociais
- Gestão criativa do processo: da ideia à entrega final, com aprovação

### 6.6 Contatos
- Frase: **"Toda boa ideia começa numa conversa."** e, no fim, **"Projetos com assinatura começam aqui."**
- WhatsApp: **(19) 99840-6369**
- E-mail: `sergio.godoyoliveira@gmail.com` ⚠️ confirmar a grafia (a captura tem espaçamento de letras muito apertado)
- Instagram: **@creativeserjo**

⚠️ São contatos **pessoais** do Sergio. Para a Somark, preciso saber se vão ser os mesmos ou se a agência tem canais próprios.

### 6.7 Tom de voz _(inferido)_
Informal, direto, mas posicionado como estratégico ("performance", "método", "linguagem do marketing"). Frases curtas e de efeito. Palavra recorrente: **assinatura**. O PDF da Somark fala no mesmo tom, só que no plural.

---

## 7. O que ainda falta

Marcado conforme quem entrega:

**Do cliente (você vai pedir)**
- [ ] **Logo da Somark** (SVG/PNG, versões colorida e escura/clara)
- [ ] **Imagens finais**: fotos da equipe, dos trabalhos, vídeos
- [ ] **Logos dos clientes** em alta resolução
- [ ] **Tipografia** (ou aprovação de uma das opções que eu testar)
- [ ] **Contatos oficiais** da Somark (WhatsApp, e-mail, Instagram da agência)
- [ ] Domínio e hospedagem

**Decisões pendentes**
- [ ] Origem e licença das imagens do PDF
- [ ] Números de resultado (+95%, +35%, +65%): confirmar que se sustentam
- [x] ~~Planos e preços entram no site?~~ Planos sim, **preços não** (decidido)
- [ ] **Vídeos reais do portfólio**, em MP4 (H.264), vertical 9:16, comprimidos (ideal até uns 8 MB cada)

---

## 8. ⚠️ Pontos pendentes

Menos que na v1, e nenhum bloqueia o início do design.

1. ~~**Planos e preços**~~ **Decidido:** os planos ficam, **sem preços**. Falta só confirmar o "diário/semanal" do PRO (o protótipo usa **semanal**, como na lista de itens) e se o cliente quer manter a seção de planos mesmo sem valores.
2. **Contatos**: usamos os do Sergio atual (WhatsApp, Gmail, `@creativeserjo`) ou a Somark tem canais próprios?
3. **O que acontece com o conteúdo do "Creative Serjo"** (portfólio e serviços audiovisuais)? **(sugestão:** vira a seção de portfólio e de produção audiovisual da Somark, e o "Sobre" fala do Sergio como fundador.)
4. **O que significa "mais detalhado"** para o cliente? (cases individuais, vídeos incorporados, depoimentos, FAQ, formulário de contato). **(sugestão:** ver estrutura da seção 9, e ele pede o que quiser tirar ou somar.)
5. **Quer aproveitar ideias de layout do site antigo**, como títulos girados e o diagrama de método, ou só o conteúdo? **(sugestão:** só o conteúdo, com layout novo na identidade verde, e manter o diagrama de método como inspiração.)
6. **Idioma:** só PT-BR? **(sugestão:** sim.)
7. **Estrutura:** one-page ou multipágina? **(sugestão:** one-page bem desenvolvida, com página própria de case apenas se houver conteúdo.)
8. **Stack:** **(sugestão:** site estático em Astro ou Vite com CSS/JS puro, sem backend, imagens em WebP/AVIF e vídeo com carregamento sob demanda. Deploy na Vercel, que está disponível aqui.)
9. O site do Canva fica no ar até o novo estar pronto?

---

## 9. Proposta preliminar de estrutura

Reaproveita os títulos e textos do próprio PDF. Sujeita aos pontos da seção 8.

| # | Seção | Conteúdo-base |
|---|---|---|
| 1 | **Hero** | "Cresça conosco!", frase "Marketing digital é mais do que números…", CTA para contato |
| 2 | **Resultados** | +95% · +35% · +65% (se confirmados) |
| 3 | **Sobre a agência** | Texto institucional da Somark e Sergio como fundador |
| 4 | **O que fazemos** | Os 4 serviços: Gestão de Redes, Estratégia, Criação de Conteúdo, Filmagens e Fotos |
| 5 | **Portfólio** | **Vídeos que tocam dentro do site**, em cartões verticais. Filtro por segmento (Hospitalidade, Gastronomia, Automotivo, Saúde) fica para quando houver vídeos reais para classificar. Aqui entra o conteúdo audiovisual do Creative Serjo |
| 6 | **Método** | Briefing → Roteiro → Aprovação → Execução, animado |
| 7 | **Marcas atendidas** | "Marcas que confiam e confiaram no nosso trabalho" |
| 8 | **Planos** | LITE · PRO (mais escolhido) · PRIME, sem preços |
| 9 | **Contato** | "Vamos crescer juntos?", WhatsApp, e-mail, Instagram |

**Técnicos, já definidos:** responsivo desde o início (o Canva sofre no mobile), SEO e Open Graph, WhatsApp com mensagem pré-preenchida, acessibilidade (contraste da paleta verde, `prefers-reduced-motion`), performance (imagens otimizadas, lazy-load de vídeo) e motion discreto, coerente com o tom "confiança e proximidade".

---

## 10. Próximos passos

1. Revisar o protótipo 1 (seção 11) e escolher a tipografia entre A, B e C.
2. Pedir ao cliente: **logo**, **vídeos reais do portfólio** (MP4 vertical), fotos finais, contatos oficiais da Somark.
3. Trocar os materiais de exemplo pelos reais e fechar os pontos da seção 8.

---

## 11. Protótipo 1: o que foi construído

Site estático (HTML, CSS e JavaScript puros, sem build), na raiz do projeto: `index.html`, `css/styles.css`, `js/main.js`, `assets/`. Para ver, sirva a pasta por um servidor local (os vídeos precisam de HTTP) e abra `index.html`.

**Ideia do site:** o nome **Somark** lê-se como "**somar** + mark". A página inteira soma: os resultados são números com "+", os serviços "somam" quatro frentes, o método é briefing **+** roteiro **+** aprovação **=** execução, e cada plano é o anterior somado a mais coisas.

**Teste de tipografia:** abra `index.html?tipografia` para aparecer a barra de troca com **A** Montserrat (a do PDF, padrão), **B** Fraunces nos títulos mais Montserrat no texto e **C** General Sans.

**Seções, na ordem:** hero com a frase "Marketing é [foto da equipe] mais do que números." e uma cena que troca a foto a cada serviço ao rolar · resultados · serviços · portfólio em vídeo · método · marcas · planos · sobre · contato · rodapé.

**Vídeos do portfólio (ponto que o cliente destacou):**
- São elementos `<video>` próprios do site, com pôster, e tocam no lugar, sem YouTube e sem sair da página.
- O arquivo só é baixado quando o visitante toca (`preload="none"`), então o site carrega leve.
- Toque para assistir, toque de novo para pausar, botão de som e barra de progresso. Só um vídeo toca por vez, e ele pausa ao sair da tela ou da aba.
- Funcionam com teclado (botões reais com rótulo) e no celular (`playsinline`).
- **Os 5 vídeos atuais são de exemplo** (café, drink, moto), de licença aberta, e **não são trabalhos da Somark**. Os créditos estão no rodapé. Precisam ser trocados pelos reais.
- Formato dos reais: MP4 H.264 vertical comprimido. O protótipo usa WebM só porque foi o que havia disponível.

**Planos:** o visitante toca em um plano e vê a "conta" (por exemplo "PRO é o LITE + cobertura de eventos + …"). O botão abre o WhatsApp já com uma mensagem sobre aquele plano. Sem preços.

**Materiais provisórios:** as fotos vêm do PDF (origem e licença a confirmar), o logo é um texto "Somark" no lugar do logo real, e os textos de "Briefing / Roteiro / Aprovação / Execução" e de "Sobre" são adaptações minhas a partir do conteúdo do cliente, para ele revisar.

**Verificação:** o inspetor de design rodou em 1440, 768 e 390 pixels com **0 falhas**. Sobraram 3 avisos que considero defensáveis: o carrossel de vídeo rola de lado de propósito, a fonte padrão é a do PDF (e não a sugerida pela ferramenta), e a lista de marcas tem 5 linhas no celular.

---

## 12. Protótipo 2 (atual): o quadro de blocos

**Onde:** `prototipos/v2/` (o V1 continua em `prototipos/v1/`). O `index.html` da raiz lista os dois. Os dois usam a pasta `assets/` compartilhada.

**Conceito:** a página é um quadro de blocos encaixados com 8 px de espaço, como uma mesa arrumada vista de cima. No desktop o quadro tem no máximo 1200 px e fica centralizado. No celular ele vai de borda a borda e cada seção vira uma composição própria em duas colunas.

**Seções:**
1. **Abertura:** o nome "Somark Mídia" grande numa faixa verde, quatro atalhos para as seções, uma foto, os quatro serviços, a frase "Marketing digital é mais do que números…", os três números (+95%, +35%, +65%) e o botão do WhatsApp.
2. **Serviços:** um bloco com "Quatro frentes que somam." e quatro linhas escuras, uma por serviço, cada uma com ícone.
3. **Portfólio:** uma parede de 9 cartões em formatos diferentes (9:16, 16:9, 4:5, 1:1), **ainda vazios** e marcados como "Em breve". Cada cartão mostra o segmento e o formato.
4. **Método:** uma sanfona Briefing → Roteiro → Aprovação → Execução, do escuro para o claro. Toque para abrir cada etapa.
5. **Marcas:** **duas esteiras de logos** rodando em sentidos opostos, com os 18 logos extraídos do PDF. A esteira pausa no hover e fica parada para quem pede menos movimento.
6. **Planos:** uma tabela grande, sem preços, com o PRO destacado em verde neon. No celular, a tabela vira um card por plano.
7. **Sobre:** Sergio como fundador, uma citação do site antigo ("Nunca enxerguei o cotidiano como algo comum.") e quatro fatos.
8. **Contato:** uma faixa de fotos e um formulário de três células que **monta a mensagem e abre o WhatsApp**. Funciona mesmo sem JavaScript.
9. **Rodapé:** os links e o nome "Somark" construído em blocos de cor.

**Como publicar um vídeo no portfólio:** em cada cartão (`<figure class="clip" data-clip …>`), preencha `data-src` com o MP4 e `data-poster` com a imagem de capa. Sem mais nada:
- **No desktop**, o vídeo toca sozinho e sem som quando o mouse passa por cima, e para e volta ao início quando sai.
- **No celular**, um toque toca e outro pausa. Celular não tem hover; se preferir que toque sozinho ao aparecer na tela, é uma troca simples.
- O arquivo só é baixado no primeiro hover ou toque.

Testei com um vídeo de exemplo apontado num cartão: carregou no hover, tocou, pausou e voltou ao início ao tirar o mouse.

**Ícones:** Phosphor (pesos regular e fill), carregados por CDN. Ficam nos atalhos, serviços, método, contato e rodapé, sempre ao lado do texto e nunca como "ícone no topo de card".

**Fotos provisórias:** vêm do Picsum (Unsplash), com o mesmo tratamento em tom verde em todas, para não serem confundidas com material real. O crédito está no rodapé.

**Logos:** foram extraídos do PDF em baixa resolução (até 440 px). Funcionam no tamanho da esteira, mas o ideal é receber os originais. Dois nomes eu deduzi do desenho e precisam de confirmação: "Édmais" e "WF".

**Verificação:** o inspetor rodou em 1440, 768 e 390 px com **0 falhas** e 5 avisos que considero defensáveis:
- A esteira de logos rola de lado de propósito.
- Os vídeos ainda não têm pôster, porque ainda não há vídeos.
- Blocos repetidos fazem parte do conceito de quadro.
- A medida de margens pega o texto, não os blocos, que são simétricos.
- O bloco "Quatro frentes" tem área de cor livre de propósito.

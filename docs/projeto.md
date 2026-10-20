# Projeto: novo site da Somark Mídia

Este documento reúne o contexto, as decisões, o conteúdo de origem e o que falta. A **identidade visual** (cor, fonte, logo, forma, tom) está em [identidade-visual.md](identidade-visual.md).

- **Cliente:** Sergio Godoy ("Serjo", apelido "Falcão"), dono da **Somark Mídia**, agência criativa e orientada por dados. "Falcão" é o apelido dele e explica o nome da pasta do projeto.
- **Pedido:** um site novo, **mais detalhado**, no lugar do site atual feito no Canva ("Creative Serjo"), seguindo a identidade da Somark.
- **Itens marcados com ⚠️** precisam de confirmação.

---

## 1. Decisões confirmadas

| # | Decisão | Quem decidiu |
|---|---|---|
| 1 | A identidade a seguir é a do **PDF da Somark** (verde). Ver `identidade-visual.md` | Cliente, via João Otávio |
| 2 | O Sergio é dono da Somark. Mantemos os nomes: Sergio Godoy, Serjo, Creative Serjo, Somark Mídia | João Otávio |
| 3 | O texto fica no **plural** ("Somos uma agência…") | João Otávio |
| 4 | **Logo e imagens finais** serão pedidos ao cliente depois | João Otávio |
| 5 | **Tipografia B** (Fraunces nos títulos, Montserrat no texto). Cliente ainda não confirmou | João Otávio |
| 6 | **Os preços não aparecem no site**. Os planos ficam só com o que cada um inclui; o contato é por WhatsApp | Cliente, via João Otávio |
| 7 | As produções do portfólio são **vídeos que tocam dentro do próprio site**, sem embed do YouTube | João Otávio |
| 8 | Portfólio **sem conteúdo por enquanto**. Os vídeos tocam **sozinhos no hover** | João Otávio |
| 9 | Marcas em **esteira automática de logos**, a pedido do cliente | Cliente, via João Otávio |
| 10 | Página **centralizada e compacta** no desktop; o celular é o acesso principal | João Otávio |
| 11 | **Fotos provisórias** no lugar das do PDF, que se repetiam | João Otávio |
| 12 | **Ícones Phosphor** | João Otávio |
| 13 | V1 mantido em `prototipos/v1`; V2 em `prototipos/v2` | João Otávio |
| 14 | **V3** em `prototipos/v3`, ramificado da V2, é a versão atual | João Otávio |
| 15 | A marca fala como **agência institucional**: o Sergio deixa de ser o rosto da marca e o "Sobre" apresenta a agência | João Otávio (2026-10-20) |

---

## 2. Fontes originais (removidas do repositório)

Os arquivos de origem foram removidos depois de extrair deles tudo o que importa. Continuam no histórico do git, no commit `c071087`.

| Arquivo | O que era | Para onde foi a informação |
|---|---|---|
| `identidade-visual.pdf` | Media kit da Somark, 6 slides | Identidade em `identidade-visual.md`; conteúdo na seção 3 deste documento; logo e fotos em `assets/` |
| `reference-images/*.png` (4) | Capturas do site antigo no Canva | Conteúdo na seção 4 deste documento; um retrato em `assets/img/founder.webp` |
| `fonts.md` | Dois links, apesar do nome | Seção 6 deste documento |

Para recuperar um deles: `git show c071087:docs/<arquivo> > <destino>`.

**Limites da leitura original:** o link do Canva é renderizado por JavaScript e o conteúdo vem das capturas; o PDF foi lido por texto, imagens, fontes e cores embutidas, sem ver a composição exata dos slides; o Instagram não foi acessado.

---

## 3. Conteúdo vindo do PDF da Somark

### 3.1 Texto institucional
- **"Cresça conosco!"**
- _"Marketing digital é mais do que números! É conexão, estratégia e resultados reais. Somos uma agência criativa e orientada por dados, especializada em transformar marcas em referências no ambiente online."_
- Fechamento: **"Vamos crescer juntos?"**

### 3.2 Resultados
**+95%** satisfação dos clientes · **+35%** engajamento nas redes · **+65%** crescimento em vendas.
⚠️ Confirmar que o cliente consegue sustentar esses números (fonte e período) antes de publicar.

### 3.3 Marcas atendidas
Título: **"Marcas que confiam e confiaram no nosso trabalho"**. São 18 logos, todos em `assets/logos/`. Nomes lidos: Rede Bem Drogarias, AGF, Cores & Cia (Lukscolor), AFS Distribuidora, Magu Clean, Édmais, Unifeob, Palini Alves, Confort Clean, WF, Cooper Batata, Piratininga, Jaqueline Ramos (clínica estética), Joice Silva (farmacêutica), Survey Brasil, Eduzz, Select e Textil São João.
⚠️ Baixa resolução (até 440 px). Confirmar os nomes "Édmais" e "WF", deduzidos do desenho.

### 3.4 O que fazemos (4 serviços)
| Serviço | Descrição |
|---|---|
| **Gestão de Redes** | Cuidamos das suas redes com conteúdo que conecta e engaja. |
| **Estratégia** | Planejamento personalizado com base em dados e objetivos claros. |
| **Criação de Conteúdo** | Produzimos conteúdos que comunicam, posicionam e vendem. |
| **Filmagens e Fotos** | Produzimos conteúdos com estratégia. |

### 3.5 Planos (sem preços no site)
O PDF traz valores de R$500, R$800 e R$1700 por mês. **Por decisão do cliente, nenhum valor aparece no site.**

| | **LITE** | **PRO** · _mais escolhido_ | **PRIME** |
|---|---|---|---|
| Chamada | Ideal para quem está começando | Para quem quer ter mais resultados | Para quem busca resultados acelerados |
| Posts por mês | até 12 | até 16 | até 20 |
| Copywriting para anúncios | sim | sim | sim |
| Gestão de redes sociais | sim | sim | sim |
| Produção audiovisual | sim | sim | sim |
| Cobertura de eventos | não | sim | sim |
| Acompanhamento da agência | não | semanal | diário |
| Google Meu Negócio | não | não | sim |
| Reuniões quinzenais | não | não | sim |
| Desenvolvimento de sites | não | não | sim |

⚠️ No PDF, a descrição do **PRO** diz "acompanhamento diário", mas a lista diz "semanal". O site usa **semanal**; confirmar.

---

## 4. Conteúdo do site antigo (Creative Serjo)

Só o **texto** é aproveitado. O visual antigo não segue (ver `identidade-visual.md`, seção 10). O site era uma página única, nesta ordem:

**Hero.** Título "SERGIO GODOY", subtítulo "Portifólio" (o correto é "Portfólio"), banner largo com foto escura em contraluz.

**Sobre-mim**, em primeira pessoa:
> Sou **Sergio Godoy**, tenho 23 anos, alguns me conhecem como **Serjo**. A criatividade sempre foi natural pra mim: nunca enxerguei o cotidiano como algo comum. Desde pequeno crio histórias na minha mente; hoje, tenho as ferramentas para colocá-las no mundo. Sou versátil, aberto a ideias e crio fora da caixa, sempre com a estratégia necessária para que o conteúdo funcione dentro da linguagem do marketing

⚠️ Fala de uma pessoa ("tenho 23 anos"); o site novo é da agência, no plural. No V2, o "Sobre" apresenta o Sergio como fundador e reaproveita a ideia e uma frase.

**Portfólio.** Título "PORTFOLIO", legenda "Algumas produções:". Três cartões verticais de cantos arredondados (corrida em fundo verde, moedor de café com luz azul, cabeleireiro atendendo cliente). **São vídeos que tocam dentro do próprio site**, não fotos. A primeira imagem aparecia girada 90° no site antigo.

**Experiência**, em diagrama de ramificações, com três ramos:
1. **Criação de conteúdo audiovisual estratégico:** vídeos e fotos pensados para performance, posicionamento de marca e linguagem de marketing, não apenas estética.
2. **Atuação com marcas de diferentes segmentos:** hospitalidade, gastronomia, automotivo, saúde, etc.
3. **Processo criativo estruturado:** trabalho baseado em método: briefing, roteiro, aprovação e execução.

**Serviços.** Três cartões: **Vídeo estratégico**, **Color grading profissional** e **Fotografia com assinatura**, com a lista:
- Criação de conteúdo audiovisual
- Roteirização e desenvolvimento criativo com base em estratégia e marketing
- Conteúdos para redes sociais
- Gestão criativa do processo: da ideia à entrega final, com aprovação

**Contatos.** Frases "Toda boa ideia começa numa conversa." e "Projetos com assinatura começam aqui."

---

## 5. Contatos usados no site hoje

| Canal | Valor |
|---|---|
| WhatsApp | (19) 99840-6369 |
| E-mail | sergio.godoyoliveira@gmail.com ⚠️ confirmar a grafia |
| Instagram | @creativeserjo |

⚠️ São os contatos **pessoais** do Sergio. Confirmar se a Somark tem canais próprios.

---

## 6. Referências

- Site antigo no Canva: https://portifolio-site-ss.my.canva.site/creativeserjo (renderizado por JavaScript, só abre no navegador)
- Instagram do Sergio: https://www.instagram.com/creativeserjo

---

## 7. O que falta

**Do cliente**
- [ ] **Logo** em SVG, versões colorida e escura, e manual de uso, se existir
- [ ] **Vídeos reais do portfólio**, MP4 H.264, vertical 9:16, comprimidos (até uns 8 MB cada)
- [ ] **Fotos finais** da equipe e dos trabalhos; origem e licença das que vieram do PDF
- [ ] **Logos dos clientes** em alta resolução
- [ ] **Confirmar a tipografia B**
- [ ] **Contatos oficiais** da Somark
- [ ] **Domínio e hospedagem**

**Decisões abertas**
- [ ] Confirmar os números de resultado (+95%, +35%, +65%)
- [ ] "Acompanhamento do PRO": semanal ou diário
- [ ] O cliente quer manter a seção de planos mesmo sem valores?
- [ ] O site do Canva fica no ar até o novo estar pronto?
- [ ] Quer filtro de segmento no portfólio (hospitalidade, gastronomia, automotivo, saúde) quando houver vídeos?

---

## 8. Protótipos

Cada protótipo é um site estático (HTML, CSS e JavaScript puros, sem build). Para ver, sirva a pasta do projeto por um servidor local (os vídeos precisam de HTTP) e abra o `index.html` da raiz, que lista os dois. Os dois usam `assets/` em comum.

### V3 (atual): `prototipos/v3/`
Ramificação da V2 (mesmo HTML, CSS e JavaScript no ponto de partida). As ilhas React em `src/islands/` são compartilhadas com a V2. O contexto de produto está em `PRODUCT.md`, na raiz.

### V2: `prototipos/v2/`, o quadro de blocos
A página é um quadro de blocos encaixados, centralizado e compacto no desktop, de borda a borda no celular.

1. **Abertura:** nome grande, atalhos, foto, serviços, a frase de posicionamento, os três números e o botão do WhatsApp.
2. **Serviços:** "Quatro frentes que somam", uma linha escura por serviço, cada uma com ícone.
3. **Portfólio:** parede de 9 cartões vazios ("Em breve") em formatos variados. Para publicar um vídeo, preencher `data-src` (MP4) e `data-poster` no `<figure data-clip>`. No desktop o vídeo toca sozinho e sem som no hover; no celular, toca ao toque. O arquivo só baixa no primeiro hover ou toque.
4. **Método:** sanfona Briefing → Roteiro → Aprovação → Execução.
5. **Marcas:** duas esteiras de logos em sentidos opostos, que pausam no hover.
6. **Planos:** tabela grande sem preços, com o PRO em neon; no celular, um card por plano.
7. **Sobre:** Sergio como fundador, citação do site antigo e quatro fatos.
8. **Contato:** faixa de fotos e formulário de três células que abre o WhatsApp com a mensagem pronta.
9. **Rodapé:** links e o nome "Somark" montado em blocos de cor.

Verificado com o inspetor de design em 1440, 768 e 390 px: 0 falhas. O hover do vídeo foi testado com um arquivo de exemplo.

### V1: `prototipos/v1/`, a frase é o layout
Primeiro protótipo, mais arejado, com a frase "Marketing é [foto] mais do que números." como layout, cena que troca a foto a cada serviço ao rolar, vídeos de exemplo com som e planos selecionáveis. Mantido só como referência.

### Materiais provisórios (trocar antes de publicar)
- **Fotos:** Picsum (Unsplash) no V2; fotos do PDF no V1. O crédito está no rodapé.
- **Vídeos do V1:** cinco clipes de licença aberta (Wikimedia Commons), que **não são trabalhos da Somark**. Em `assets/video/`, com os créditos em `credits.json`.
- **Logo:** texto "Somark Mídia" no lugar do logo.
- **Textos** de método e de "Sobre": adaptações a partir do conteúdo do cliente, para ele revisar.
- **Ícones e fontes:** vêm de CDN (unpkg e Google Fonts); hospedar no próprio site para publicar.

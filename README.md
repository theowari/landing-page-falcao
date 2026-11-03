# Somark Mídia: site da agência

Novo site da Somark Mídia, agência de marketing digital criativa e orientada por dados. Ele substitui o portfólio antigo feito no Canva ("Creative Serjo") por um site mais completo, na identidade visual da Somark.

A versão atual é a **V3**. As versões V1 e V2 continuam no projeto como histórico.

As páginas são HTML, CSS e JavaScript simples. O React entra só em alguns pontos (o botão de tema claro/escuro, os links animados, a lista de serviços), e o Vite serve e empacota tudo.

## O que instalar antes

| Ferramenta | Versão | Para quê |
|---|---|---|
| [Git](https://git-scm.com/downloads) | qualquer recente | baixar o projeto |
| [Node.js](https://nodejs.org) | **20.19 ou superior** (ou 22.12+). Recomendado: a versão LTS | rodar o site. O `npm` vem junto |

Para conferir se já está instalado, abra o terminal e rode:

```bash
git --version
node -v
```

Se `node -v` mostrar algo abaixo de `v20.19.0`, atualize o Node antes de continuar.

## Rodando o site na sua máquina

### 1. Baixar o projeto

O trabalho está no branch `ShadCN`. O `main` só tem o commit inicial.

```bash
git clone --branch ShadCN https://github.com/theowari/landing-page-falcao.git
cd landing-page-falcao
```

O download é pesado, cerca de 1 GB, por causa dos vídeos do portfólio. Pode levar alguns minutos.

### 2. Instalar as dependências

```bash
npm install
```

Só precisa fazer isso na primeira vez, e de novo quando o `package.json` mudar.

### 3. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

O terminal mostra o endereço, normalmente:

```
Local:   http://localhost:5173/
```

Abra esse endereço no navegador. A página inicial lista os três protótipos. Para ir direto à versão atual:

**http://localhost:5173/prototipos/v3/**

Se a porta 5173 já estiver em uso, o Vite escolhe a próxima (5174, 5175...). Use o endereço que aparecer no terminal.

Com o servidor ligado, qualquer arquivo salvo atualiza a página sozinha. Para parar, aperte `Ctrl + C` no terminal.

> Não abra os arquivos `.html` com duplo clique. Durante o desenvolvimento, as páginas carregam os componentes React direto do código-fonte (`.tsx`), e só o servidor do Vite sabe traduzi-los. Isso vale só para o desenvolvimento: o site publicado usa a versão gerada pelo build (veja [Hospedagem](#hospedagem)).

## Gerar a versão final (opcional)

```bash
npm run build     # confere os tipos e gera a pasta dist/
npm run preview   # serve o resultado do build em http://localhost:4173/
```

A pasta `dist/` é gerada de novo a cada build e não vai para o Git.

## Hospedagem

O build transforma tudo em HTML, CSS e JavaScript comuns, com o React já embutido. Por isso qualquer hospedagem de arquivos estáticos serve, sem Node e sem configuração extra. O que vai para o ar é sempre o **conteúdo de `dist/`**, nunca o código-fonte.

### GitHub Pages (demonstração para o cliente)

É automático. A cada push no branch `ShadCN`, o workflow [.github/workflows/pages.yml](.github/workflows/pages.yml) roda o build e publica o `dist/`. O andamento aparece na aba **Actions** do repositório.

- Endereço do v3: **https://theowari.github.io/landing-page-falcao/prototipos/v3/**
- Configuração, uma vez só: em **Settings > Pages > Source**, escolha **GitHub Actions**.
- O site fica numa subpasta (`/landing-page-falcao/`), e o workflow avisa o Vite disso pela variável `VITE_BASE`. Para conferir esse build na sua máquina:

```bash
VITE_BASE=/landing-page-falcao/ npm run build
VITE_BASE=/landing-page-falcao/ npm run preview   # abra http://localhost:4173/landing-page-falcao/prototipos/v3/
```

(O `preview` também precisa da variável. Sem ela, ele serve o site na raiz e devolve a página inicial para qualquer endereço em `/landing-page-falcao/`. No PowerShell, defina a variável antes: `$env:VITE_BASE="/landing-page-falcao/"`. No Git Bash do Windows, ponha `MSYS_NO_PATHCONV=1` antes do comando, senão o Git Bash troca `/landing-page-falcao/` por `C:/Program Files/Git/landing-page-falcao/`. No GitHub Actions nada disso é preciso.)

```bash
# para voltar ao build normal depois, rode de novo sem a variável
npm run build
```

### HostGator, Hostinger ou outra hospedagem compartilhada

1. Rode `npm run build`, sem `VITE_BASE`.
2. Envie **o que está dentro** de `dist/` para a pasta pública do domínio (normalmente `public_html`), pelo gerenciador de arquivos do painel ou por FTP.

Esse build espera ficar na raiz de um domínio ou subdomínio. Se o site for para uma subpasta (por exemplo `meusite.com.br/somark/`), gere o build com `VITE_BASE=/somark/`.

## Comandos disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento, com atualização automática |
| `npm run build` | verifica o TypeScript e gera o site otimizado em `dist/` |
| `npm run preview` | serve o conteúdo de `dist/` para conferir o build |

## Como o projeto está organizado

```
index.html              página inicial que lista os protótipos
prototipos/
  v3/                   versão atual: index.html, css/styles.css, js/main.js
  v2/, v1/              versões anteriores
src/
  islands/              componentes React que entram nas páginas
                        (tema claro/escuro, links, serviços, método, cursor)
  components/ui/        componentes de interface (Skiper UI)
  styles/island.css     estilos dos componentes React (Tailwind)
assets/
  portfolio/            vídeos e posters que o site usa
  oficial-media/        vídeos originais, como o cliente enviou
  img/, logos/, brand/  fotos, logos de clientes e logo da Somark
docs/                   documentação do projeto
dist/                   gerado pelo build (não versionado)
```

As pastas `.agents`, `.claude`, `.codex`, `.impeccable` e `.taste-skill` guardam configurações de ferramentas de apoio ao design e não interferem no site.

## Para saber mais

- [docs/projeto.md](docs/projeto.md): contexto, decisões já tomadas, conteúdo de origem e o que ainda falta.
- [docs/identidade-visual.md](docs/identidade-visual.md): cores, fontes, logo e tom de voz.
- [PRODUCT.md](PRODUCT.md): quem é o público do site e qual o objetivo dele.

## Observações

- **Precisa de internet para ficar completo.** As fontes (Google Fonts) e os ícones (Phosphor Icons) são carregados da internet. Sem conexão, a página abre, mas com fonte padrão e sem ícones.
- **Os vídeos do portfólio só carregam ao passar o mouse** (no celular, ao tocar). Por isso a primeira reprodução pode demorar um instante.
- **O tema escolhido (claro ou escuro) fica salvo no navegador.**

## Problemas comuns

**`node` ou `npm` não é reconhecido.** O Node não está instalado, ou o terminal foi aberto antes da instalação. Instale o Node e abra um terminal novo.

**Erro de versão ao rodar `npm run dev` ou `npm install`.** O Node está desatualizado. Instale a versão 20.19 ou superior (ou 22.12+).

**No Windows, aparece "a execução de scripts foi desabilitada neste sistema".** É uma proteção do PowerShell. Rode o projeto pelo Prompt de Comando (`cmd`) ou, no PowerShell, execute uma vez:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

**A página abre sem estilo ou dá erro de módulo.** Ela foi aberta direto pelo arquivo. Rode `npm run dev` e use o endereço `http://localhost`.

**Nada funciona depois de atualizar o projeto.** Apague a pasta `node_modules` e rode `npm install` de novo.

## Trabalhando em conjunto

Para pegar as novidades do branch:

```bash
git pull
```

Para fazer uma alteração sem mexer direto no branch principal de trabalho:

```bash
git checkout -b nome-da-alteracao
git add .
git commit -m "Descreva o que mudou"
git push -u origin nome-da-alteracao
```

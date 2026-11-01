# Retrô Game Quiz

Aplicação web de quiz sobre videogames retrô. A pessoa informa o nome, responde perguntas de múltipla escolha, recebe o resultado e pode abrir quizzes compartilhados por outras pessoas.

## Funcionalidades

- Quiz local com perguntas e respostas armazenadas em `db.json`.
- Loading com barra de progresso sobre o fundo do jogo.
- Pontuação e mensagens de resultado de acordo com os acertos.
- Lista de quizzes externos e rota para carregá-los.
- API local em `/api/db`, que disponibiliza os dados do quiz.

## Versão

Versão atual: **1.2.0**

Esta versão atualiza o projeto para Next.js 15 e React 18, corrige a compatibilidade dos links e do carregamento de animações e melhora as mensagens de resultado e a tela de loading.

## Tecnologias

- Next.js 15 com Pages Router
- React e React DOM 18.3.1
- styled-components para estilos e renderização no servidor
- Framer Motion para animações
- `@crello/react-lottie` para animações do quiz
- Node.js 22.x
- Yarn Classic 1.22.4

## Executar localmente

### Pré-requisitos

- Node.js 22.x
- Yarn Classic 1.x

Se você usa o nvm-windows, selecione o Node 22:

```bash
nvm install 22.23.4
nvm use 22.23.4
node --version
yarn --version
```

Na pasta do projeto, instale as dependências registradas no lockfile e inicie o servidor:

```bash
yarn install --frozen-lockfile
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000). Para encerrar o servidor, pressione `Ctrl+C`.

O quiz local não exige banco de dados, arquivo `.env` ou credenciais. Os dados são lidos de `db.json`; a API local pode ser acessada em [http://localhost:3000/api/db](http://localhost:3000/api/db).

### Build local

Para gerar e iniciar o build de produção:

```bash
yarn build
yarn start
```

`yarn start` deve ser executado depois de `yarn build`.

## Publicar na Vercel

### Fluxo de branches

- `develop`: desenvolvimento e integração das alterações.
- `uat`: homologação do projeto antes da produção. A Vercel cria um deployment de preview para essa branch.
- `main` ou `master`: produção, conforme a branch configurada como Production Branch na Vercel.

Fluxo de promoção: `develop` → `uat` → `main`/`master`.

A Vercel detecta aplicações Next.js e cria deployments a partir do repositório Git conectado. O projeto declara Node.js `22.x` no campo `engines` do `package.json`. Confirme também essa versão nas configurações do projeto na Vercel.

1. Importe o repositório em **Add New Project**.
2. Confirme o preset **Next.js** e o diretório raiz do projeto.
3. Mantenha os comandos de instalação e build detectados pela Vercel.
4. Envie commits para a branch `develop` e confira o deployment de preview.
5. Depois de validar o preview, faça o merge para a branch de produção.

Consulte a [documentação de Next.js na Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs), a [documentação de deployments Git](https://vercel.com/docs/git) e as [versões de Node.js aceitas](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

O quiz local não requer variáveis de ambiente. A rota `/quiz/[id]` depende de uma API pública compatível com o formato usado pelo projeto e da disponibilidade desse serviço remoto.

## Estrutura do projeto

```text
pages/
├── api/db.js          API que retorna db.json
├── quiz/
│   ├── index.js       Quiz local
│   └── [id].js        Quiz carregado de um serviço externo
├── _app.js            Estilos globais e tema
└── _document.js       Coleta de estilos do styled-components no servidor
src/
├── components/        Componentes reutilizáveis da interface
└── screens/Quiz/      Fluxo de perguntas, loading e resultado
db.json                Tema, perguntas e links de quizzes externos
```

## Scripts

| Comando | Descrição |
| --- | --- |
| `yarn dev` | Inicia o servidor de desenvolvimento |
| `yarn build` | Gera o build de produção |
| `yarn start` | Inicia o servidor de produção após o build |
| `yarn lint` | Executa o ESLint com `--fix`; pode alterar arquivos automaticamente |

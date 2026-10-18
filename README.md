# Retrô Game Quiz

Aplicação web de quiz sobre videogames retrô. A pessoa informa o nome, responde perguntas de múltipla escolha, recebe o resultado e pode abrir quizzes compartilhados por outras pessoas.

## Funcionalidades

- Quiz local com perguntas e respostas armazenadas em `db.json`.
- Tela de carregamento e feedback após responder.
- Pontuação ao final do quiz.
- Lista de quizzes externos e rota para carregá-los.
- API local em `/api/db`, que disponibiliza os dados do quiz.

## Tecnologias

- Next.js 10.0.5 com Pages Router
- React e React DOM 16.14.0
- styled-components 5.2.1, incluindo renderização de estilos no servidor
- Framer Motion para animações
- `@crello/react-lottie` para a animação de carregamento
- Yarn Classic 1.22.4; as versões instaladas estão registradas em `yarn.lock`

## Executar localmente

### Pré-requisitos

O projeto foi iniciado localmente com Node.js 16.20.2 e Yarn Classic 1.22.4. Node 16 está fora de suporte; esse runtime serve como compatibilidade temporária para a versão antiga do Next.js usada pelo projeto.

Com o [nvm-windows](https://github.com/coreybutler/nvm-windows), selecione a versão usada no teste local:

```bash
nvm install 16.20.2
nvm use 16.20.2
node --version
yarn --version
```

Confirme que o Node mostra `v16.20.2`. Na pasta do projeto, instale exatamente as dependências do lockfile e inicie o servidor:

```bash
yarn install --frozen-lockfile
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000). Para encerrar o servidor, pressione `Ctrl+C`.

O projeto não exige banco de dados, arquivo `.env` ou credenciais para executar o quiz local. Os dados são lidos de `db.json`; a rota local da API fica em [http://localhost:3000/api/db](http://localhost:3000/api/db).

### Build local

```bash
yarn build
yarn start
```

`yarn start` serve a aplicação compilada e deve ser executado depois de `yarn build`.

## Publicar na Vercel

A publicação pela integração Git da Vercel detecta aplicações Next.js e cria deployments a partir dos commits enviados ao repositório conectado. Consulte a [documentação de Next.js na Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs) e a [documentação de deployments Git](https://vercel.com/docs/git).

### Compatibilidade necessária antes do deploy

**Este projeto ainda precisa de uma atualização de dependências antes de publicar novos builds na Vercel.** Ele está fixado no Next.js 10.0.5 e precisou do Node 16.20.2 para iniciar localmente. A Vercel descontinuou o Node 16 para novos builds e funções; verifique as [versões de Node.js atualmente aceitas](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions) e a [descontinuação do Node 16](https://vercel.com/changelog/node-js-16-deprecation). O erro de PostCSS observado no Node 26 também indica que o stack atual precisa ser atualizado antes de usar um runtime moderno. Não basta apenas trocar a versão de Node no painel.

Depois de atualizar e validar o Next.js e suas dependências em uma versão de Node aceita pela Vercel:

1. Envie o repositório para um provedor Git conectado à Vercel.
2. No painel da Vercel, escolha **Add New Project** e importe o repositório.
3. Confirme o preset **Next.js** e o diretório raiz do projeto.
4. Mantenha os comandos de instalação e build detectados pela Vercel, que usa o `yarn.lock` para escolher o gerenciador.
5. Verifique a versão de Node.js e as configurações de build nas configurações do projeto.
6. Clique em **Deploy**. Depois da integração, novos commits nas branches conectadas iniciam novos deployments.

O projeto não requer variáveis de ambiente para o quiz local. A rota de quizzes externos (`/quiz/[id]`) depende de uma API pública no formato usado pelo projeto e da disponibilidade desse serviço remoto.

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
└── screens/Quiz/      Fluxo de perguntas, carregamento e resultado
db.json                Tema, perguntas e links de quizzes externos
```

## Scripts

| Comando | Descrição |
| --- | --- |
| `yarn dev` | Inicia o servidor de desenvolvimento |
| `yarn build` | Gera o build de produção |
| `yarn start` | Inicia o servidor de produção após o build |
| `yarn lint` | Executa o ESLint com `--fix`; pode alterar arquivos automaticamente |

> Observação: a dependência `next` está declarada como `latest` no `package.json`, enquanto o lockfile fixa a instalação em 10.0.5. Fixe a versão no `package.json` antes de atualizar ou regenerar o lockfile para evitar uma atualização inesperada do framework.

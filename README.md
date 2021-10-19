## NWL Heat

### 🎲 Backend / Node

Backend da aplicação desenvolvido em node com liberação do Github OAuth para o _localhost:4000_

#### Intalação e Inicialização

Clone do repositório na pasta _/node_

Instalação de dependências
`yarn` ou `npm install`

Inicialização do projeto
`yarn dev` ou `npm run dev`

#### Tecnologias ❤

• NodeJS
• Typescript
• Prisma / Prisma Studio
• Github OAuth
• Socket.io

Complementares: Express / Axios / JsonWebToken / Global @Types / Cors

#### Rotas Principais

Utilize o Insomnia ou Postman para verificar as rotas para teste da aplicação

Para autorizar o login e receber o código de acesso ao Github
`urlbase /github` -> `urlbase /signin/callback`

Passando o código do Github no corpo, nesta rota é possível receber o Token e Dados do Usuário do Github
`urlbase /authenticate`

Passe o Token via Bearer e o no corpo a nova mensagem que será postada na aplicação
`urlbase /messages`

Pega as últimas mensagens postadas, é possível mudar a quantidade dinamicamente
`urlbase /messages/last`

Pega as informações do usuário logado
`urlbase /profile`

# Community Library

Este projeto é uma API REST para gerenciar uma biblioteca comunitária, desenvolvido como parte do curso da DNC. Ele foi construído em Node.js com foco em autenticação, validação, controle de empréstimos e envio de notificações.

## Funcionalidades

- Cadastro e login de usuários
- Controle de livros disponíveis
- Registro e gerenciamento de empréstimos
- Validação de dados usando Zod
- Autenticação com JWT
- Envio de e-mails para notificações
- Tarefas agendadas com cron para verificar empréstimos e avisos
- Persistência de dados usando SQLite

## Estrutura do projeto

- `index.js` - ponto de entrada da aplicação
- `src/config/database.js` - configuração do banco de dados SQLite
- `src/routes/` - definição das rotas da API
- `src/controller/` - controladores que recebem requisições e chamam serviços
- `src/service/` - lógica de negócio da aplicação
- `src/repositories/` - acesso aos dados e consultas ao banco
- `src/middlewares/` - middleware de autenticação e validação
- `src/schema/` - esquemas de validação com Zod

## Principais dependências

- `express` - framework web para criar a API
- `bcrypt` - criptografia de senhas
- `jsonwebtoken` - geração e validação de tokens JWT
- `dotenv` - leitura de variáveis de ambiente
- `zod` - validação de esquemas de dados
- `sqlite3` - banco de dados leve para desenvolvimento
- `node-cron` - agendamento de tarefas periódicas
- `nodemailer` - envio de e-mails
- `moment` - manipulação de datas

## Scripts

- `npm start` - inicia o servidor Node.js
- `npm run dev` - inicia o servidor com `nodemon` para recarregar automaticamente durante o desenvolvimento

## Como usar

1. Instale as dependências:

```bash
npm install
```

2. Crie um arquivo `.env` com as variáveis necessárias, por exemplo:

```env
PORT=3000
JWT_SECRET=sua_chave_secreta
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=usuario@example.com
EMAIL_PASS=sua_senha
```

3. Execute em modo de desenvolvimento:

```bash
npm run dev
```

## Observações

Este projeto faz parte do curso da DNC e atende ao objetivo de praticar uma aplicação backend com autenticação, validação de entrada, persistência de dados e tarefas agendadas. Pode ser expandido com testes, documentação Swagger e mais recursos de segurança conforme necessário.

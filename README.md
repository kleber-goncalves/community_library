# Bibliotecas importantes:

## bcrypt
- Ela cryptografia ex: senhas.

## nodemon
- Ela atualiza o projeto sem precisar de voce rodar novamente toda hora que fazer uma alteração.
- Apos intalar a biblioteca adiciona isso no `packaje.json`:

```json
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js"
    },
```
- neste caso voce so roda usando `npm run dev`.

## Zod
- Ele é uma biblioteca famosa para validação de todos os tipos possiveis, e tendo documentação impecavel.
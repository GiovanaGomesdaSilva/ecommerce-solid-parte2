## COMO RODAR
Esse é o projeto do E-commerce do projeto 1 refatorado. Incluindo SOLID e container de injeção de dependências (Inversify).

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev 
```

## Modos
A aplicação tem 2 modos, a escolha do modo é feita via  a variável `APP_ENV` que fica no arquivo `.env\.`

- `dev`: o e-mail vai pelo Ethereal (precisa de internet) e os pedidos são salvos no banco SQLite.
- `test`: o e-mail aparece impresso no console e os pedidos ficam na memória. Funciona sem internet.

Para trocar de modo, mude o `APP_ENV` e reinicie o servidor (`Ctrl+C` e depois `npm run dev`).



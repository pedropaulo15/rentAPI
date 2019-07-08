# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `yarn`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
Don't forget to update file .env with the parameters of your database.

### Documentation

Run the following command:

```js
adonis migration:run
```
after your application is running, go to browser open: http://localhost:3333/docs/

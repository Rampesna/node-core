# node-core

NodeCore is core system for developing NodeJs applications.

## Installation

To use this package, NPM must be pre-installed on your system.

### Include node-modules

```shell
npm init
```

### Install nodemon globally

```shell
npm install -g nodemon
```

### Database Configration

Change config/database.json file and .env file according to your own information.

```shell
{
  "development": {
    "username": "root",
    "password": null,
    "database": "nodejscore",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },

  "test": {
    "username": "root",
    "password": null,
    "database": "nodejscore",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },

  "production": {
    "username": "root",
    "password": null,
    "database": "nodejscore",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

```shell
SERVER_PORT=5000
JWT_SECRET_KEY=CORE_JWT_SECRET_KEY
TOKEN_HEADER_KEY=CORE_JWT_TOKEN_HEADER_KEY

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nodejscore
DB_USERNAME=root
DB_PASSWORD=
```

After the necessary adjustments are completed in the created Migration file, run the following command to create the tables again

```shell
npx sequelize-cli db:migrate
```

Run the following command to seed admin user

```shell
npx sequelize-cli db:seed:all
```

For create new module, so Route, Controller, Request, Interface, Service, Migration and Model, run this command

```shell
node core generate:module --name ModuleName
```

After generated new module, migration file must be edited for your own needs, and then run the following command again to create the table,

```shell
npx sequelize-cli db:migrate
```

After migrated new table, Model file must be edited according to migration file.

For create new Request, run this command

```shell
node core generate:request --path ExampleController --name ExampleRequest
```

### Testing

#### Start server

```shell
nodemon index
```

#### Login

```shell
curl --location --request POST 'http://HOST:PORT/api/v1/user/auth/login' \
--header 'Accept: application/json' \
--data-raw '{"email": "admin@admin.com", "password": "123456"}'
```

#### Get All Users

```shell
curl --location --request GET 'http://HOST:PORT/api/v1/user/getAll' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer tokenFromLoginRequest' \
```

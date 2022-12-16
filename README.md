# node-core

NodeCore is core system for develope NodeJs applications.

## Installation

To use this package, NPM must be pre-installed on your system.

### Include node-modules

```shell
npm init
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

For create new module, so Migration, Model, Interface, Service and Controller, run this command

```shell
node core generate:module --name ModuleName
```

After the necessary adjustments are completed in the created Migration file, run the following command to create the tables again

```shell
npx sequelize-cli db:migrate
```

Run the following command to seed admin user

```shell
npx sequelize-cli db:seed:all
```

For create new Request, run this command

```shell
node core generate:request --path ExampleController --name ExampleRequest
```

### Testing

#### Login

```shell
curl --location --request POST 'http://HOST:PORT/api/v1/user/auth/login' \
--header 'Accept: application/json' \
--data-raw '{"email": "admin@admin.com", "password": "123456"}'
```

#### Get All Users

```shell
curl --location --request POST 'http://HOST:PORT/api/v1/user/login' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer tokenFromLoginRequest' \
```

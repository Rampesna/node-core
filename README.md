# node-core

NodeCore is core system for develope NodeJs applications.

## Installation

To use this package, NPM must be pre-installed on your system.

### Include node-modules

```shell
npm init
```

### Database Configration

Change config/database.json file according to your own information.

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

For create new module, so Migration, Model, Interface, Service and Controller, run this command

```shell
node core generate:module --name ModuleName
```

After the necessary adjustments are completed in the created Migration file, run the following command to create the tables again

```shell
npx sequelize-cli db:migrate
```

For create new Request, run this command

```shell
node core generate:request --path ExampleController --name ExampleRequest
```

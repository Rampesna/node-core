const {
    Model,
    Sequelize,
    DataTypes,
} = require('sequelize');
const environments = require('dotenv').config().parsed;

const sequelizeConnection = new Sequelize(
    environments.DB_DATABASE,
    environments.DB_USERNAME,
    environments.DB_PASSWORD,
    {
        dialect: environments.DB_CONNECTION,
        host: environments.DB_HOST,
        port: environments.DB_PORT,
    });

module.exports = {
    sequelizeConnection,
    Sequelize,
    DataTypes,
    Model,
};

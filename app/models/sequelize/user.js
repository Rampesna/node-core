"use strict";
const {
    sequelizeConnection,
    DataTypes,
    Model,
} = require('../../../config/database');

module.exports = () => {
    class User extends Model {
        static associate(models) {

        }
    }

    User.init(
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            deletedAt: DataTypes.DATE,
        },
        {
            sequelize: sequelizeConnection,
            paranoid: true,
            modelName: 'User',
        }
    );

    return User;
};

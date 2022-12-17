"use strict";
const {
    sequelizeConnection,
    DataTypes,
    Model,
} = require('../../../config/database');

module.exports = () => {
    class PersonelAccessToken extends Model {
        static associate(models) {

        }
    }

    PersonelAccessToken.init(
        {
            tokenableType: DataTypes.STRING,
            tokenableId: DataTypes.BIGINT,
            token: DataTypes.STRING,
            userAgent: DataTypes.STRING,
            lastUsedAt: DataTypes.DATE
        },
        {
            sequelize: sequelizeConnection,
            paranoid: true,
            modelName: 'PersonelAccessToken',
        }
    );

    return PersonelAccessToken;
};

const {
    sequelizeConnection,
    DataTypes,
    Model,
} = require('../../../config/database');

module.exports = () => {
    class PersonelAccessTokenModel extends Model {
        static associate(models) {

        }
    }

    PersonelAccessTokenModel.init(
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

    return PersonelAccessTokenModel;
};

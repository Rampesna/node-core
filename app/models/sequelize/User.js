const {
    sequelizeConnection,
    DataTypes,
    Model,
} = require('../../../config/database');

module.exports = () => {
    class UserModel extends Model {
        static associate(models) {
            // this.hasMany(models.TodoModel, {
            //     foreignKey: 'userId',
            //     as: 'todos',
            // });
        }
    }

    UserModel.init(
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

    return UserModel;
};

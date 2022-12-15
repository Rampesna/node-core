const {serviceResponse} = require('../../core/ServiceResponse');
const IUserService = require('../../interfaces/IUserService');
const UserModel = require('../../models/sequelize/user')();
const bcrypt = require('bcrypt');
const PersonalAccessTokenService = require('./PersonalAccessTokenService');

class UserService extends IUserService {
    constructor() {
        super();
    }

    async login(
        email,
        password,
        userAgent
    ) {
        let user = await UserModel.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            return serviceResponse(
                false,
                'User not found',
                null,
                404
            );
        }

        if (await this.comparePassword(password, user.password) === false) {
            return serviceResponse(
                false,
                'Password is incorrect',
                null,
                401
            );
        }

        let tokenResponse = await PersonalAccessTokenService.generateToken(
            user,
            userAgent
        );

        return serviceResponse(
            true,
            'User logged in successfully',
            {
                token: tokenResponse.data
            },
            200
        );
    }

    async comparePassword(
        password,
        hash
    ) {
        return bcrypt.compare(password, hash);
    }

    async getAll() {
        let allUsers = await UserModel.findAll();
        return serviceResponse(
            true,
            'All users',
            allUsers,
            200
        );
    }

    async getById(
        id
    ) {
        let user = await UserModel.findByPk(id);
        if (user != null) {
            return serviceResponse(
                true,
                'User',
                user,
                200
            );
        } else {
            return serviceResponse(
                false,
                'User not found',
                null,
                404
            );
        }
    }

    async delete(
        id
    ) {
        let user = await UserModel.findByPk(id);
        if (user != null) {
            await user.destroy();
            return serviceResponse(
                true,
                'User deleted',
                null,
                200
            );
        } else {
            return serviceResponse(
                false,
                'User not found',
                null,
                404
            );
        }
    }
}

module.exports = new UserService();

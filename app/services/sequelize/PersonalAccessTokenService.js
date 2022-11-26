const {serviceResponse} = require("../../core/ServiceResponse");
const IPersonalAccessTokenService = require("../../interfaces/IPersonalAccessTokenService");
const PersonalAccessTokenModel = require("../../models/sequelize/personelaccesstoken")();
const jwt = require('jsonwebtoken');
const environments = require('dotenv').config().parsed;

class PersonalAccessTokenService extends IPersonalAccessTokenService {
    constructor() {
        super();
    }

    async generateToken(
        user,
        userAgent
    ) {
        let token = jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name,
        }, environments.JWT_SECRET_KEY);

        PersonalAccessTokenModel.create({
            tokenableType: 'User',
            tokenableId: user.id,
            token: token,
            userAgent: userAgent,
            lastUsedAt: null,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });

        return serviceResponse(
            true,
            'Token is generated',
            token,
            200
        );
    }

    async validateToken(token) {
        let personalAccessToken = await PersonalAccessTokenModel.findOne({
            where: {
                token: token,
            }
        });
        if (!personalAccessToken) {
            return serviceResponse(
                false,
                'Token is not valid',
                null,
                401
            );
        } else {
            return await jwt.verify(personalAccessToken.token, environments.JWT_SECRET_KEY, (err, decoded) => {
                if (err) {
                    return serviceResponse(
                        false,
                        'Token is not valid',
                        null,
                        401
                    );
                }

                PersonalAccessTokenModel.update(
                    {
                        lastUsedAt: Date.now(),
                    },
                    {
                        where: {
                            token: token,
                        }
                    });

                return serviceResponse(
                    true,
                    'Token is valid',
                    decoded,
                    200
                );
            });
        }
    }
}

module.exports = new PersonalAccessTokenService;

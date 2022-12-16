const {serviceResponse} = require('../../core/ServiceResponse');
const PersonalAccessTokenService = require('../../services/sequelize/PersonalAccessTokenService');

const AuthenticationMiddleware = async (
    request,
    response,
    next
) => {
    if (!request.headers['authorization']) {
        return response.send(serviceResponse(
            false,
            'You are not authorized to access this route',
            null,
            401
        ), 401);
    }

    var validateTokenResponse = await PersonalAccessTokenService.validateToken(request.headers['authorization'].split(' ')[1]);

    if (!validateTokenResponse.isSuccess) {
        return response.send(validateTokenResponse, 401);
    }

    request.user = {
        id: validateTokenResponse.data.id,
        name: validateTokenResponse.data.name,
        email: validateTokenResponse.data.email,
    }

    next();
};

module.exports = AuthenticationMiddleware;

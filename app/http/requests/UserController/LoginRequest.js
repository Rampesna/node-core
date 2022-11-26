const {
    serviceResponse
} = require('../../../core/ServiceResponse');

const LoginRequest = (
    request,
    response,
    next
) => {
    if (!request.props.email) {
        return response.send(serviceResponse(
            false,
            "email is required",
            null,
            422
        ), 422);
    }

    if (!request.props.password) {
        return response.send(serviceResponse(
            false,
            "password is required",
            null,
            422
        ), 422);
    }

    next();
};

module.exports = LoginRequest;

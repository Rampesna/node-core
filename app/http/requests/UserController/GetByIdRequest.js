const {
    serviceResponse
} = require('../../../core/ServiceResponse');

const GetByIdRequest = (
    request,
    response,
    next
) => {
    if (!request.props.id) {
        return response.send(serviceResponse(
            false,
            "email is required",
            null,
            422
        ), 422);
    }

    next();
};

module.exports = GetByIdRequest;

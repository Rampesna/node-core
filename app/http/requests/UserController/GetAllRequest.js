const {serviceResponse} = require("../../../core/ServiceResponse");
const Joi = require('joi');
const Schema = Joi.object({

});

const GetAllRequest = async (
    request,
    response,
    next
) => {
    try {
        await Schema.validateAsync(request.props);
        next();
    } catch (error) {
        return response.send(serviceResponse(
            false,
            'Invalid request',
            error.details,
            422
        ), 422);
    }
};

module.exports = GetAllRequest;

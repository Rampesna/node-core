const UserService = require('../../services/sequelize/UserService');

exports.login = async (request, response) => {
    serviceResponse = await UserService.login(request.props.email, request.props.password, request.headers['user-agent']);
    response.send(serviceResponse, serviceResponse.statusCode);
}

exports.getProfile = async (request, response) => {
    serviceResponse = await UserService.getById(request.user.id);
    response.send(serviceResponse, serviceResponse.statusCode);
}

exports.getAll = async (request, response) => {
    serviceResponse = await UserService.getAll();
    response.send(serviceResponse, serviceResponse.statusCode);
}

exports.getById = async (request, response) => {
    serviceResponse = await UserService.getById(request.props.id);
    response.send(serviceResponse, serviceResponse.statusCode);
}

exports.delete = async (request, response) => {
    serviceResponse = await UserService.delete(request.props.id);
    response.send(serviceResponse, serviceResponse.statusCode);
}

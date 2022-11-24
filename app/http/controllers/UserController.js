exports.getProfile = async (request, response) => {
    response.send({
        isSuccess: true,
        message: 'Profile',
        data: {},
        statusCode: 200
    }, 200);
}

exports.getProfile2 = async (request, response) => {
    await new Promise(resolve => setTimeout(resolve, 30000));
    response.send({
        isSuccess: true,
        message: 'Profile 2',
        data: {},
        statusCode: 200
    }, 200);
}

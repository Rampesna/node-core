function serviceResponse(
    isSuccess,
    message,
    data,
    statusCode,
) {
    return {
        isSuccess: isSuccess,
        message: message,
        data: data,
        statusCode: statusCode,
    };
}

module.exports = {
    serviceResponse
};

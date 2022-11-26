const CoreRequestMiddleware = (
    request,
    response,
    next
) => {
    request.props = Object.assign(request.query, request.params, request.body);

    next();
};

module.exports = CoreRequestMiddleware;

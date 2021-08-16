const ERROR_HANDLERS = {
    CastError: (res) => res.status(400).send({ error: 'Used body is malformed' }),

    JsonWebTokenError: (res) =>
        res.status(401).json({ error: 'Token missing or invalid' }),

    TokenExpirerError: (res) =>
        res.status(401).json({ error: 'Token expired' }),

    SequelizeValidationError: (res, { errors }) => 
        res.status(409).send({
            error: 'Validation error',
            errors: errors.map(error => error.message) 
        }),
    
    SequelizeDatabaseError: (res, { errors }) => 
        res.status(500).json({ error: 'Database error' }),

    defaultError: (res, error) =>
        res.status(500).end()
};

module.exports = (error, request, response, next) => {
    const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;

    handler(response, error);
};

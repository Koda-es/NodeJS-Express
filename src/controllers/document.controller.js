const Document = require('@models/document.model');

exports.getAll = (request, response, next) => {

    const onSuccess = (result, response) => 
        response.status(200).json({ documents: result });

    const config = {
        order: [
            ['id', 'DESC']
        ]
    };

    Document.findAll(config)
        .then(result => onSuccess(result, response))
        .catch(error => next(error));
};

exports.getById = (request, response, next) => {
    const { id } = request.params;

    const onSuccess = (result, response) => 
        (!result)
            ? response.status(404).send()
            : response.status(200).json({ document: result });
    
    Document.findByPk(id)
        .then(result => onSuccess(result, response))
        .catch(error => next(error));
};

exports.store = (request, response, next) => {

    const { title, description, userId } = request.body;

    const onSuccess = (result, response) => 
        response.status(200).json({ document: result });
    
    const data = {
        title: title,
        description: description,
        userId: userId
    };

    Document.create(data)
        .then(result => onSuccess(result, response))
        .catch(error => next(error));
};


exports.update = (request, response, next) => {
    const { id } = request.params;

    const { title, description, userId } = request.body;

    const data = {
        title: title,
        description: description
    };

    const config = {
        where: { 
            id: id,
            userId: userId
        },
    };
    
    const onSuccess = (result, response) => 
        response.status(200).json({ document: result });

    Document.update(data, config)
        .then(result => onSuccess(result, response))
        .catch(error => next(error));
};

exports.delete = (request, response, next) => {
    const { id } = request.params;

    const onSuccess = (result, response) => 
        response.status(200).send();

    const config = {
        where: { id: id }
    };

    Document.destroy(config)
    .then(result => onSuccess(result, response))
    .catch(error => next(error));
};

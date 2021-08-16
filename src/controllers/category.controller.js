const Category = require('@models/category.model');

exports.getAll = async (request, response, next) => {
    const result = await Category.findAll();

    response.status(200).json({
        documents: result
    });
};

exports.getById = async (request, response, next) => {
    const { id } = request.params;

    const result = await Category.findByPk(id);

    if (!result)
        return response.status(400).send();

    response.status(200).json({
        document: result
    });
};

exports.store = (request, response, next) => {

    const { title, description } = request.body;

    const onSuccess = (result, response) => 
        response.status(200).json({
            document: result
        });
    
    const onError = (errors, response) => 
        response.status(400).json({
            errors: error.errors.map(error => error.message)
        });
    
    Category.create({
        title: title,
        description: description,
    })
    .then(result => onSuccess(result, response))
    .catch(error => onError(error, response));
};


exports.update = async (request, response, next) => {
    const { id } = request.params;

    const { title, description } = request.body;

    const result = await Category.update(
        {
            title: title,
            description: description,
        },
        {
            where: { id: id },
        }
    );

    response.status(200).json({
        document: result
    });
};

exports.delete = async (request, response, next) => {
    const { id } = request.params;

    const result = await Category.destroy({
        where: { id: id },
    });

    response.status(200).send();
};

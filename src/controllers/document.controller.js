const Document = require("@models/document.model");

const { documentHasAllData } = require('@validators/document.validator');

exports.getAll = async (request, response) => {
    const result = await Document.findAll();

    response.status(200).json({
        documents: result
    });
};

exports.getById = async (request, response) => {
    const { id } = request.params;

    const result = await Document.findByPk(id);

    if (!result)
        return response.status(400).send();

    response.status(200).json({
        document: result
    });
};

exports.store = async (request, response) => {

    const { title, description } = request.body;

    const validationSuccess = await documentHasAllData({
        title, description
    });

    if (!validationSuccess)
        return response.status(400).send();

    const result = await Document.create({
        title: title,
        description: description,
    });

    response.status(200).json({
        document: result
    });
};


exports.update = async (request, response) => {
    const { id } = request.params;

    const { title, description } = request.body;

    const validationSuccess = await documentHasAllData({
        title, description
    });

    if (!validationSuccess)
        return response.status(400).send();

    const result = await Document.update(
        {
            title: title,
            description: description,
        },
        {
            where: { id: id },
        }
    )

    response.status(200).json({
        document: result
    });
};

exports.delete = async (request, response) => {
    const { id } = request.params;

    const result = await Document.destroy({
        where: { id: id },
    })

    response.status(200).send();
};

'use strict';

const Document = require('@models/document.model');
const { documentHasAllData } = require('@validators/document.validator');

exports.getAll = (request, response) => {

    const callback = (err, documents) => (err)
        ? response.send(err)
        : response.send({ documents });

    Document.getAll(callback);
}

exports.getById = (request, response) => {
    const { id } = request.params;

    const callback = (err, document) => (err)
        ? response.send(err)
        : response.send({ document });

    Document.getById({ id }, callback);
}

exports.store = async (request, response) => {
    const { body } = request;

    const newDocument = new Document(body);

    const validationSuccess = await documentHasAllData(newDocument);

    if (!validationSuccess)
        return response.status(400).json({ error: true });

    const callback =  (err, id) => (err) 
        ? response.send(err)
        : response.json({ error: false, id });

    Document.store(newDocument, callback);
};

exports.update = async (request, response) => {
    const { body } = request;

    const newDocument = new Document(body);

    const validationSuccess = await documentHasAllData(newDocument);

    if (!validationSuccess)
        return response.status(400).json({ error: true });

    const callback = err => (err)
        ? response.send(err)
        : response.json({ error: false });

    Document.update(newDocument, callback);
};

exports.delete = (request, response) => {
    const { id } = request.params;

    const callback = err => (err) 
        ? response.send(err)
        : response.json({ error: false });

    Document.delete(id, callback);
}
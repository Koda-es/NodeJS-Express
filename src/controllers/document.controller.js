'use strict';

const Document = require('../models/document.model');

const hasAllRequiredFields = (req) => 
    (req.body.constructor === Object && Object.keys(req.body).length === 0)


exports.getAll = (req, res) =>
    Document.getAll(
        (err, documents) => (err)
            ? res.send(err)
            : res.send(documents)
    );

exports.getById = (req, res) =>
    Document.getById(req.params.id,
        (err, document) => (err)
            ? res.send(err)
            : res.send(document)
    );

exports.store = (req, res) => {
    const newDocument = new Document(req.body);

    (hasAllRequiredFields(req))

        ? res.status(400).send({ error: true })
        
        : Document.store(newDocument, 
            (err, document) => (err) 
                ? res.send(err)
                : res.json({ error: false, data: document })
        );
        
};

exports.update = (req, res) => {

    const newDocument = new Document(req.body);

    (hasAllRequiredFields(req))

        ? res.status(400).send({ error: true })

        : Document.update(newDocument, 
            (err, document) => (err)
                ? res.send(err)
                : res.json({ error: false, data: document })
        );
};

exports.delete = (req, res) => 
    Document.delete(req.params.id, 
        (err) => (err) 
            ? res.send(err)
            : res.json({ error: false })
    );
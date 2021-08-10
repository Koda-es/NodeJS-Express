'use strict';

const db = require('@config/db');

let Document = function (document) {
    this.id = document.id;
    this.title = document.title;
    this.description = document.description;
    this.created_at = document.created_at ?? new Date();
    this.updated_at = new Date();
};

Document.getById = ({id}, result) => {
    const callback = (error, response) => (error)
        ? result(error, null)
        : result(null, response[0]);

    db.query('SELECT * FROM documents WHERE id = ?', id, callback);
}

Document.getAll = (result) => {
    const callback = (error, response) => (error)
        ? result(error, null)
        : result(null, response);

    db.query('SELECT * FROM documents', callback);
}

Document.store = (newDocument, result) => {
    const callback = (error, response) => (error) 
        ? result(error, null)
        : result(null, response.insertId);

    db.query('INSERT INTO documents set ?', newDocument, callback);
}

Document.update = ({ id, title, description }, result) => {
    const callback = (error, response) => (error)
        ? result(error, null)
        : result(null, null);

    db.query(
        'UPDATE documents SET title = ?, description = ? WHERE id = ?', 
        [title, description, id], 
        callback
    );
}

Document.delete = (id, result) => {
    const callback =  (error, response) => (error)
        ? result(error, null)
        : result(null, response);

    db.query('DELETE FROM documents WHERE id = ?', [id], callback);
}

module.exports = Document;
'use strict';

const db = require('./../../config/db.config');

let Document = function (document) {
    this.id = document.id;
    this.title = document.title;
    this.description = document.description;
    this.created_at = document.created_at ?? new Date();
    this.updated_at = new Date();
};

Document.getById = (id, result) =>
    db.query('SELECT * FROM documents WHERE id = ? ', id, 
        (err, resp) => (err)
            ? result(err, null)
            : result(null, resp)
    );

Document.getAll = (result) =>
    db.query('SELECT * FROM documents', 
        (err, resp) => (err)
            ? result(err, null)
            : result(null, resp)
   );

Document.store = (newDocument, result) =>
   db.query('INSERT INTO documents set ?', newDocument, 
       (err, resp) => (err) 
           ? result(err, null)
           : result(null, resp.insertId)
   );

Document.update = ({ id, title, description }, result) =>
    db.query("UPDATE documents SET title = ?, description = ? WHERE id = ?", [title, description, id],
        (err, resp) => (err)
            ? result(err, null)
            : result(null, resp)
   );

Document.delete = (id, result) =>
    db.query("DELETE FROM documents WHERE id = ?", [id],
        (err, resp) => (err)
            ? result(err, null)
            : result(null, resp)
   );

module.exports = Document;
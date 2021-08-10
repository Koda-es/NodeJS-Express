const supertest = require('supertest');

const { app } = require('../server');

const api = supertest(app);

const initialDocuments = [
    {
        title: 'Title of the first Document',
        description: 'Description of the first Document',
    },
    {
        title: 'Title of the second Document',
        description: 'Description of the second Document',
    },
    {
        title: 'Title of the third Document',
        description: 'Description of the third Document',
    }
];

module.exports = { api, initialDocuments };

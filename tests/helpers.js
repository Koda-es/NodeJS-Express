const supertest = require('supertest');

const { app } = require('../server');

const api = supertest(app);

const initialUsers = [
    {
        name: 'Username and Surname',
        email: 'email@email.com',
        age: 18,
        role: 1,
    },
    {
        name: 'Surname and Username',
        email: 'email@email.com',
        age: 28,
        role: 0,
    },
    {
        name: 'Username and Surname',
        email: 'email@email.com',
        age: 38,
        role: 1,
    },
];

const initialDocuments = [
    {
        title: 'Title of the first Document',
        description: 'Description of the first Document',
        userId: 1,
    },
    {
        title: 'Title of the second Document',
        description: 'Description of the second Document',
        userId: 2,
    },
    {
        title: 'Title of the third Document',
        description: 'Description of the third Document',
        userId: 1,
    }
];

module.exports = { api, initialUsers, initialDocuments };

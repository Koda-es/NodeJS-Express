const { server } = require('../server');

const { api, initialUsers, initialDocuments } = require('./helpers');

const Document = require('@models/document.model');
const User = require('@models/user.model');

const { sequelize } = require('@config/db');

beforeEach(
    async () => {
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });

        await Document.sync({ force: true });
        await User.sync({ force: true });

        for (const user of initialUsers) 
        {
            await User.create(user);
        }

        for (const document of initialDocuments) 
        {
            await Document.create(document);
        }

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });
    }
);


describe('GET all Documents', () => {

    test('There are three Documents', async () => {
        const response = await api.get('/api/documents');

        const { documents } = response.body;

        expect(documents).toHaveLength(initialDocuments.length);
    });
});

describe('GET Document by ID', () => {

    test('Is posible with existing ID', async () => {
        const response = await api.get('/api/documents/' + 2);

        const { document } = response.body;
 
        expect(document).not.toBeNull();
    });

    test('Is not posible with no existing ID', async () => {
        const response = await api.get('/api/documents/' + 4);

        const { statusCode } = response;
 
        expect(statusCode).toBe(404);
    });
});


describe('STORE a Document', () => {
    test('Is possible with good Parameters and existing User', async () => {

        const newDocument = {
            title: 'New document title',
            description: 'New document description',
            userId: 1,
        };

        const postResponse = await api.post('/api/documents').send(newDocument);

        const { statusCode, body } = postResponse;
        const { id } = body.document;

        expect(statusCode).toBe(200);

        const getResponse = await api.get(`/api/documents/${id}`);

        const { title, description } = getResponse.body.document;

        expect(title).toBe(newDocument.title);
        expect(description).toBe(newDocument.description);
    });

    test('Is not possible with bad Parameters', async () => {

        const newDocument = {
          title: '',
          description: '',
        };

        const response = await api.post('/api/documents').send(newDocument);

        const { statusCode } = response;
        
        expect(statusCode).toBe(409);
    });

    test('Is not possible with no existing User', async () => {

        const newDocument = {
            title: 'New document title',
            description: 'New document description',
            userId: 4,
        };

        const response = await api.post('/api/documents').send(newDocument);

        const { statusCode } = response;
        
        expect(statusCode).toBe(500);
    });
});

afterAll(() => {
    server.close();
    sequelize.close();
});

const { server } = require('../server');

const { api, initialDocuments } = require('./helpers');

const Document = require('@models/document.model');

beforeEach(
    async () => {

        Document.destroy({
            where: {},
            truncate: true
        });
        
        for (const document of initialDocuments) 
        {
            await Document.create({ ... document });
        }
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
 
        expect(statusCode).toBe(400);
    });
});


describe('STORE a Document', () => {
    test('Is possible with good parameters', async () => {

        const newDocument = {
            title: 'New document title',
            description: 'New document description',
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

    test('Is not possible with bad parameters', async () => {

        const newDocument = {
          title: '',
          description: '',
        };

        const response = await api.post('/api/documents').send(newDocument);

        const { statusCode } = response;
        
        expect(statusCode).toBe(400);
    });
});

afterAll(() => server.close());

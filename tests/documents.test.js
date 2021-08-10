const { server } = require('../server');

const { api, initialDocuments } = require('./helpers');

const db = require('@config/db');

const Document = require('@models/document.model');

beforeEach(
    async () => {
        await db.query('TRUNCATE TABLE documents');

        for (const document of initialDocuments) 
        {
            const newDocument = new Document(document);
 
            await db.query(`INSERT INTO documents SET ?`, newDocument); 
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

    test('Existing ID', async () => {
        const response = await api.get('/api/documents/' + 2);

        const { document } = response.body;
 
        expect(document).not.toBeNull();
    });

    test('No existing ID', async () => {
        const response = await api.get('/api/documents/' + 4);

        const { statusCode } = response;
 
        expect(statusCode).toBe(200);
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
        const { id } = body;

        expect(statusCode).toBe(200);
        expect(id).not.toBeNull();

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

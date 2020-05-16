import supertest from 'supertest';
import app from '../../src/app';

describe('test Sample', () => {
  const client = supertest(app);

  test('test index sample', async () => {
    const response = await client.get('/api');
    const result = 'Hello! This is sample😎';
    expect(response.status).toBe(200);
    expect(response.body).toBe(result);
  });
});

import supertest from 'supertest';
import { app } from '../index';
import { MongoClient } from 'mongodb';
import { connectDatabase } from '../database/mongo/connection';
import { getDefaultSettingsValue } from '../modules/settings/default-values';

const request = supertest(app);

beforeEach(async () => {
  await connectDatabase();
});

afterEach(async () => {
  const client = await MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017');
  await client.close();
});

describe('Settings Endpoints', () => {
  describe('GET /settings/:clientId', () => {
    it('should return an ok status in the endpoint', async () => {
      const response = await request.get('/settings/123');
      expect(response.status).toBe(200);
    });

    it('should return an error with a NaN clientId ', async () => {
      const response = await request.get('/settings/abc');
      expect(response.status).toBe(400);
    });

    it('should return an not found with a no clientId ', async () => {
      const response = await request.get('/settings');
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /settings/:clientId', () => {
    it('should return an error with a clientId that not exists', async () => {
      const response = await request.put('/settings/999999');
      expect(response.status).toBe(400);
    });

    it('should no handle update with empty body', async () => {
      const response = await request.put('/settings/123').send({});
      expect(response.status).toBe(400);
    });

    it('should not handle update with a NaN clientId', async () => {
      const response = await request.put('/settings/abc').send({
        clientId: '123',
      });

      expect(response.status).toBe(400);
    });

    it('should not handle update with a wrong format body', async () => {
      const wrongBody = {
        clientId: '123',
        key: 'value',
        wrong: 'body',
      };

      const response = await request.put('/settings/abc').send(wrongBody);

      expect(response.status).toBe(400);
    });

    it('should handle update with a correct format body', async () => {
      const defaultBody = getDefaultSettingsValue(123);
      const response = await request.put('/settings/123').send(defaultBody);

      expect(response.status).toBe(200);
    });
  });
});

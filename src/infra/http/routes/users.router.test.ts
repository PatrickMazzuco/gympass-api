import { type FastifyInstance } from 'fastify';
import { startTestHttpServer } from '../test/app';
import { testHttpClient } from '../test/http-client';
import { type SignupRequestBody } from './users.router';
import { clearPrismaDatabase } from '@/infra/db/prisma/tests/utils';
import { HttpStatusCode } from '../enums/http-status-code.enum';
import { mockSignupRequestBody } from '@/tests/mocks/modules/users/users-routes.mock';

describe('User routes', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await startTestHttpServer();
  });

  beforeEach(async () => {
    await clearPrismaDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /users', async () => {
    it('should return 201 on success', async () => {
      const requestBody: SignupRequestBody = mockSignupRequestBody();

      const response = await testHttpClient.post('/users', requestBody);

      expect(response.status).toBe(HttpStatusCode.CREATED);
      expect(response.data).toEqual(
        expect.objectContaining({
          id: expect.any(String),
        }),
      );
    });

    it('should return 409 if email is already in use', async () => {
      const requestBody: SignupRequestBody = mockSignupRequestBody();

      await testHttpClient.post('/users', requestBody);

      const response = await testHttpClient.post('/users', requestBody);

      expect(response.status).toBe(HttpStatusCode.CONFLICT);
    });

    it('should return 400 if email is invalid', async () => {
      const requestBody: SignupRequestBody = mockSignupRequestBody();
      requestBody.email = 'invalid-email';

      const response = await testHttpClient.post('/users', requestBody);

      expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    });

    it('should return 400 if password is invalid', async () => {
      const requestBody: SignupRequestBody = mockSignupRequestBody();
      requestBody.password = 'weak-password';

      const response = await testHttpClient.post('/users', requestBody);

      expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    });
  });
});

const request = require('supertest');
const server = require('../api/server');

describe('auth-router.js', function() {
  describe('/register', function() {
    it('should require password to register', async function() {
      const res = await request(server)
        .post('/api/auth/register')
        .send({ username: "xxx" });
      
      expect(res.status).toBe(500);
      expect(res.type).toBe('text/html');
    });

  });

  describe('/login', function() {
    it('should require password to login', async () => {
      const res = await request(server)
        .post('/api/auth/login')
        .send({ username: "xxx" });

      expect(res.status).toBe(500);
    });
    
  })
})
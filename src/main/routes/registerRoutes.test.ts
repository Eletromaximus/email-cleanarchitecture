/* eslint-disable no-undef */
import request from 'supertest'
import app from '../config/App'

describe('Register Routes', () => {
  test('should return an account on sucess', async () => {
    app.post('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .post('/api/register')
      .send({
        name: 'Max Milliano',
        email: 'mmagnomagno@bol.com.br',
        description: 'description'
      })
      .expect(200)
  }, 20000)
})

import request from 'supertest'
import { afterAll, it } from 'vitest'
import { app } from '../server'

afterAll(() => {
  app.ready()
})

it('should create a new transaction', async () => {
  request(app.server)
    .post('/transactions')
    .send({
      type: 'credit',
      title: 'Giopol',
      amount: 5000,
    })
    .expect(201)
})

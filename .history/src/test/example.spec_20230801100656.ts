import request from 'supertest'
import { afterAll, beforeAll, it } from 'vitest'
import { app } from '../app'

beforeAll(async () => {
  await app.ready()
})
afterAll(async () => {
  await app.close()
})
it('should create a new transaction', async () => {
  await request(app.server)
    .post('/transactions')
    .send({
      type: 'credit',
      title: 'Giopol',
      amount: 5000,
    })
    .expect(201)
})

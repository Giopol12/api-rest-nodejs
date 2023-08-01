import request from 'supertest'
import { afterAll, it } from 'vitest'
import { app } from '../server'

afterAll(async () => {
  await app.ready()
})

it('should create a new transaction', async () => {
  awaitrequest(app.server)
    .post('/transactions')
    .send({
      type: 'credit',
      title: 'Giopol',
      amount: 5000,
    })
    .expect(201)
})

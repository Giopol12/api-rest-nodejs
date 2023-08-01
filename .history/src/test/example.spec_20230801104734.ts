import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../app'
import { execSync } from 'child_process'

describe('Transaction routes', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  beforeEach(async () => {})
  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        type: 'credit',
        title: 'Giopol',
        amount: 5000,
      })
      .expect(201)
  })
  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        type: 'credit',
        title: 'Giopol',
        amount: 5000,
      })
    const cookies = createTransactionResponse.get('Set-Cookie')
    const listTransaction = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransaction.body.transactions).toEqual([
      expect.objectContaining({
        title: 'Giopol',
        amount: 5000,
      }),
    ])
  })
})

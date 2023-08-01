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
  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })
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
  it('should be able to get a specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        type: 'credit',
        title: 'Giopol',
        amount: 5000,
      })
    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactions = await request(app.server)
      .get(`/transactions`)
      .set('Cookie', cookies)
      .expect(200)
    const responseId = listTransactions.body.transactions[0].id

    const specificTransaction = await request(app.server)
      .get(`/transactions/${responseId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(specificTransaction.body.transaction).toEqual(
      expect.objectContaining({
        title: 'Giopol',
        amount: 5000,
      }),
    )
  })
  it('should be able to get the summary', async () => {
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

import request from 'supertest'
import { expect, it } from 'vitest'
import { app } from '../server'

it('should create a new transaction', () => {
  request(app.server).post('/transactions').send({
    type: 'credit',
    title: 'Giopol',
    amount: 5000,
  })
})

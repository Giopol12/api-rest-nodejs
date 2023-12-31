import { FastifyInstance } from 'fastify'
import { knex } from '../database'

export function transactionsRoutes(app: FastifyInstance) {
  app.get('/hello', async () => {
    const transactions = await knex('transactions').select('*')
    return transactions
  })
}

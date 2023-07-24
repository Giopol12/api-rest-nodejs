import fastify from 'fastify'
import { knex } from './database'
import { randomUUID } from 'crypto'

const app = fastify()

app.get('/hello', async (req, res) => {
  const transactions = await knex('transactions').where('amount',10-).select('*')
  return transactions
})

app.listen({ port: 3333 }).then(() => {
  console.log('Server listening on')
})

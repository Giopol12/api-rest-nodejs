import fastify from 'fastify'
import { knex } from './database'
import { randomUUID } from 'crypto'

const app = fastify()

app.get('/hello', async (req, res) => {
  const transaction = knex('transactions').insert({
    id: randomUUID(),
  })
  return transaction
})

app.listen({ port: 3333 }).then(() => {
  console.log('Server listening on')
})

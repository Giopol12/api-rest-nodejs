import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createTranctionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })
    const { amount, title, type } = createTranctionBodySchema.parse(
      request.body,
    )
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })
    return reply.status(201).send()
  })
  app.get('/', async (request, reply) => {
    const transactions = await knex('transactions').select('*')
    return { transactions }
  })
  app.get('/:id', async (request) => {
    const requestParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = requestParamsSchema.parse(request.params)
    const transaction = await knex('transactions').where('id', id).first()
    return {
      transaction,
    }
  })
}

import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exist'

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

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 7, // 7 days
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })
    return reply.status(201).send()
  })

  app.get(
    '/',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { sessionId } = request.cookies
      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select('*')
      return { transactions }
    },
  )

  app.get(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const requestParamsSchema = z.object({
        id: z.string().uuid(),
      })
      const { sessionId } = request.cookies
      const { id } = requestParamsSchema.parse(request.params)
      const transaction = await knex('transactions')
        .where({
          id,
          session_id: sessionId,
        })
        .first()
      return {
        transaction,
      }
    },
  )

  app.get('/summary ', { preHandler: [checkSessionIdExists] }, async () => {
    const { sessionId } = request.cookies
    const summary = await knex('transactions')
      .where({
        session_id: sessionId,
      })
      .sum('amount', { as: 'amount' })
      .first()
    return summary
  })
}
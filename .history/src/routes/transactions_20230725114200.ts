import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/hello', async () => {
    
    const transactionSchema = z.object({
        id:z.uuid()
        title:z.string(),
        amount:z.number(),

    })


  })
}

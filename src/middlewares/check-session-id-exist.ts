import { FastifyRequest } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (!request.cookies.sessionId) {
    return reply.status(401).send('Unauthorized')
  }
}

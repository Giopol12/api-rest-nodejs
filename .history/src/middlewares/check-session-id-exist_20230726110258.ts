import { FastifyRequest } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
)

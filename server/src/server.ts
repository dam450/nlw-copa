import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { authRoutes } from './routes/auth'
import { gameRoutes } from './routes/game'
import { guessRoutes } from './routes/guess'
import { poolRoutes } from './routes/pool'
import { userRoutes } from './routes/user'

async function bootstrap() {
  const fastify = Fastify({
    logger: true
  })

  try {
    await fastify.register(cors, {
      origin: true
    })
  
    await fastify.register(jwt, {
      secret: 'nlwcopa' // em produção isso precisa ser uma variável de ambiente
    })
  
    await fastify.register(authRoutes)
    await fastify.register(gameRoutes)
    await fastify.register(guessRoutes)
    await fastify.register(poolRoutes)
    await fastify.register(userRoutes)
  
    await fastify.listen({ port: 3333, host: '0.0.0.0' })
    
  } catch (error) {
    fastify.log.error(error)

    process.exit(1)
    
  }
}

bootstrap()

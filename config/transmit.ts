import env from '#start/env'
import { defineConfig } from '@adonisjs/transmit'
import { redis } from '@adonisjs/transmit/transports'
import { throttle } from '#start/limiter'

export default defineConfig({
  pingInterval: false,
  transport: {
    driver: redis({
      host: env.get('REDIS_HOST'),
      port: env.get('REDIS_PORT'),
      password: env.get('REDIS_PASSWORD'),
    }),
  },
  async routeHandlerModifier(route) {
    const { middleware } = await import('#start/kernel')

    // Ensure you are authenticated to register your client
    if (route.getPattern() === '__transmit/events') {
      route.middleware(middleware.auth())
      return
    }

    // Add a throttle middleware to other transmit routes
    // route.use(throttle)
  },
})

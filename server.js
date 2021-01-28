const fastify = require('fastify')({ logger: true })
const fastifyEnv = require('fastify-env')
const Eta = require("eta")

/**
 * Register Environmentals
 */
const schema = {
  type: 'object',
  required: [
    'PORT',
    'NODE_ENV'
  ],
  properties: {
    PORT: {
      type: 'string',
      default: 3000
    },
    NODE_ENV: {
      type: 'string',
      default: 'dev'
    }
  }
}

const options = {
  confKey: 'config', // optional, default: 'config'
  schema: schema,
  dotenv: true
}

fastify
  .register(fastifyEnv, options)
  .ready((err) => {
    if (err) console.error(err)

    console.log(fastify.config) // or fastify[options.confKey]
    // output: { PORT: 3000 }
  })

/**
 * Register Templater
 */
fastify.register(require('point-of-view'), {
  engine: { eta: Eta }
})

/**
 * Routes
 */
fastify.get('/test', (req, reply) => {
  reply.view('/views/template.eta', {
    favorite: "Eta",
    name: "Ben",
    reasons: ["fast", "lightweight", "simple"]
  })
})


fastify.route({
  method: 'GET',
  url: '/',
  schema: {
    // request needs to have a querystring with a `name` parameter
    querystring: {
      name: { type: 'string' }
    },
    // the response needs to be an object with an `hello` property of type 'string'
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  },
  // this function is executed for every request before the handler is executed
  preHandler: async (request, reply) => {
    // E.g. check authentication
  },
  handler: async (request, reply) => {
    return { hello: process.env.NODE_ENV }
  }
})

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
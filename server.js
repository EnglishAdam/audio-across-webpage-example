const fastify = require('fastify')({ logger: true })
const fastifyEnv = require('fastify-env')
const path = require('path')
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
  // dotenv: true
}

fastify.register(fastifyEnv, options)

/**
 * Register Static Folder
 */
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/', // optional: default '/'
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
fastify.get('/', (req, reply) => reply.view('/views/index.eta'))
fastify.get('/about', (req, reply) => reply.view('/views/about.eta'))
fastify.get('/contact', (req, reply) => reply.view('/views/contact.eta'))
fastify.route({
  method: 'GET',
  url: '/test',
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
    return { hello: fastify.config.NODE_ENV }
  }
})


/**
 * Start Server When Ready
 */
const start = async () => {
  try {
    await fastify.listen(fastify.config.PORT)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
fastify.ready((err) => {
  if (err) console.error(err)
  start()
})
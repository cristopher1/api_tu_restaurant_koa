import openapi from 'openapi-comment-parser'
import { koaSwagger } from 'koa2-swagger-ui'
import Router from 'koa-router'

const router = new Router()

const openApiSpecification = openapi()

openApiSpecification.openapi = '3.1.0'
openApiSpecification.info.title = 'API tu restaurant documentation'
openApiSpecification.info.version = '1.0.0'

const swagger = koaSwagger({
  routePrefix: false,
  swaggerOptions: {
    spec: openApiSpecification,
  },
})

router.get('/api/v1/docs', swagger)

export { router as swaggerRouter }

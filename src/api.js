import Koa from 'koa'
import koaBody from 'koa-body'
import override from 'koa-override-method'
import bearerToken from 'koa-bearer-token'
import { swaggerRouter } from './swagger.js'
import { apiRouter } from './routes/index.js'
import { buildORM } from './db/models/index.js'
import { ValidationError } from 'sequelize'

const getBuildAPI = (apiRouter, buildORM) => {
  const buildAPI = async () => {
    // Api constructor
    const api = new Koa()
    const orm = await buildORM()

    api.use(bearerToken())

    api.context.orm = orm

    // parse request body
    api.use(
      koaBody({
        multipart: true,
        keepExtensions: true,
      }),
    )

    api.use((ctx, next) => {
      ctx.request.method = override.call(
        ctx,
        ctx.request.body.fields || ctx.request.body,
      )
      return next()
    })

    // error handler
    api.use(async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        if (err instanceof ValidationError) {
          ctx.status = 400
          ctx.body = {
            error: err,
          }
          return
        }
        ctx.response.status = 500
        console.error(err.message)
      }
    })

    if (process.env.NODE_ENV !== 'production') {
      api.use(swaggerRouter.routes())
    }

    // Routing middleware
    api.use(apiRouter.routes())

    return api
  }
  return buildAPI
}

export const buildAPI = getBuildAPI(apiRouter, buildORM)

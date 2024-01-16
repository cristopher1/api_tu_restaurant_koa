import Router from 'koa-router'

const router = new Router()

/**
 * POST /api/v1/users
 *
 * @summary Create a user
 * @response 201 - Created
 * @response 401 - The client is not authorized
 * @response 500 - Unexpected error
 */
router.post('/', async (ctx) => {
  const user = { ...ctx.request.body }

  await ctx.orm.User.create(user)

  ctx.status = 201
})

export { router as registerRouter }

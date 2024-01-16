import Router from 'koa-router'

const router = new Router()

/**
 * GET /api/v1/users/{userId}/restaurants/{restaurantId}/menu/dishes
 *
 * @summary Returns all menu's dishes
 * @pathParam {Integer} userId - The user's ID
 * @pathParam {Integer} restaurantId - The restaurant ID
 * @response 200 - A JSON array that contains all dishes
 * @responseContent {string[]} 200.application/json
 * @response 401 - The client is not authorized
 * @response 404 - The menu does not contain dishes
 * @response 500 - Unexpected error
 */
router.get('/', async (ctx) => {
  const { menu } = ctx.state

  const dishes = await ctx.orm.Dish.findAll({
    where: {
      menu_id: menu.id,
    },
  })

  if (!dishes) {
    ctx.status = 404
    return
  }

  ctx.status = 200
  ctx.body = {
    dishes,
  }
})

router.post('/', async (ctx) => {
  const { menu } = ctx.state
  const dish = { ...ctx.request.body, menu_id: menu.id }

  await ctx.orm.Dish.create(dish)

  ctx.status = 201
})

router.put('/:dishId', async (ctx) => {
  const { dishId } = ctx.params
  const { menu } = ctx.state
  const newDishInfo = { ...ctx.request.body }

  const dish = await ctx.orm.Dish.findOne({
    where: {
      id: dishId,
      menu_id: menu.id,
    },
  })

  if (!dish) {
    ctx.status = 404
    return
  }

  await dish.update(newDishInfo)

  ctx.status = 200
})

export { router as dishRouter }

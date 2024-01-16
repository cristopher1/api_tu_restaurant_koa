import Router from 'koa-router'
import { menuRouter } from '../menu/router'

const router = new Router()

const loadRestaurantById = async (ctx, next) => {
  const { restaurantId } = ctx.params
  const { email } = ctx.state.userInfo

  const restaurant = await ctx.orm.Restaurant.findOne({
    where: {
      id: restaurantId,
      owner_email: email,
    },
  })

  if (!restaurant) {
    ctx.status = 404
    return
  }

  ctx.state.restaurant = restaurant
  await next()
}

router.use('/:restaurantId/menu', loadRestaurantById, menuRouter.routes())

router.get('/:restaurantId', loadRestaurantById, async (ctx) => {
  const { restaurant } = ctx.state

  ctx.status = 200
  ctx.body = {
    restaurant,
  }
})

router.get('/', async (ctx) => {
  const { email } = ctx.state.userInfo

  const restaurants = await ctx.orm.Restaurant.findAll({
    where: {
      owner_email: email,
    },
  })

  if (!restaurants) {
    ctx.status = 404
    return
  }

  ctx.status = 200
  ctx.body = {
    restaurants,
  }
})

router.post('/', async (ctx) => {
  const { email } = ctx.state.userInfo

  const restaurant = {
    ...ctx.request.body,
    owner_email: email,
  }

  await ctx.orm.Restaurant.create(restaurant)

  ctx.status = 201
})

router.put('/:restaurantId', async (ctx) => {
  const { restaurantId } = ctx.params
  const { email } = ctx.state.userInfo
  const newRestaurantInfo = { ...ctx.request.body }

  const restaurant = await ctx.orm.Restaurant.findOne({
    where: {
      id: restaurantId,
      owner_email: email,
    },
  })

  if (!restaurant) {
    ctx.status = 404
    return
  }

  await restaurant.update(newRestaurantInfo)

  ctx.status = 201
})

export { router as restaurantRouter }

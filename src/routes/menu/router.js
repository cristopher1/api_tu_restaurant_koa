import Router from 'koa-router'
import { dishRouter } from '../dish/router'

const router = new Router()

const loadMenu = async (ctx, next) => {
  const { restaurant } = ctx.state

  const menu = await ctx.orm.Menu.findOne({
    where: {
      restaurant_id: restaurant.id,
    },
  })

  if (!menu) {
    ctx.status = 404
    return
  }

  ctx.state.menu = menu
  await next()
}

router.use('/dishes', loadMenu, dishRouter.routes())

router.post('/', async (ctx) => {
  const { restaurant } = ctx.state

  await ctx.orm.Menu.create({
    restaurant_id: restaurant.id,
  })

  ctx.status = 201
})

export { router as menuRouter }

import Router from "koa-router";

const router = new Router({
  prefix: "/restaurants",
});

router.post("/", async (ctx) => {
  const { email } = ctx.state.userInfo;
  const {
    category,
    name,
    payment_method,
    business_hour,
    tables_availability,
    address,
    delivery,
    web_page,
  } = ctx.request.body;

  const restaurant = {
    category,
    name,
    payment_method,
    business_hour,
    tables_availability,
    address,
    delivery,
    web_page,
    owner_email: email,
  };

  await ctx.orm.Restaurant.create(restaurant);

  ctx.status = 201;
});

router.get("/", async (ctx) => {
  const { email } = ctx.state.userInfo;

  const restaurants = await ctx.orm.Restaurant.findAll({
    where: {
      owner_email: email,
    },
  });

  if (!restaurants) {
    ctx.status = 404;
    return;
  }

  ctx.status = 200;
  ctx.body = {
    restaurants,
  };
});

export { router as restaurantRouter };

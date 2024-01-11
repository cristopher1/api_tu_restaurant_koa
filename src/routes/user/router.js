import Router from "koa-router";
import { restaurantRouter } from "../restaurants/router.js";

const router = new Router({
  prefix: "/users",
});

router.use(restaurantRouter.routes());

router.put("/", async (ctx) => {
  const { email } = ctx.state.userInfo;
  const { username, surnames } = ctx.request.body;

  const updateInfoUser = {
    username,
    surnames,
  };

  const user = ctx.orm.User.findOne({
    where: {
      email,
    },
  });

  user.username = username;
  user.surnames = surnames;

  await user.save();

  ctx.status = 201;
});

router.get("/:email", async (ctx) => {
  const { email } = ctx.params;

  const user = await ctx.orm.User.findOne({
    where: {
      email,
    },
  });

  if (user) {
    ctx.status = 200;
    ctx.body = user;
    return;
  }

  ctx.status = 404;
});

export { router as userRouter };

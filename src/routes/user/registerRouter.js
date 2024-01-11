import Router from "koa-router";

const router = new Router();

router.post("/users/register", async (ctx) => {
  const { email, names, surnames, password } = ctx.request.body;
  const user = {
    email,
    names,
    surnames,
    password,
  };

  await ctx.orm.User.create(user);

  ctx.status = 201;
});

export { router as registerRouter };

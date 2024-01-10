import Router from "koa-router";

const createUserRouter = new Router();
const router = new Router();

createUserRouter.post("/", async (ctx) => {
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

router.put("/", async (ctx) => {
  const { email } = ctx.userInfo;
  const { username, surnames } = ctx.request.body;

  const updateInfoUser = {
    email,
    username,
    surnames,
  };

  const user = ctx.orm.User.build(updateInfoUser);
  await user.save();
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

export { createUserRouter, router as userRouter };

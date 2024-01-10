import Router from "koa-router";
import { ValidationError } from "sequelize";

const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ValidationError) {
      ctx.status = 400;
      ctx.body = {
        error: err,
      };
      return;
    }
    ctx.response.status = 500;
    console.error(err.message);
  }
};

const router = new Router();

router.use(errorHandler);

export { router as errorRouter };

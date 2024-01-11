import Router from "koa-router";
import jwt from "jsonwebtoken";
import config from "../../config/jwt.js";

const { jwt_secret, jwt_algorithm } = config;

const isAuthenticated = async (ctx, next) => {
  const { token } = ctx.request;
  if (!token) {
    ctx.status = 401;
    return;
  }

  const userInfo = jwt.verify(token, jwt_secret, {
    algorithm: jwt_algorithm,
  });
  if (userInfo) {
    ctx.state.userInfo = userInfo;
    await next();
  } else {
    ctx.status = 401;
  }
};

const router = new Router();

router.use(isAuthenticated);

export { router as authenticationRouter };

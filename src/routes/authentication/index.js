import Router from "koa-router";
import jwt from "jsonwebtoken";
import config from "../../config/jwt.js";

const { jwt_secret, jwt_algorithm } = config;

const getUserInfo = async (email, password, orm) => {
  const user = await orm.User.findOne({
    attributes: ["email", "names", "surnames"],
    where: {
      email,
      password,
    },
  });
  const userInfo = user.dataValues;
  return userInfo;
};

const obtainToken = async (ctx) => {
  const { email, password } = ctx.request.body;
  const userInfo = await getUserInfo(email, password, ctx.orm);
  const token = jwt.sign(userInfo, jwt_secret, { algorithm: jwt_algorithm });
  ctx.status = 200;
  ctx.body = {
    token,
  };
};

const refreshToken = async (ctx) => {
  const { email, password } = ctx.request.body;
  ctx.status = 200;
};

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
    ctx.userInfo = userInfo;
    await next();
  } else {
    ctx.status = 401;
  }
};

const router = new Router();

router.post("/", obtainToken);
router.post("/refresh", refreshToken);
router.use(isAuthenticated);

export { router as authenticationRouter };

import Router from "koa-router";
import { errorRouter } from "./errors/router.js";
import { tokenRouter } from "./authentication/tokenRouter.js";
import { authenticationRouter } from "./authentication/authenticationRouter.js";
import { registerRouter } from "./user/registerRouter.js";
import { userRouter } from "./user/router.js";

const router = new Router({
  prefix: "/api/v1",
});

router.use(errorRouter.routes());
router.use(registerRouter.routes());
router.use(tokenRouter.routes());
router.use(authenticationRouter.routes());
router.use(userRouter.routes());

export { router as apiRouter };

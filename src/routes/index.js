import Router from "koa-router";
import { errorRouter } from "./errors/index.js";
import { authenticationRouter } from "./authentication/index.js";
import { createUserRouter, userRouter } from "./user/index.js";

const router = new Router();

router.use("/api", errorRouter.routes());
router.use("/api/users", createUserRouter.routes());
router.use("/api/tokens", authenticationRouter.routes());
router.use("/api/users", userRouter.routes());

export { router as apiRouter };

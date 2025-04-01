import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();
router.post(
  "/",
  // commonMiddleware.validateBody(UserValidator.create),
  userController.register,
);
export const userRouter = router;

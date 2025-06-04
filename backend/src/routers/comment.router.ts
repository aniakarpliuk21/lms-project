import { Router } from "express";

import { commentController } from "../controllers/comment.controller";
import { authMiddleware } from "../middlewares/auth.moddleware";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();
router.post(
  "/createComment",
  authMiddleware.checkAccessToken,
  commentController.createComment,
);
router.get(
  "/:studentId",
  commonMiddleware.isValid("studentId"),
  authMiddleware.checkAccessToken,
  commentController.getAllCommentsByStudentId,
);

export const commentRouter = router;

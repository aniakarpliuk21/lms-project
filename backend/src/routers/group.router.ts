import { Router } from "express";

import { groupController } from "../controllers/group.controller";
import { authMiddleware } from "../middlewares/auth.moddleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { GroupValidator } from "../validators/group.validator";

const router = Router();
router.post(
  "/createGroup",
  commonMiddleware.validateBody(GroupValidator.createGroup),
  authMiddleware.checkAccessToken,
  groupController.createGroup,
);
router.get("/", authMiddleware.checkAccessToken, groupController.getAllGroup);
// router.put(
//   "/:groupId",
//   commonMiddleware.isValid("groupId"),
//   authMiddleware.checkAccessToken,
//   groupController.updateGroupById,
// );

export const groupRouter = router;

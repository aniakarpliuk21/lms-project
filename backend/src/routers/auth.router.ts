import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { authMiddleware } from "../middlewares/auth.moddleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { AuthValidator } from "../validators/auth.validators";
import { ManagerValidator } from "../validators/manager.validator";

const router = Router();
router.post(
  "/registerAdmin",
  authMiddleware.checkAccessToken,
  commonMiddleware.isAdmin,
  commonMiddleware.validateBody(ManagerValidator.createAdmin),
  authController.registerAdmin,
);
router.post(
  "/registerManager",
  authMiddleware.checkAccessToken,
  commonMiddleware.isAdmin,
  commonMiddleware.validateBody(ManagerValidator.createManager),
  authController.registerManager,
);

router.get(
  "/getManager",
  commonMiddleware.validateQuery(ManagerValidator.getListQuery),
  authMiddleware.checkAccessToken,
  authController.getManagerList,
);
router.get(
  "/getManagerFull",
  authMiddleware.checkAccessToken,
  authController.getManagerListFull,
);
router.post("/login", authController.login);
router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);
router.post("/logout", authMiddleware.checkAccessToken, authController.logout);
router.post(
  "/logout/all",
  authMiddleware.checkAccessToken,
  authController.logoutAll,
);
router.get("/me", authMiddleware.checkAccessToken, authController.getMe);

router.post(
  "/addPassword",
  commonMiddleware.validateBody(ManagerValidator.addPassword),
  authController.addPassword,
);
router.post(
  "/password/forgot",
  commonMiddleware.validateBody(ManagerValidator.forgotPassword),
  authController.forgotPassword,
);
router.put(
  "/password/forgot",
  commonMiddleware.validateBody(ManagerValidator.forgotPasswordSet),
  authMiddleware.checkActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD),
  authController.forgotPasswordSet,
);
// router.put(
//   "/password",
//   commonMiddleware.validateBody(ManagerValidator.changePassword),
//   authMiddleware.checkAccessToken,
//   authController.changePassword,
// );
router.post(
  "/verify",
  commonMiddleware.validateBody(AuthValidator.verify),
  authMiddleware.checkActionToken(ActionTokenTypeEnum.EMAIL_VERIFICATION),
  authController.verify,
);
router.post(
  "/sendActivateEmail",
  commonMiddleware.validateBody(ManagerValidator.sendActivateEmail),
  authMiddleware.checkAccessToken,
  commonMiddleware.isAdmin,
  authController.sendActivateEmail,
);
router.post(
  "/banManager",
  authMiddleware.checkAccessToken,
  commonMiddleware.isAdmin,
  authController.banManager,
);
router.post(
  "/unbanManager",
  authMiddleware.checkAccessToken,
  commonMiddleware.isAdmin,
  authController.unbanManager,
);
// router.get(
//   "/manager/:managerId",
//   authMiddleware.checkAccessToken,
//   commonMiddleware.isValid("managerId"),
//   authController.getManagerById,
// );
export const authRouter = router;

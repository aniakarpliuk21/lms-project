import { Router } from "express";

import { studentController } from "../controllers/student.controller";
import { authMiddleware } from "../middlewares/auth.moddleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { StudentValidator } from "../validators/student.validator";

const router = Router();
// router.post(
//   "/",
//   authMiddleware.checkAccessToken,
//   commonMiddleware.validateBody(StudentValidator.createStudent),
//   studentController.createStudent,
// );
router.get(
  "/statistics",
  authMiddleware.checkAccessToken,
  studentController.getStudentStatistics,
);
router.get(
  "/",
  commonMiddleware.validateQuery(StudentValidator.getListQuery),
  authMiddleware.checkAccessToken,
  studentController.getStudentList,
);
router.get(
  "/all",
  authMiddleware.checkAccessToken,
  studentController.getAllStudentsWithoutPagination,
);
router.put(
  "/:studentId",
  commonMiddleware.isValid("studentId"),
  commonMiddleware.validateBody(StudentValidator.updateStudent),
  authMiddleware.checkAccessToken,
  studentController.updateStudent,
);
// router.delete(
//   "/:studentId",
//   commonMiddleware.isValid("studentId"),
//   studentController.deleteStudent,
// );
export const studentRouter = router;

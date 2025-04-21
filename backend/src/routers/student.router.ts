import { Router } from "express";

import { studentController } from "../controllers/student.controller";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();
router.get("/", studentController.getStudentList);
router.get(
  "/:studentId",
  commonMiddleware.isValid("studentId"),
  studentController.getStudentById,
);
router.post("/", studentController.createStudent);
router.put(
  "/:studentId",
  commonMiddleware.isValid("studentId"),
  studentController.updateStudent,
);
router.delete(
  "/:studentId",
  commonMiddleware.isValid("studentId"),
  studentController.deleteStudent,
);
export const studentRouter = router;

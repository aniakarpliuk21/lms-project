import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "../docs/swagger.json";
import { configure } from "./configs/configure";
// import { createAdmin } from "./configs/create-admin";
// import { importStudents } from "./configs/import-students";
// import studentsData from "./configs/students.json";
import { cronRunner } from "./crons";
import { ApiError } from "./errors/api-error";
import { authRouter } from "./routers/auth.router";
import { commentRouter } from "./routers/comment.router";
import { groupRouter } from "./routers/group.router";
import { studentRouter } from "./routers/student.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  }),
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/students", studentRouter);
app.use("/api/auth", authRouter);
app.use("/api/comments", commentRouter);
app.use("/api/groups", groupRouter);
app.use(
  "*",
  (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = error.status ?? 500;
    const message = error.message ?? "Something went wrong";
    res.status(status).json({ status, message });
  },
);
process.on("uncaughtException", (error: ApiError) => {
  console.error("Uncaught Exception", error);
  process.exit(1);
});

const mongoUri = configure.mongoUri;
const connection = async () => {
  let dbCon = false;
  while (!dbCon) {
    try {
      console.log("Connecting to db...");
      await mongoose.connect(mongoUri);
      dbCon = true;
      console.log("Database available!!!");
    } catch (e) {
      console.error(e);
      console.log("Database unavailable,wait 3 sec");
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
};
const start = async () => {
  try {
    await connection();
    // await createAdmin();
    // await importStudents(studentsData);
    await app.listen(configure.port, () => {
      console.log(`Server has been started on port ${configure.port}`);
    });
    await cronRunner();
  } catch (e) {
    console.error(e);
  }
};
start();

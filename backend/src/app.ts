import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { userRouter } from "./routers/user.router";

dotenv.config({ path: "../.env" });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use("/users", userRouter);
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI не задано в середовищі");
}
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
const port = process.env.PORT;
const start = async () => {
  try {
    await connection();
    await app.listen(port, () => {
      console.log(`Server has been started on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};
start();

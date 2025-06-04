import mongoose, { model, Schema } from "mongoose";

import { IStudent } from "../interfaces/student.interface";
import { Manager } from "./manager.model";

const AutoIncrement = require("mongoose-sequence")(mongoose);

const studentSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
      index: true,
    },
    name: { type: String },
    surname: { type: String },
    email: { type: String },
    phone: { type: String },
    age: { type: Number },
    course: {
      type: String,
      default: null,
    },
    course_format: {
      type: String,
      default: null,
    },
    course_type: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: null,
    },
    sum: { type: Number },
    alreadyPaid: { type: Number, default: 0 },
    _managerId: {
      type: Schema.Types.ObjectId,
      ref: Manager,
      default: null,
    },
    group: { type: String, default: null },
    utm: { type: String, default: null },
    msg: { type: String, default: null },
  },
  { timestamps: true, versionKey: false },
);
studentSchema.plugin(AutoIncrement, {
  inc_field: "id",
  id: "student_seq",
  start_seq: 1,
});
export const Student = model<IStudent>("students", studentSchema);

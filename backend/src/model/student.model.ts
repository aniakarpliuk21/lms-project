import { model, Schema } from "mongoose";

import { IStudent } from "../interfaces/student.interface";
import { Manager } from "./manager.model";

const studentSchema = new Schema(
  {
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

export const Student = model<IStudent>("students", studentSchema);

import { model, Schema } from "mongoose";

import {
  CourseEnum,
  CourseFormatEnum,
  CourseTypeEnum,
  StudentStatusEnum,
} from "../enums/student.enum";
import { IStudent } from "../interfaces/student.interface";
import { Manager } from "./manager.model";

const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    course: {
      enum: CourseEnum,
      type: String,
      default: null,
    },
    course_format: {
      enum: CourseFormatEnum,
      type: String,
      default: null,
    },
    course_type: {
      enum: CourseTypeEnum,
      type: String,
      default: null,
    },
    status: {
      enum: StudentStatusEnum,
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
  },
  { timestamps: true, versionKey: false },
);

export const Student = model<IStudent>("students", studentSchema);

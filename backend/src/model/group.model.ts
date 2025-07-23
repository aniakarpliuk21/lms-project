import { model, Schema } from "mongoose";

import { IGroup } from "../interfaces/group.interface";
import { Student } from "./student.model";

const groupSchema = new Schema(
  {
    name: { type: String, required: true },
    students: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Student,
        default: [],
      },
    ],
  },
  { timestamps: true, versionKey: false },
);
export const Group = model<IGroup>("groups", groupSchema);

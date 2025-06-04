import { model, Schema } from "mongoose";

import { IComment } from "../interfaces/comment.interface";
import { Manager } from "./manager.model";
import { Student } from "./student.model";

const commentSchema = new Schema(
  {
    commentBody: { type: String, required: true },
    managerId: { type: Schema.Types.ObjectId, required: true, ref: Manager },
    studentId: { type: Schema.Types.ObjectId, required: true, ref: Student },
  },
  { timestamps: true, versionKey: false },
);
export const Comment = model<IComment>("comments", commentSchema);

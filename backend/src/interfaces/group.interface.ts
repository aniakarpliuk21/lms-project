import { Types } from "mongoose";

export interface IGroup {
  _id: string;
  name: string;
  students: Types.ObjectId[];
  createdAt: string;
  updatedAt: string;
}

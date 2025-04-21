import { model, Schema } from "mongoose";

import { ManagerStatusEnum } from "../enums/manager-status.enum";
import { RoleEnum } from "../enums/role.enum";
import { IManager } from "../interfaces/manager.interface";

const managerSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: {
      enum: RoleEnum,
      type: String,
      default: RoleEnum.MANAGER,
    },
    status: {
      enum: ManagerStatusEnum,
      type: String,
      default: ManagerStatusEnum.ACTIVE,
    },
    phone: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    lastVisit: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Manager = model<IManager>("managers", managerSchema);

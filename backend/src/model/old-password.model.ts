import { model, Schema } from "mongoose";

import { IOldPassword } from "../interfaces/password.interface";
import { Manager } from "./manager.model";

const oldPasswordSchema = new Schema(
  {
    password: { type: String, required: true },
    _managerId: { type: Schema.Types.ObjectId, ref: Manager },
  },
  { timestamps: true, versionKey: false },
);
export const OldPassword = model<IOldPassword>(
  "oldPasswords",
  oldPasswordSchema,
);

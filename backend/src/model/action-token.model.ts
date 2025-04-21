import { model, Schema } from "mongoose";

import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { IActionToken } from "../interfaces/action-token.interface";
import { Manager } from "./manager.model";

const actionTokenSchema = new Schema(
  {
    token: { type: String, required: true },
    type: { type: String, required: true, enum: ActionTokenTypeEnum },
    _managerId: { type: Schema.Types.ObjectId, required: true, ref: Manager },
  },
  { timestamps: true, versionKey: false },
);
export const ActionToken = model<IActionToken>(
  "actionTokens",
  actionTokenSchema,
);

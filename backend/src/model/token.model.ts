import { model, Schema } from "mongoose";

import { IToken } from "../interfaces/token.interface";
import { Manager } from "./manager.model";

const tokenSchema = new Schema(
  {
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    _managerId: { type: Schema.Types.ObjectId, required: true, ref: Manager },
  },
  { timestamps: true, versionKey: false },
);
export const Token = model<IToken>("tokens", tokenSchema);

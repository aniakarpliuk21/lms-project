import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";

export interface IActionToken {
  _id: string;
  token: string;
  type: ActionTokenTypeEnum;
  _managerId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IVerifyToken {
  token: string;
}

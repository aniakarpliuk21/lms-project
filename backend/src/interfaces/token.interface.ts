import { RoleEnum } from "../enums/role.enum";

export interface IToken {
  _id: string;
  accessToken: string;
  refreshToken: string;
  _managerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITokenPayload {
  managerId: string;
  role: RoleEnum;
}

export type ITokenPair = Pick<IToken, "accessToken" | "refreshToken">;

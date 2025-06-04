import { ManagerListOrderEnum } from "../enums/manager-list-order.enum";
import { ManagerStatusEnum } from "../enums/manager-status.enum";
import { OrderEnum } from "../enums/order.enum";
import { RoleEnum } from "../enums/role.enum";

export interface IManager {
  _id: string;
  id: number;
  name: string;
  surname: string;
  email: string;
  password?: string;
  role: RoleEnum;
  status: ManagerStatusEnum;
  phone?: string;
  isDeleted: boolean;
  isVerified: boolean;
  isBanned: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastVisit: Date | null;
}

export type IManagerCreateDto = Pick<IManager, "name" | "surname" | "email">;
export type IAdminCreateDto = Pick<
  IManager,
  "name" | "surname" | "email" | "password" | "role"
>;
export type IManagerLoginDto = Pick<IManager, "email" | "password">;

export type IForgotPassword = Pick<IManager, "email">;
export type IForgotPasswordSet = Pick<IManager, "password"> & { token: string };
export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type IManagerListQuery = {
  page: number;
  limit: number;
  search?: string;
  order: OrderEnum;
  orderBy: ManagerListOrderEnum;
};

export interface IManagerListResponse extends IManagerListQuery {
  data: IManager[];
  total: number;
}

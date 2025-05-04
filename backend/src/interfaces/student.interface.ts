import { OrderEnum } from "../enums/order.enum";
import { StudentListOrderEnum } from "../enums/student-list-order.enum";

export interface IStudent {
  _id: string;
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  age?: number;
  course?: string;
  course_format?: string;
  course_type?: string;
  status?: string;
  sum?: number;
  alreadyPaid?: number;
  _managerId?: string | null;
  group?: string;
  utm?: string;
  msg?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type IStunentCreateDto = Pick<
  IStudent,
  | "name"
  | "surname"
  | "email"
  | "phone"
  | "age"
  | "course"
  | "course_format"
  | "course_type"
  | "status"
  | "sum"
  | "alreadyPaid"
>;
export type IStudentUpdateDto = Pick<
  IStudent,
  | "email"
  | "phone"
  | "age"
  | "course"
  | "course_format"
  | "course_type"
  | "status"
  | "sum"
  | "alreadyPaid"
  | "_managerId"
  | "group"
>;

export type IStudentListQuery = {
  page: number;
  limit: number;
  search?: string;
  order: OrderEnum;
  orderBy: StudentListOrderEnum;
};

export interface IStudentListResponse extends IStudentListQuery {
  data: IStudent[];
  total: number;
}

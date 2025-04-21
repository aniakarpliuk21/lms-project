import { OrderEnum } from "../enums/order.enum";
import {
  CourseEnum,
  CourseFormatEnum,
  CourseTypeEnum,
  StudentStatusEnum,
} from "../enums/student.enum";
import { StudentListOrderEnum } from "../enums/student-list-order.enum";

export interface IStudent {
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  age: number;
  course: CourseEnum;
  course_format: CourseFormatEnum;
  course_type: CourseTypeEnum;
  status: StudentStatusEnum;
  sum: number;
  alreadyPaid: number;
  _managerId?: string;
  group?: string;
  message?: string;
  utm?: string;
  isDeleted: boolean;
  isVerified: boolean;
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
  | "message"
  | "utm"
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

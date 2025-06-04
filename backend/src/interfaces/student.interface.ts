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
  id: number;
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
export type IStudentUpdateDto = Partial<IStudent>;

export type IStudentListQuery = {
  page: number;
  limit: number;
  course?: CourseEnum;
  course_type?: CourseTypeEnum;
  course_format?: CourseFormatEnum;
  status?: StudentStatusEnum;
  age?: number;
  manager?: string;
  group?: string;
  order?: OrderEnum;
  orderBy?: StudentListOrderEnum;
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  managerOnly?: string;
  currentManagerId?: string;
};

export interface IStudentListResponse extends IStudentListQuery {
  data: IStudent[];
  total: number;
}

export interface IStudentStatistics {
  total: number;
  [StudentStatusEnum.IN_WORK]: number;
  [StudentStatusEnum.NEW]: number;
  [StudentStatusEnum.AGGRE]: number;
  [StudentStatusEnum.DISAGGRE]: number;
  [StudentStatusEnum.DUBBING]: number;
}

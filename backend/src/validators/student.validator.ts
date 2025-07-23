import Joi from "joi";

import { OrderEnum } from "../enums/order.enum";
import {
  CourseEnum,
  CourseFormatEnum,
  CourseTypeEnum,
  StudentStatusEnum,
} from "../enums/student.enum";
import { StudentListOrderEnum } from "../enums/student-list-order.enum";

export class StudentValidator {
  private static name = Joi.string().trim().optional().empty("");
  private static surname = Joi.string().trim().optional().empty("");
  private static emailStrict = Joi.string().email().trim();
  private static partialText = Joi.string().trim().allow("", null).optional();
  private static phone = Joi.string().trim().optional().empty("");
  private static age = Joi.number().min(1).max(99);
  private static course = Joi.string()
    .valid(...Object.values(CourseEnum))
    .trim();
  private static course_format = Joi.string()
    .valid(...Object.values(CourseFormatEnum))
    .trim();
  private static course_type = Joi.string()
    .valid(...Object.values(CourseTypeEnum))
    .trim();
  private static status = Joi.string()
    .valid(...Object.values(StudentStatusEnum))
    .trim();
  private static sum = Joi.number();
  private static alreadyPaid = Joi.number();
  private static group = Joi.string().trim();
  // public static createStudent = Joi.object({
  //   name: this.name.required(),
  //   surname: this.surname.required(),
  //   email: this.emailStrict.required(),
  //   phone: this.phone.required(),
  //   age: this.age.required(),
  //   course: this.course.required(),
  //   course_format: this.course_format.required(),
  //   course_type: this.course_type.required(),
  //   status: this.status.required(),
  // });

  public static updateStudent = Joi.object({
    name: this.name.optional().empty(""),
    surname: this.surname.optional().empty(""),
    email: this.emailStrict.optional().empty(""),
    phone: this.phone.optional().empty(""),
    age: this.age.optional().empty(""),
    status: this.status.optional().empty(""),
    group: this.group.optional().empty(""),
    sum: this.sum.optional().empty(""),
    alreadyPaid: this.alreadyPaid.optional().empty(""),
    course: this.course.optional().empty(""),
    course_format: this.course_format.optional().empty(""),
    course_type: this.course_type.optional().empty(""),
  });
  public static getListQuery = Joi.object({
    limit: Joi.number().min(1).max(100).default(10),
    page: Joi.number().min(1).default(1),
    course: Joi.string()
      .valid(...Object.values(CourseEnum))
      .optional(),
    course_type: Joi.string()
      .valid(...Object.values(CourseTypeEnum))
      .optional(),
    course_format: Joi.string()
      .valid(...Object.values(CourseFormatEnum))
      .optional(),
    status: Joi.string()
      .valid(...Object.values(StudentStatusEnum))
      .optional(),
    manager: Joi.string().optional(),
    group: Joi.string().optional(),
    age: Joi.number().optional(),
    name: this.partialText,
    surname: this.partialText,
    email: this.partialText,
    phone: this.partialText,
    currentManagerId: Joi.string().hex().length(24).optional(),
    order: Joi.string()
      .valid(...Object.values(OrderEnum))
      .default(OrderEnum.DESC),
    orderBy: Joi.string()
      .valid(...Object.values(StudentListOrderEnum))
      .default(StudentListOrderEnum.ID),
    startDate: Joi.date().iso().optional(),
    endDate: Joi.date().iso().optional(),
  });
}

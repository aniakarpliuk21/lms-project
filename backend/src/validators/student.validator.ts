import Joi from "joi";

import { regexConstant } from "../constans/regex.constans";
import { OrderEnum } from "../enums/order.enum";
import {
  CourseEnum,
  CourseFormatEnum,
  CourseTypeEnum,
  StudentStatusEnum,
} from "../enums/student.enum";
import { StudentListOrderEnum } from "../enums/student-list-order.enum";

export class StudentValidator {
  private static name = Joi.string().regex(regexConstant.NAME);
  private static surname = Joi.string().regex(regexConstant.SURNAME);
  private static email = Joi.string().regex(regexConstant.EMAIL).email().trim();
  private static phone = Joi.string().regex(regexConstant.PHONE).trim();
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

  public static createStudent = Joi.object({
    name: this.name.required().messages({
      "string.base": "Name must be a string",
      "string.empty": "Name cannot be empty",
      "any.required": "Name is a required field",
    }),
    surname: this.surname.required().messages({
      "string.base": "Surname must be a string",
      "string.empty": "Surname cannot be empty",
      "any.required": "Surname is a required field",
    }),
    email: this.email.required().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be a valid email address",
      "string.pattern.base": "Email does not match the required pattern",
      "string.required": "Email is a required field",
    }),
    phone: this.phone.required().messages({
      "string.base": "Phone must be a string",
      "string.empty": "Phone cannot be empty",
      "string.pattern.base": "Phone does not match the required pattern",
      "string.required": "Phone is a required field",
    }),
    age: this.age.required().messages({
      "number.base": "Age must be a number",
      "number.min": "Age must be at least 1",
      "number.max": "Age cannot exceed 99",
      "any.required": "Age is a required field",
    }),
    course: Joi.string().required(),
    course_format: Joi.string().required(),
    course_type: Joi.string().required(),
    status: Joi.string().required(),
  });
  public static updateStudent = Joi.object({
    name: this.name.optional().empty("").messages({
      "string.base": "Name must be a string",
    }),
    surname: this.surname.optional().empty("").messages({
      "string.base": "Surname must be a string",
    }),
    email: this.email.optional().empty("").messages({
      "string.base": "Email must be a string",
      "string.email": "Email must be a valid email address",
      "string.pattern.base": "Email does not match the required pattern",
    }),
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
    course: Joi.string(),
    course_type: Joi.string(),
    course_format: Joi.string(),
    status: Joi.string(),
    manager: Joi.string(),
    group: Joi.string(),
    age: Joi.number(),
    order: Joi.string()
      .valid(...Object.values(OrderEnum))
      .default(OrderEnum.DESC),
    orderBy: Joi.string()
      .valid(...Object.values(StudentListOrderEnum))
      .default(StudentListOrderEnum.ID),
  });
}

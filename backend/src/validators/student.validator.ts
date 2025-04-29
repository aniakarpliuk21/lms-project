import Joi from "joi";

import { regexConstant } from "../constans/regex.constans";
import { OrderEnum } from "../enums/order.enum";
import { StudentListOrderEnum } from "../enums/student-list-order.enum";

export class StudentValidator {
  private static name = Joi.string().regex(regexConstant.NAME);
  private static surname = Joi.string().regex(regexConstant.SURNAME);
  private static email = Joi.string().regex(regexConstant.EMAIL).email().trim();
  private static phone = Joi.string().regex(regexConstant.PHONE).trim();
  private static age = Joi.number().min(1).max(99);

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
  public static getListQuery = Joi.object({
    limit: Joi.number().min(1).max(100).default(10),
    page: Joi.number().min(1).default(1),
    search: Joi.string().trim(),
    order: Joi.string()
      .valid(...Object.values(OrderEnum))
      .default(OrderEnum.ASC),
    orderBy: Joi.string()
      .valid(...Object.values(StudentListOrderEnum), "id")
      .default(StudentListOrderEnum.NAME),
  });
}

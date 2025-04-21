import Joi from "joi";

import { regexConstant } from "../constans/regex.constans";
import { ManagerListOrderEnum } from "../enums/manager-list-order.enum";
import { OrderEnum } from "../enums/order.enum";

export class StudentValidator {
  private static email = Joi.string().regex(regexConstant.EMAIL).email().trim();
  private static phone = Joi.string().regex(regexConstant.PHONE).trim();
  private static age = Joi.number().min(1).max(99);

  public static create = Joi.object({
    email: this.email.required().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be a valid email address",
      "string.pattern.base": "Email does not match the required pattern",
      "string.required": "Email is a required field",
    }),
    phone: this.phone.optional().messages({
      "string.base": "Phone must be a string",
      "string.empty": "Phone cannot be empty",
      "string.pattern.base": "Phone does not match the required pattern",
    }),
    age: this.age.required().messages({
      "number.base": "Age must be a number",
      "number.min": "Age must be at least 1",
      "number.max": "Age cannot exceed 99",
      "any.required": "Age is a required field",
    }),
  });
  public static getListQuery = Joi.object({
    limit: Joi.number().min(1).max(100).default(10),
    page: Joi.number().min(1).default(1),
    search: Joi.string().trim(),
    order: Joi.string()
      .valid(...Object.values(OrderEnum))
      .default(OrderEnum.ASC),
    orderBy: Joi.string()
      .valid(...Object.values(ManagerListOrderEnum))
      .default(ManagerListOrderEnum.CREATED_AT),
  });
}

import Joi from "joi";

import { regexConstant } from "../constans/regex.constans";
import { ManagerListOrderEnum } from "../enums/manager-list-order.enum";
import { OrderEnum } from "../enums/order.enum";

export class ManagerValidator {
  private static name = Joi.string().regex(regexConstant.NAME).trim();
  private static surname = Joi.string().regex(regexConstant.SURNAME).trim();
  private static email = Joi.string().regex(regexConstant.EMAIL).email().trim();
  private static password = Joi.string().regex(regexConstant.PASSWORD).trim();
  private static phone = Joi.string().regex(regexConstant.PHONE).trim();
  private static managerId = Joi.string();

  public static createAdmin = Joi.object({
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
    password: this.password.required().messages({
      "string.base": "Password must be a string",
      "string.empty": "Password cannot be empty",
      "string.pattern.base": "Password does not match the required pattern",
      "string.required": "Password is a required field",
    }),
    phone: this.phone.optional().messages({
      "string.base": "Phone must be a string",
      "string.empty": "Phone cannot be empty",
      "string.pattern.base": "Phone does not match the required pattern",
    }),
  });
  public static createManager = Joi.object({
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
  });
  public static forgotPassword = Joi.object({
    email: this.email.required().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be a valid email address",
      "string.pattern.base": "Email does not match the required pattern",
      "string.required": "Email is a required field",
    }),
  });
  public static forgotPasswordSet = Joi.object({
    password: this.password.required().messages({
      "string.base": "Password must be a string",
      "string.empty": "Password cannot be empty",
      "string.pattern.base": "Password does not match the required pattern",
      "string.required": "Password is a required field",
    }),
    token: Joi.string(),
  });
  // public static changePassword = Joi.object({
  //   newPassword: this.password.required(),
  //   oldPassword: this.password.required(),
  // });
  public static addPassword = Joi.object({
    password: this.password.required().messages({
      "string.base": "Password must be a string",
      "string.empty": "Password cannot be empty",
      "string.pattern.base": "Password does not match the required pattern",
      "string.required": "Password is a required field",
    }),
    managerId: this.managerId.required(),
  });
  public static sendActivateEmail = Joi.object({
    email: this.email.required().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be a valid email address",
      "string.pattern.base": "Email does not match the required pattern",
      "string.required": "Email is a required field",
    }),
  });
  public static getListQuery = Joi.object({
    limit: Joi.number().min(1).max(100).default(10),
    page: Joi.number().min(1).default(1),
    search: Joi.string().trim(),
    order: Joi.string()
      .valid(...Object.values(OrderEnum))
      .default(OrderEnum.DESC),
    orderBy: Joi.string()
      .valid(
        ...Object.values(ManagerListOrderEnum),
        ManagerListOrderEnum.CREATED_AT,
      )
      .default(ManagerListOrderEnum.CREATED_AT),
  });
}

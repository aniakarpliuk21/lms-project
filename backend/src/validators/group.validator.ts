import Joi from "joi";

export class GroupValidator {
  public static createGroup = Joi.object({
    name: Joi.string().trim().min(2).max(50).required(),
    students: Joi.array().items(Joi.string()).max(20).optional(),
  });
}

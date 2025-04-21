import Joi from "joi";

export class AuthValidator {
  private static token = Joi.string().trim();

  public static verify = Joi.object({
    token: this.token.required(),
  });
}

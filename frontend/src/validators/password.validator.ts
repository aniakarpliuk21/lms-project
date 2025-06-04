import Joi from "joi";
const password = Joi.string()
    .min(5)
    .pattern(/^.{5,}$/)
    .messages({
        "string.base": "Password must be a string",
        "string.empty": "Password cannot be empty",
        "string.pattern.base": "Password does not match the required pattern",
        "string.required": "Password is a required field",
    });
const confirmPassword = Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
        "any.only": "Passwords must match",
        "string.empty": "Confirm password cannot be empty",
        "any.required": "Confirm password is a required field",
    });
export const passwordValidator = {
    create: Joi.object({
        password,
        confirmPassword,
    }),
    forgotPassword: Joi.object({
        password,
    })

}
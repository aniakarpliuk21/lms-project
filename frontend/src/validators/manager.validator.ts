import Joi from "joi";
const name = Joi.string()
    .pattern(/^[a-zA-Zа-яіїєґА-ЯІЇЄҐ]{2,20}$/)
    .messages({
        "string.base": "Name must be a string",
        "string.empty": "Name cannot be empty",
        "any.required": "Name is a required field",
    });
const surname = Joi.string()
    .pattern(/^[a-zA-Zа-яіїєґА-ЯІЇЄҐ]{2,20}$/)
    .messages({
        "string.base": "Surname must be a string",
        "string.empty": "Surname cannot be empty",
        "any.required": "Surname is a required field",
    });
const email = Joi.string()
    .pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
        .messages({
            "string.base": "Email must be a string",
            "string.empty": "Email cannot be empty",
            "string.email": "Email must be a valid email address",
            "string.pattern.base": "Email does not match the required pattern",
            "string.required": "Email is a required field",
        });
export const managerValidator = {
    createManager: Joi.object({
        name: name.required(),
        surname: surname.required(),
        email:email.required(),
    }),

}
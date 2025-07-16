import Joi from "joi";

export const studentValidator = {
    updateStudent: Joi.object({
        name: Joi.string().allow("").optional(),
        surname: Joi.string().allow("").optional(),
        email: Joi.string().email({ tlds: { allow: false } }).allow("").optional(),
        phone: Joi.string().allow("").optional(),
        course: Joi.string().allow("").optional(),
        course_format: Joi.string().allow("").optional(),
        course_type: Joi.string().allow("").optional(),
        group: Joi.string().allow("").optional(),
        age: Joi.number().optional(),
        sum: Joi.number().optional(),
        alreadyPaid: Joi.number().optional(),
        status: Joi.string().allow("").optional(),
    }),
};
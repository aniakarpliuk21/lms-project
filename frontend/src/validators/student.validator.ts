import Joi from "joi";

export const studentValidator = {
    updateStudent: Joi.object({
        name: Joi.string().pattern(/^[a-zA-Zа-яіїєґА-ЯІЇЄҐ]{2,20}$/).optional(),
        surname: Joi.string().pattern(/^[a-zA-Zа-яіїєґА-ЯІЇЄҐ]{2,20}$/).optional(),
        email: Joi.string().pattern(/^\+?[1-9]\d{1,14}([\s\-\(\)]?\d{1,4}){1,5}$/).optional(),
        phone: Joi.string().optional(),
        group: Joi.string().optional(),
        age: Joi.number().min(1).max(99).optional(),
        course: Joi.string().optional(),
        course_format: Joi.string().optional(),
        course_type: Joi.string().optional(),
        status: Joi.string().optional(),
        sum: Joi.number().positive().optional(),
        alreadyPaid: Joi.number().positive().optional(),
    })
}
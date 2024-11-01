import Joi from 'joi';

export const upsertContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Name must be a string',
        'string.min': 'Minimum length of name is 3',
        'string.max': 'Maximum length is 20',
        'any.required': 'Name is required',
    }).required(),
    phoneNumber: Joi.string().regex(/^[0-9]{10}$/).required().messages({
        'string.base': 'Phone number must be a string',
        'string.pattern.base': `Phone number must have 10 digits.`,
        'any.required': 'Phone is required',
    }),
    email: Joi.string().email().messages({
        'string.email': 'Email address is not valid',
    }).default(null),
    isFavourite: Joi.boolean().default(false),
    contactType: Joi.valid('work', 'home', 'personal').default('personal')
})

export const patchContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        'string.base': 'Name must be a string',
        'string.min': 'Minimum length of name is 3',
        'string.max': 'Maximum length is 20'
    }),
    phoneNumber: Joi.string().regex(/^[0-9]{10}$/).messages({
        'string.base': 'Phone number must be a string',
        'string.pattern.base': `Phone number must have 10 digits.`
    }),
    email: Joi.string().email().messages({
        'string.email': 'Email address is not valid',
    }),
    isFavourite: Joi.boolean().messages({
        'boolean.base': 'Favourite must be a boolean',
    }),
    contactType: Joi.valid('work', 'home', 'personal').messages({
        'any.only': 'Contact type is not valid'
    })
})

export const filterSchemas = {
    favoriteFilterSchema:Joi.boolean().default(() => undefined),
    contactTypeFilterSchema:Joi.valid('work', 'home', 'personal').default(() => undefined)
}

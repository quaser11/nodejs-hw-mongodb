import Joi from 'joi';

export const registerSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'Name should be a string',
        'any.required': 'The name is required',
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a string',
        'string.email': 'Email is not valid',
        'any.required': 'The email is required',
    }),
    password: Joi.string().min(3).max(25).required().messages({
        'string.base': 'Password should be a string',
        'string.min': 'Password should be least 3 characters',
        'string.max': 'Password should be less than 25 characters',
        'any.required': 'Password is required',
    }),
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a string',
        'string.email': 'Email is not valid',
        'any.required': 'The email is required',
    }),
    password: Joi.string().min(3).max(25).required().messages({
        'string.base': 'Password should be a string',
        'string.min': 'Password should be least 3 characters',
        'string.max': 'Password should be less than 25 characters',
        'any.required': 'Password is required',
    }),
})
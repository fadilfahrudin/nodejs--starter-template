const Joi = require('joi');

const createUserSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'Name must be a string',
        'any.required': 'Name is required'
    }),
    username: Joi.string().alphanum().min(6).max(30).required().messages({
        'string.base': 'Username must be a string',
        'string.min': 'Username must be at least {#limit} characters long',
        'string.max': 'Username must be at most {#limit} characters long',
        'any.required': 'Username is required'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$')).required().messages({
        'string.base': 'Password must be a string',
        'string.pattern.base': 'Password must contain at least one uppercase letter and one number, and be at least 8 characters long',
    }),
    confirm_password: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': 'Confirm password must match the password.',
        'any.required': 'Confirm password is required.',
    }),
    role: Joi.string().valid('superadmin', 'admin', 'user').required().messages({
        'string.base': 'Role must be a string',
        'any.only': 'Role must be one of [admin, or user]',
        'any.required': 'Role is required'
    })
})

const updateUserSchema = Joi.object({
    status: Joi.string().valid('active', 'inactive').messages({
        'string.base': 'Status must be a string',
        'any.only': 'Status must be one of [active, or inactive]'
    }),
    role: Joi.string().valid('superadmin', 'admin', 'user').messages({
        'string.base': 'Role must be a string',
        'any.only': 'Role must be one of [admin, or user]'
    }),
    refreshToken: Joi.string().messages({
        'string.base': 'Refresh token must be a string'
    })
})

const usersParams = Joi.object({
    id: Joi.number().integer().messages({
        'number.base': 'Id must be a number',
        'number.integer': 'Id must be an integer',
        'any.required': 'Id is required'
    }),
    limit: Joi.number().integer().min(1).max(100).messages({
        'number.base': 'Limit must be a number',
        'number.integer': 'Limit must be an integer',
        'number.min': 'Limit must be at least {#limit}',
        'number.max': 'Limit must be at most {#limit}'
    }),
    offset: Joi.number().integer().min(0).messages({
        'number.base': 'Offset must be a number',
        'number.integer': 'Offset must be an integer',
        'number.min': 'Offset must be at least {#limit}'
    }),
    keywords: Joi.string().messages({
        'string.base': 'Keywords must be a string'
    })
})

const userProfilSchema = Joi.object({
    profilePicture: Joi.string().optional().messages({
        'string.base': 'Profile picture must be a string'
    }),
})

const loginSchema = Joi.object({
    usernameOrEmail: Joi.string().required().messages({
        'string.base': 'Username must be a string',
        'any.required': 'Username is required'
    }),
    password: Joi.string().required().messages({
        'string.base': 'Password must be a string'
    }),
})

module.exports = {
    createUserSchema,
    updateUserSchema,
    usersParams,
    loginSchema,
    userProfilSchema
}
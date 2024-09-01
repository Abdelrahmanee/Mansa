import Joi from "joi";

export const addLectureSchema = Joi.object({
    body: {
        title: Joi.string()
            .min(3)
            .max(255)
            .required()
            .messages({
                'string.base': `"Title" should be a type of 'text'`,
                'string.empty': `"Title" cannot be an empty field`,
                'string.min': `"Title" should have a minimum length of {#limit}`,
                'string.max': `"Title" should have a maximum length of {#limit}`,
                'any.required': `"Title" is a required field`
            }),
        description: Joi.string()
            .min(5)
            .max(1024)
            .required()
            .messages({
                'string.base': `"Description" should be a type of 'text'`,
                'string.empty': `"Description" cannot be an empty field`,
                'string.min': `"Description" should have a minimum length of {#limit}`,
                'string.max': `"Description" should have a maximum length of {#limit}`,
                'any.required': `"Description" is a required field`
            }),
        // LectureVideo: Joi.string()
        //     .regex(/^[0-9a-fA-F]{24}$/) 
        //     .optional()
        //     .messages({
        //         'string.pattern.base': `"Lecture Video" must be a valid ObjectId`,
        //     }),
        // LecturePdf: Joi.string()
        //     .regex(/^[0-9a-fA-F]{24}$/)
        //     .optional()
        //     .messages({
        //         'string.pattern.base': `"Lecture Pdf" must be a valid ObjectId`,
        //     })
    },
    params: {},
    query: {},
    file: Joi.object().required().messages({
        'object.required': '"Logo" is required'
    })
})


export const generateAccessCode = Joi.object({
    body: {
        lectureId: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
                'string.pattern.base': `"Lecture ID" must be a valid ObjectId`,
            })
    },
    params: {},
    query: {}
})



export const lectureAccessRequest = Joi.object({
    body: {
        lectureId: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
                'string.pattern.base': `"Lecture ID" must be a valid ObjectId`,
            }),
        code: Joi.string()
            .regex(/^[0-9a-fA-F]{12}$/)
            .required()
            .messages({
                'string.pattern.base': `"code" must be a valid ObjectId`,
            }),
    },
    params: {},
    query: {}
})


export const getLectureByIdSchema = Joi.object({
    body: {
        lectureId: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
                'string.pattern.base': `"Lecture ID" must be a valid ObjectId`,
            })
    },
    params: {},
    query: {}
})
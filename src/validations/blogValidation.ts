import Joi from 'joi'

const blogValidation = Joi.object({
    image: Joi.string().required().messages({
        "string.empty": "Blog image can't be empty!"
    }),
    title: Joi.string().required().messages({
        "string.empty": "Blog title field can't be empty!"
    }),
    content: Joi.string().required().messages({
        "string.empty": "Blog content field can't be empty!"
    })
})

const validateBlog = <T>(data:T ) => {
    return blogValidation.validate(data);
}

export default validateBlog;
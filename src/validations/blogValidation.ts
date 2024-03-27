import Joi from 'joi';

const blogValidation = Joi.object({
    image: Joi.any().required().messages({
        "any.required": "Blog image is required!",
        "binary.base": "Invalid image format"
    }),
    title: Joi.string().required().messages({
        "string.empty": "Blog title field can't be empty!"
    }),
    content: Joi.string().required().messages({
        "string.empty": "Blog content field can't be empty!"
    })
})

const validateBlog = (data: any) => {
    return blogValidation.validate(data);
};

export default validateBlog;

import Joi from 'joi';

const blogValidation = Joi.object({
    image: Joi.any().required().messages({
        "any.required": "Blog image is required!",
        "binary.base": "Invalid image format" // Message for invalid image format
    }),
    title: Joi.string().required().messages({
        "string.empty": "Blog title field can't be empty!"
    }),
    content: Joi.string().required().messages({
        "string.empty": "Blog content field can't be empty!"
    })
}).options({ allowUnknown: true }); // Allow additional fields in the request

const validateBlog = (data: any) => {
    return blogValidation.validate(data, { allowUnknown: true });
};

export default validateBlog;

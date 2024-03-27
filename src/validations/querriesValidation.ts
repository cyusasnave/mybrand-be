import Joi from 'joi';

const querriesValidation = Joi.object({
    name: Joi.string().required().min(2).regex(/^[A-Za-z\s]+$/).messages({
        "string.empty": "Name field can't be empty!",
        "string.pattern.base": "Name can't include numbers and special characters!",
        "string.min": "Name length must be at least 2 characters long!"
    }),
    email: Joi.string().required().email().messages({
        "string.empty": "Email field can't be empty!",
        "string.email": "Invalid email!"
    }),
    message: Joi.string().required().min(2).messages({
        "string.empty": "message field can't be empty!",
        "string.min": "Message length must be at least 2 character long!"
    })
})

const validateQuerry = <T>(data: T) => {
    return querriesValidation.validate(data);
}

export default validateQuerry;
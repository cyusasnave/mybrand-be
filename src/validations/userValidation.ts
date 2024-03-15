import Joi from 'joi';

const userValidation = Joi.object({
    name: Joi.string().required().min(2).regex(/^[A-Za-z\s]+$/).messages({
        "string.empty": "Name field can't be empty!",
        "string.min": "Name must be a least 2 character long!",
        "string.pattern.base": "Name can't include numbers and special characters!"
    }),
    email: Joi.string().required().email().messages({
        "string.empty": "Email field can't be empty!",
        "string.email": "Invalid email"
    }),
    password: Joi.string().required().regex(/^(?=(.*[A-Z]){1,})(?=(.*[a-z]){1,})(?=(.*[0-9]){1,}).{5,}$/).messages({
        "string.empty": "Password can't be empty!",
        "string.pattern.base": "Password must at least have one capital letter, a special character and a number!"
    }),
    ConfirmPassword: Joi.string().required().equal(Joi.ref('password')).messages({
        "any.only": "Password don't match!"
    })
})

const validateUser = <T> (data: T) => {
    return userValidation.validate(data)
}
export default validateUser;
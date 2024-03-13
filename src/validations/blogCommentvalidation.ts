import Joi from 'joi';

const commentValidation = Joi.object({
    comment: Joi.string().required().messages({
        "string.empty": "Comment field can't be empty!"
    })
})

const validComment = <T>(data: T) => {
    return commentValidation.validate(data);
}

export default validComment;
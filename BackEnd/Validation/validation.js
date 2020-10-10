const Joi = require("joi");

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

const transactionValidation = (data) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        title: Joi.string().min(3).required(),
        type: Joi.string().required(),
        amount: Joi.number().required()
    })

    return schema.validate(data);
}

module.exports = { registerValidation, loginValidation, transactionValidation }
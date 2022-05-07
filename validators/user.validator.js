const Joi = require("@hapi/joi");

class UserValidator {
    static userContract = (req, res, next) => {
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        }).unknown(true);

        const { error } = schema.validate(req.body);

        if (error) {
            res.status(400).json(error).end();
            return;
        }

        next();
    };
}

module.exports = { UserValidator };

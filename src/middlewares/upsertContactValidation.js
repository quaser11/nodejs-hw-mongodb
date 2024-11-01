import {upsertContactSchema} from "../schemas/validationSchemas.js";

export const upsertContactValidation = (req, res, next) => {
    const {error, value} = upsertContactSchema.validate(req.body, {
        abortEarly: false
    });

    if(error){
        return res.status(400).send({
            status: 400,
            message: error.details.map(detail => detail.message).join(', ')
        })
    }

    req.body = value

    next()
}
export const validateBody = (schema) => (req, res, next) => {
    const {error, value} = schema.validate(req.body, {
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
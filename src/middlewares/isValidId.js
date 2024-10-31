import {isValidObjectId} from "mongoose";

export const isValidId = (req, res, next) => {
    const {id} = req.params;

    if (!isValidObjectId(id)) {
        return res.status(404).json({
            status: 404,
            message: 'Contact not found'
        })
    }

    next()
}
import {authenticateUser} from "../services/auth.js";
import createHttpError from "http-errors";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";

export const authenticate =  ctrlWrapper(async (req, res, next) => {

    if(!req.headers.authorization) throw createHttpError(400, 'Bad Request');

    const [Bearer, token] = req.headers.authorization.split(' ')

    if(!Bearer || Bearer !== 'Bearer') throw createHttpError(400, 'Bad Request');

    if(typeof token !== 'string') throw createHttpError(400, 'Token must be a string');

    req.user = await authenticateUser(token)

    next()
})
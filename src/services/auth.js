import {Users} from "../models/users.js";
import {Session} from "../models/sessions.js";
import bcrypt from 'bcrypt'
import createHttpError from "http-errors";
import {createSession} from "../utils/createSession.js";

export const createUser = async (payload) => {

    const encryptedPassword = await bcrypt.hash(payload.password, 10)

    const isUserExist = await Users.findOne({email: payload.email})

    if (isUserExist) throw createHttpError(409, 'Email in use');

    return Users.create({
        ...payload,
        password: encryptedPassword,
    })
}

export const loginUser = async (paylaod) => {

    const user = await Users.findOne({email: paylaod.email})

    if (!user) throw createHttpError(401, 'User not found');

    const isEqual = await bcrypt.compare(paylaod.password, user.password)

    if (!isEqual) throw createHttpError(401, 'Password incorrect');

    await Session.deleteOne({userId: user._id})

    const session = createSession()

    return await Session.create({
        userId: user._id,
        ...session
    })
}

export const refreshUser = async (payload) => {
    const session = await Session.findOne({_id: payload.sessionId})

    if (!session) throw createHttpError(404, 'Session not found');

    if(new Date() > session.refreshTokenValidUntil){
        throw new createHttpError(401, 'Session expired');
    }

    await Session.deleteOne({_id: payload.sessionId})

    const newSession = createSession()

    return await Session.create({
        userId: session.userId,
        ...newSession
    })
}

export const logoutUser = async (sessionId) => {
    console.log(sessionId)
    return Session.deleteOne({_id: sessionId})
}

export const authenticateUser = async (accessToken) => {
    const session = await Session.findOne({accessToken})

    if(!session) throw createHttpError(401, 'Access token expired');

    if(new Date() > session.accessTokenValidUntil) throw createHttpError(401, 'Access token expired');

    return Users.findOne({_id: session.userId})
}
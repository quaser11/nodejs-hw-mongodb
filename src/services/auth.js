import {Users} from "../models/users.js";
import {Session} from "../models/sessions.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import createHttpError from "http-errors";
import {createSession} from "../utils/createSession.js";
import {env} from '../utils/env.js'
import {sendEmail} from "../utils/emailSender.js";
import * as fs from "node:fs";
import Handlebars from "handlebars";

const TEMPLATE = fs.readFileSync('src/templates/email.hbs', {encoding: 'utf-8'})

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

    if (new Date() > session.refreshTokenValidUntil) {
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

    if (!session) throw createHttpError(401, 'Access token expired');

    if (new Date() > session.accessTokenValidUntil) throw createHttpError(401, 'Access token expired');

    return Users.findOne({_id: session.userId})
}

export const sendResetToken = async (payload) => {

    const user = await Users.findOne({_id: payload._id, email: payload.email})

    if (!user) throw createHttpError(401, 'User not found!');

    const resetToken = jwt.sign(
        {
            sub: user._id,
            email: user.email
        },
        env('JWT_SECRET'),
        {
            expiresIn: '5m'
        }
    )

    const html = Handlebars.compile(TEMPLATE)

    try {
        await sendEmail({
            from: env('SMTP_FROM'),
            to: user.email,
            subject: 'Reset password',
            html: html({link: `${env('HOST')}/reset-password?token=${resetToken}`})
        })
    } catch (err) {
        throw new createHttpError(500, "Failed to send the email, please try again later.");
    }
}

export const resetPwd = async (payload) => {
    let data = null

    try {
        data = jwt.verify(payload.token, env('JWT_SECRET'));
    } catch (err) {
        if(err === 'JsonWebTokenError') throw createHttpError(401, 'Invalid token')
        if(err === 'TokenExpiredError') throw createHttpError(401, 'Token expired')

        throw createHttpError(401, err)
    }

    const user = await Users.findOne({_id: data.sub})

    if (!user) {
        throw createHttpError(404, "User not found!")
    }

    await Session.deleteOne({userId: data.sub})

    const encryptedPassword = await bcrypt.hash(payload.password, 10)

    await Users.updateOne({_id: user._id}, {password: encryptedPassword})
}
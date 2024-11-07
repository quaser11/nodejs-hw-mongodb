import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import {createUser, logoutUser, refreshUser} from "../services/auth.js";
import {loginUser} from "../services/auth.js";
import createHttpError from "http-errors";

export const createUserController = ctrlWrapper(async (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }

    const data = await createUser(user);

    res.status(201).send({
        status: 201,
        message: 'Successfully registered a user!',
        data: data,
    })
})

export const loginUserController = ctrlWrapper(async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }

    const session = await loginUser(user);

    console.log(session._id)
    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + 15 * 60 * 1000)
    })

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 15 * 60 * 1000)
    })

    return res.status(200).send({
        status:200,
        message: "Successfully logged in an user!",
        data: {
            accessToken: session.accessToken,
        }
    })
})

export const refreshController = ctrlWrapper(async (req, res) => {
    const session = await refreshUser({
        sessionId: req.cookies.sessionId,
        refreshToken: req.cookies.refreshToken,
    })

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + 15 * 60 * 1000)
    })

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 15 * 60 * 1000)
    })


    res.status(200).send({
        status:200,
        message: "Successfully refreshed a session!",
        data: {
            accessToken: session.accessToken
        }
    })
})

export const logoutController = ctrlWrapper(async (req, res) => {
    if(!req.cookies.sessionId){
        throw createHttpError(401, "Bad request")
    }

    await logoutUser(req.cookies.sessionId)

    res.clearCookie("sessionId")
    res.clearCookie("refreshToken")

    res.status(204).send()
})
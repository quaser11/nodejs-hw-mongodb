import {OAuth2Client} from "google-auth-library";
import {env} from './env.js'
import 'dotenv/config'
import createHttpError from "http-errors";

const oAuth2Client = new OAuth2Client(env('GOOGLE_CLIENT_ID'), env('GOOGLE_CLIENT_SECRET'), env('GOOGLE_REDIRECT_URI'));

export const generateGoogleOAuthUrl = () => {

    return oAuth2Client.generateAuthUrl({
        scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
    })
}

export const validateCode = async (code) => {
    try{
        const response = await oAuth2Client.getToken(code)

        if (!response.tokens.id_token) throw createHttpError(401, 'Unauthorized')

        if(response.status > 400 && response.status > 500) throw createHttpError(401, 'Unauthorized')

        return await oAuth2Client.verifyIdToken({
            idToken: response.tokens.id_token,
        })
    } catch(err) {
        throw createHttpError(404, err)
    }
}

export const getFullNameFromGoogleTokenPayload = (payload) => {
    let fullName = 'Guest'

    if (payload.given_name && payload.family_name) {
        fullName = `${payload.given_name} ${payload.family_name}`
    } else if (payload.given_name) {
        fullName = payload.given_name
    }

    return fullName
}
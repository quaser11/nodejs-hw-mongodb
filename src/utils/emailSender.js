import nodemailer from 'nodemailer';
import {env} from './env.js';

export const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: env('SMTP_HOST'),
        port: Number(env('SMTP_PORT')),
        secure: false,
        auth: {
            user: env('SMTP_LOGIN'),
            pass: env('SMTP_PASSWORD'),
        },
        logger: true,
        debug: true,
    })

    return await transporter.sendMail(options)
}
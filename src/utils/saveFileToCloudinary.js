import { v2 as cloudinary } from 'cloudinary';
import {CLOUDINARY} from "../constants/constants.js";
import {env} from './env.js'
import fs from 'node:fs/promises';

export const saveFileToCloudinary = async (file) => {
    cloudinary.config({
        secure: true,
        cloud_name: env(CLOUDINARY.CLOUD_NAME),
        api_key: env(CLOUDINARY.API_KEY),
        api_secret: env(CLOUDINARY.API_SECRET),
    })

    const response = await cloudinary.uploader.upload(file.path);
    await fs.unlink(file.path);
    return response.secure_url
}
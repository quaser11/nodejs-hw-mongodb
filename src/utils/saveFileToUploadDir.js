import path from 'node:path';
import fs from 'node:fs/promises';
import {env} from "./env.js";
export const saveFileToUploadDir = async (file, folder) => {
    await fs.rename(path.join('src/tmp', file.filename), path.join(`public/${folder}`, file.filename));

    return `${env('HOST')}/public/${folder}/${file.filename}`;
}
import multer from 'multer'

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniquePrefix + '_' + file.originalname)
    },
    destination: (req, file, cb) => {
        cb(null, 'src/tmp')
    }
})

export const upload = multer({ storage: storage })
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from "cookie-parser";
import {notFoundHandler} from "./middlewares/notFoundHandler.js";
import {errorHandler} from "./middlewares/errorHandler.js";
import studentsRouter from "./routes/contacts.js";
import authRouter from "./routes/auth.js";
import swaggerDocument from '../docs/swagger.json' assert { type: 'json' };
import swaggerUi from 'swagger-ui-express'
export const setupServer = () => {
    const PORT = process.env.PORT || 3000;
    const app = express();

    app.use(cors());

    app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(swaggerDocument));

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.use(express.json({
        type: ['application/json', 'application/vnd.api+json'],
    }))

    app.use(cookieParser());

    app.use('/contacts', studentsRouter)
    app.use('/auth', authRouter)

    app.use(notFoundHandler)

    app.use(errorHandler)

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    })
}

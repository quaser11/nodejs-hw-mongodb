import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import {notFoundHandler} from "./middlewares/notFoundHandler.js";
import {errorHandler} from "./middlewares/errorHandler.js";
import studentsRouter from "./routes/contacts.js";

export const setupServer = () => {
    const PORT = process.env.PORT || 3000;
    const app = express();

    app.use(cors());

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

    app.use('/contacts', studentsRouter)

    app.use('*', notFoundHandler)

    app.use(errorHandler)

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    })
}

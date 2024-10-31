import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import {
    createContactController, deleteContactController,
    getAllContactsController,
    getContactByIdController, patchContactController,
    upsertContactController
} from "./controllers/contacts.js";
import {notFoundHandler} from "./middlewares/notFoundHandler.js";
import {errorHandler} from "./middlewares/errorHandler.js";
import {isValidId} from "./middlewares/isValidId.js";

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

    app.get('/contacts', getAllContactsController)

    app.get('/contacts/:id', isValidId, getContactByIdController)

    app.post('/contacts', createContactController)

    app.put('/contacts/:id', isValidId, upsertContactController)

    app.patch('/contacts/:id', isValidId,  patchContactController)

    app.delete('/contacts/:id', isValidId, deleteContactController)

    app.use('*', notFoundHandler)

    app.use(errorHandler)

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    })
}

import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import {getAllContacts, getContactById} from "./services/students.js";
import mongoose from 'mongoose';

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

    app.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();

        res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts
        })
    })

    app.get('/contacts/:id', async (req, res) => {
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                status: 404,
                message: 'Contact not found'
            })
        }

        const contact = await getContactById(id);

        if (!contact) {
            return res.status(404).json({
                status: 404,
                message: 'Contact not found'
            })
        }

        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${id}!`,
            data: contact
        })
    })

    app.use((req, res) => {
        res.status(404).send({
            error: 'Not Found',
        });
    })

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    })
}

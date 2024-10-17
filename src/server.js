import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import {getAllStudents, getStudentById} from "./services/students.js";
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

    app.get('/students', async (req, res) => {
        const students = await getAllStudents();

        res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data: students
        })
    })

    app.get('/students/:id', async (req, res) => {
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                status: 404,
                message: 'Student not found'
            })
        }

        const student = await getStudentById(id);

        if (!student) {
            return res.status(404).json({
                status: 404,
                message: 'Student not found'
            })
        }

        res.status(200).json({
            status: 200,
            message: "Successfully found contact with id {contactId}!",
            data: student
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

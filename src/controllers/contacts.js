import {creatContact, getAllContacts, getContactById, updateContact, deleteContact} from "../services/contacts.js";
import mongoose from "mongoose";
import createHttpError from 'http-errors';
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import {isValidId} from "../middlewares/isValidId.js";

export const getAllContactsController = ctrlWrapper(async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts
    })
})

export const getContactByIdController = ctrlWrapper(async (req, res, next) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            status: 404,
            message: 'Contact not found'
        })
    }

    const contact = await getContactById(id);

    if (!contact) {
        throw createHttpError(404, "Contact not found")
    }

    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data: contact
    })
})

export const createContactController = ctrlWrapper(async (req, res, next) => {
    const contact = await creatContact(req.body)

    if (!contact) {
      throw createHttpError(400, "Bad request")
    }

    res.status(201).json({
        status: 201,
        message: 'Successfully created contact!',
        data: contact
    })
})

export const upsertContactController = ctrlWrapper(async (req, res, next) => {
    const {id} = req.params

    const result = await updateContact(id, req.body, {
        upsert: true
    })

    if (!result) {
        throw createHttpError(404, "Contact not found")
    }

    const status = result.isNew ? 201 : 200;

    res.status(status).json({
        status,
        message: "Successfully upserted a contact!",
        data:result.contact
    })
})

export const patchContactController = ctrlWrapper(async (req, res, next) => {
    const {id} = req.params

    const result = await updateContact(id, req.body)

    if (!result) {
        throw createHttpError(404, "Contact not found")
    }

    res.json({
        status: 200,
        message: `Successfully patched a student!`,
        data: result.contact,
    });

})

export const deleteContactController = ctrlWrapper(async (req, res, next) => {
    const {id} = req.params

    const contact = await deleteContact(id)

    if (!contact){
        throw createHttpError(404, "Contact not found")
    }

    res.status(404).json({})
})
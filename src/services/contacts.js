import {Contacts} from "../models/contacts.js";

export const getAllContacts = async () => {
    return Contacts.find();
}

export const getContactById = async (contactId) => {
    return Contacts.findById(contactId)
}

export const creatContact = async (payload) => {
    return Contacts.create(payload)
}

export const updateContact = async (id, payload, options = {}) => {
    const rawResult = await Contacts.findOneAndUpdate({
        _id: id,
    }, payload, {
        new: true,
        includeResultMetadata: true,
        ...options,
    })

    if (!rawResult || !rawResult.value) return null

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted)
    }
}

export const deleteContact = async (id) => {
    return Contacts.findOneAndDelete({ _id: id })
}
import {Contacts} from "../models/students.js";

export const getAllContacts = async () => {
    return Contacts.find();
}

export const getContactById = async (contactId) => {
    return Contacts.findById(contactId)
}
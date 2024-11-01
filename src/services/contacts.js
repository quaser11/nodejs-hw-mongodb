import {Contacts} from "../models/contacts.js";
import {calculatePaginationData} from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({page, perPage, sortBy, sortOrder, filter}) => {
    const studentQuery = Contacts.find()

    if(filter.isFavourite){
        studentQuery.where('isFavourite').equals(filter.isFavourite);
    }

    if(filter.contactType){
        studentQuery.where('contactType').equals(filter.contactType);
    }

    const [total, contacts] = await Promise.all([Contacts.countDocuments(), studentQuery.skip(page > 0 ? (page - 1) * perPage : 0).limit(perPage).sort({
        [sortBy]: sortOrder
    })])

    const paginationData = calculatePaginationData(total, page, perPage)

    return {
        data: contacts,
        ...paginationData
    };
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
    return Contacts.findOneAndDelete({_id: id})
}
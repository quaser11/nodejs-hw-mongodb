import {Schema, model} from 'mongoose';

const studentSchema = new Schema({
    name: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    email: {type: String},
    isFavourite: {type: Boolean, default: false},
    contactType: {type: String, enum: ['work', 'home', 'personal'], default: 'personal', required: true},
}, {
    timestamps: true,
    versionKey: false,
},)

export const Students = model('Student', studentSchema);
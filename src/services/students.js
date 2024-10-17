import {Students} from "../models/students.js";

export const getAllStudents = async () => {
    return Students.find();
}

export const getStudentById = async (studentId) => {
            return Students.findById(studentId)
}
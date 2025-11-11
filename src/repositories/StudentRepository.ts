import { Student } from "../models";
import { IStudentRepository } from "./Interfaces";

let registeredStudents: Student[] = [];

export const StudentRepository = (): IStudentRepository => ({
    getAll: async () => {
        return registeredStudents;
    },
    getById: async (studentId: number) => {
        return registeredStudents.find((student) => student.id === studentId) || null;
    },
    create: async (student: Student) => {
        const newstudent = {
            id: registeredStudents.length + 1,
            ...student,
        };

        registeredStudents = [...registeredStudents, newstudent];

        return newstudent;
    },
    update: async (student: Student) => {
        registeredStudents = registeredStudents.map((registeredstudent) => {
            if (registeredstudent.id === student.id) {
                return student;
            }
            return registeredstudent;
        });

        return student;
    },
    delete: async (studentId: number) => {
        registeredStudents = registeredStudents.filter((student) => student.id !== studentId);

        return;
    },
});

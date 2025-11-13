import { Teacher } from "../models";
import { ITeacherRepository } from "./Interfaces";

let registeredTeachers: Teacher[] = [];

export const TeacherRepository = (): ITeacherRepository => ({
    getAll: async () => {
        return registeredTeachers;
    },
    getById: async (id: number) => {
        return registeredTeachers.find((teacher) => teacher.id === id) || null;
    },
    create: async (teacher: Teacher) => {
        const newTeacher = {
            id: registeredTeachers.length + 1,
            ...teacher,
        };

        registeredTeachers = [...registeredTeachers, newTeacher];

        return newTeacher;
    },
    update: async (teacher: Teacher) => {
        registeredTeachers = registeredTeachers.map((registeredTeacher) => {
            if (registeredTeacher.id === teacher.id) {
                return teacher;
            }
            return registeredTeacher;
        });

        return teacher;
    },
    delete: async (teacherId: number) => {
        registeredTeachers = registeredTeachers.filter((teacher) => teacher.id !== teacherId);

        return;
    },
});

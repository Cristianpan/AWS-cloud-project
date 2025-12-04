import { prisma } from "../config/prisma/prismaClient";
import { Teacher } from "../models";
import { ITeacherRepository } from "./Interfaces";

let registeredTeachers: Teacher[] = [];

export const TeacherRepository = (): ITeacherRepository => ({
    getAll: async () => {
        return await prisma.teacher.findMany();
    },
    getById: async (id: number) => {
        return await prisma.teacher.findUnique({ where: { id } });
    },
    create: async (teacher: Teacher) => {
        const { id, ...teacherData } = teacher;
        const newTeacher = await prisma.teacher.create({
            data: {
                ...teacherData,
            },
        });

        return newTeacher;
    },
    update: async (teacher: Teacher) => {
        const { id: teacherId, ...teacherData } = teacher;
        const teacherUpdated = await prisma.teacher.update({
            where: {
                id: teacherId!,
            },
            data: {
                ...teacherData,
            },
        });

        return teacherUpdated;
    },
    delete: async (teacherId: number) => {
        await prisma.teacher.delete({ where: { id: teacherId } });

        return;
    },
});

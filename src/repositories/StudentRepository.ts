import { prisma } from "../config/prisma/prismaClient";
import { Student } from "../models";
import { hashPassword } from "../utils/passwordEncoder";
import { IStudentRepository } from "./Interfaces";

export const StudentRepository = (): IStudentRepository => ({
    getAll: async () => {
        return await prisma.student.findMany();
    },
    getById: async (studentId: number) => {
        return (await prisma.student.findUnique({ where: { id: studentId } })) as Student | null;
    },
    create: async (student: Student) => {
        const { id, ...studentData } = student;

        const newstudent = await prisma.student.create({
            data: {
                ...studentData,
                password: await hashPassword(student.password),
                fotoPerfilUrl: student.fotoPerfilUrl ?? null,
            },
        });

        return newstudent;
    },
    update: async (student: Student) => {
        const { id: studentId, ...studentData } = student;

        const studentUpdated = await prisma.student.update({
            where: {
                id: studentId!,
            },
            data: {
                ...studentData,
                fotoPerfilUrl: student.fotoPerfilUrl ?? null,
            },
        });

        return studentUpdated;
    },
    delete: async (studentId: number) => {
        await prisma.student.delete({ where: { id: studentId } });

        return;
    },
});

import { Errors } from "../constants";
import BadRequestError from "../errors/BadRequest";
import ResourceNotFound from "../errors/ResourceNotFound";
import { TeacherSchema, Teacher } from "../models";
import { ITeacherRepository } from "../repositories";

export const TeacherService = (teacherRepository: ITeacherRepository) => ({
    getAllTeachers: async () => {
        return await teacherRepository.getAll();
    },
    getTeacherById: async (id: number) => {
        const teacher = await teacherRepository.getById(id);

        if (!teacher) {
            throw new ResourceNotFound(Errors.TEACHER_NOT_FOUNT);
        }

        return teacher;
    },
    updateTeacher: async (teacher: Teacher, teacherId: number) => {
        const existTeacher = await teacherRepository.getById(teacherId ?? 0);

        if (!existTeacher) {
            throw new ResourceNotFound(Errors.TEACHER_NOT_FOUNT);
        }

        const validatorResult = TeacherSchema.safeParse(teacher);

        if (!validatorResult.success) {
            throw new BadRequestError(validatorResult.error.message);
        }

        return await teacherRepository.update({...existTeacher, ...teacher});
    },
    createTeacher: async (teacher: Teacher) => {
        const validatorResult = TeacherSchema.safeParse(teacher);

        if (!validatorResult.success) {
            throw new BadRequestError(validatorResult.error.message);
        }

        return await teacherRepository.create(teacher);
    },
    deleteTeacher: async (teacherId: number) => {
        const existTeacher = await teacherRepository.getById(teacherId ?? 0);

        if (!existTeacher) {
            throw new ResourceNotFound(Errors.TEACHER_NOT_FOUNT);
        }

        return await teacherRepository.delete(teacherId);
    },
});

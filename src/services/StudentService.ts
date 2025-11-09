import { Errors } from "../constants";
import BadRequestError from "../errors/BadRequest";
import ResourceNotFound from "../errors/ResourceNotFound";
import { Student, StudentSchema } from "../models";
import { IStudentRepository } from "../repositories";

export const StudentService = (studentRepository: IStudentRepository) => ({
    getAllStudents: async () => {
        return await studentRepository.getAll();
    },
    getStudentById: async (id: number) => {
        return await studentRepository.getById(id);
    },
    updateStudent: async (student: Student, studentId: number) => {
        const existStudent = await studentRepository.getById(studentId ?? 0);

        if (!existStudent) {
            throw new ResourceNotFound(Errors.STUDENT_NOT_FOUNT);
        }

        const validatorResult = StudentSchema.safeParse(student);

        if (!validatorResult.success) {
            throw new BadRequestError(validatorResult.error.message);
        }

        return await studentRepository.update(student);
    },
    createStudent: async (student: Student) => {
        const validatorResult = StudentSchema.safeParse(student);

        if (!validatorResult.success) {
            throw new BadRequestError(validatorResult.error.message);
        }

        return await studentRepository.create(student);
    },
    deleteStudent: async (studentId: number) => {
        const existStudent = await studentRepository.getById(studentId ?? 0);

        if (!existStudent) {
            throw new ResourceNotFound(Errors.STUDENT_NOT_FOUNT);
        }

        return await studentRepository.delete(studentId);
    },
});

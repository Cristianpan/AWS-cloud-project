import { Errors } from "../constants";
import BadRequestError from "../errors/BadRequest";
import ResourceNotFound from "../errors/ResourceNotFound";
import { Student, StudentSchema } from "../models";
import { IBucketRepository, IStudentRepository } from "../repositories";

export const StudentService = (
    studentRepository: IStudentRepository,
    bucketRepository: IBucketRepository
) => ({
    getAllStudents: async () => {
        return await studentRepository.getAll();
    },
    getStudentById: async (id: number) => {
        const student = await studentRepository.getById(id);

        if (!student) {
            throw new ResourceNotFound(Errors.STUDENT_NOT_FOUNT);
        }

        return student;
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

        return await studentRepository.update({...existStudent, ...student});
    },
    createStudent: async (student: Student) => {
        const validatorResult = StudentSchema.safeParse(student);

        if (!validatorResult.success) {
            throw new BadRequestError(validatorResult.error.message);
        }

        return await studentRepository.create(student);
    },
    updatePhotoUrl: async (studentId: number, file: Express.Multer.File) => {
        const existStudent = await studentRepository.getById(studentId ?? 0);

        if (!existStudent) {
            throw new ResourceNotFound(Errors.STUDENT_NOT_FOUNT);
        }

        const fileUrl = await bucketRepository.uploadFile(file);

        return await studentRepository.update({
            ...existStudent,
            fotoPerfilUrl: fileUrl,
        });
    },
    deleteStudent: async (studentId: number) => {
        const existStudent = await studentRepository.getById(studentId ?? 0);

        if (!existStudent) {
            throw new ResourceNotFound(Errors.STUDENT_NOT_FOUNT);
        }

        return await studentRepository.delete(studentId);
    },
});

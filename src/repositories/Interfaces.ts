import { Student, Teacher } from "../models";

export interface IStudentRepository {
    getAll(): Promise<Student[]>;
    getById(id: number): Promise<Student | null>;
    create(student: Student): Promise<Student>;
    update(student: Student): Promise<Student>;
    delete(id: number): Promise<void>;
}

export interface ITeacherRepository {
    getAll(): Promise<Teacher[]>;
    getById(id: number): Promise<Teacher | null>;
    create(teacher: Teacher): Promise<Teacher>;
    update(teacher: Teacher): Promise<Teacher>;
    delete(id: number): Promise<void>;
}

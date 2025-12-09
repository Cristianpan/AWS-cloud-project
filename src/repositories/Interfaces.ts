import { Student, Teacher } from "../models";
import { AuthUser } from "../models/AuthUser";
import { Session } from "../models/Session";

export interface IUserRepository<T extends AuthUser> {
    getById(id: number): Promise<T | null>;
}

export interface ISessionRepository {
    createSession(userId: number): Promise<Session | null>;
    getSession(sessionId: string): Promise<Session | null>;
    invalidSession(sessionId: string): Promise<void>;
}

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

import { Session } from "./../models/Session";
import { IUserRepository } from "./../repositories/Interfaces";
import { StudentService } from "./../services/StudentService";
import { StudentRepository } from "./../repositories/StudentRepository";
import { Router } from "express";
import { NotAllowedMethodsHandler } from "../middleware";
import { sendEmailNotification } from "../config/aws/sns";
import { SessionRepository } from "../repositories/SessionRepository";
import { AuthService } from "../services/AuthService";
import { Student } from "../models";

export const studentRouter = Router();

const studentRepository = StudentRepository();
const studentService = StudentService(studentRepository);
const sessionRepository = SessionRepository();
const authService = AuthService(studentRepository as IUserRepository<Student>, sessionRepository);

const allowedMethodsByPath = [
    { path: /^\/$/, methods: ["GET", "POST"] },
    { path: /^\/\d+$/, methods: ["GET", "PUT", "DELETE"] },
];

studentRouter.get("/", async (req, res) => {
    const students = await studentService.getAllStudents();

    res.json(students);
});

studentRouter.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const student = await studentService.getStudentById(id);
    res.json(student);
});

studentRouter.post("/", async (req, res) => {
    const student = req.body;
    const createdStudent = await studentService.createStudent(student);
    res.status(201).json(createdStudent);
});

studentRouter.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const student = req.body;
    const updatedStudent = await studentService.updateStudent(student, id);
    res.json(updatedStudent);
});

studentRouter.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    await studentService.deleteStudent(id);
    res.sendStatus(200);
});

studentRouter.post("/:id/email", async (req, res) => {
    const id = Number(req.params.id);
    const student = await studentService.getStudentById(id);

    const { nombres, apellidos, promedio } = student;

    await sendEmailNotification(
        "Calificaciones",
        `Alumno: ${nombres} ${apellidos} - Promedio: ${promedio}`
    );
    res.sendStatus(200);
});

studentRouter.post("/:id/session/login", async (req, res) => {
    const id = Number(req.params.id);
    const password = req.body.password;

    const session = await authService.login(id, password);

    res.json(session);
});

studentRouter.post("/:id/session/verify", async (req, res) => {
    const userId = Number(req.params.id);
    const sessionString = req.body.sessionString;

    await authService.verify(sessionString, userId);

    res.status(200);
});

studentRouter.post("/:id/session/logout", async (req, res) => {
    const userId = Number(req.params.id);
    const sessionString = req.body.sessionString;

    await authService.logout(sessionString, userId);

    res.status(200);
});

studentRouter.use(NotAllowedMethodsHandler(allowedMethodsByPath));

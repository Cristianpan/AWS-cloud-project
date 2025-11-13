import { StudentService } from "./../services/StudentService";
import { StudentRepository } from "./../repositories/StudentRepository";
import { Router } from "express";
import { NotAllowedMethodsHandler } from "../middleware";

export const studentRouter = Router();

const studentRepository = StudentRepository();
const studentService = StudentService(studentRepository);

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

studentRouter.use(NotAllowedMethodsHandler(allowedMethodsByPath));

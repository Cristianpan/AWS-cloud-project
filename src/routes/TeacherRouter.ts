import { StudentService } from "./../services/StudentService";
import { StudentRepository } from "./../repositories/StudentRepository";
import { Router } from "express";
import { TeacherRepository } from "../repositories";
import { TeacherService } from "../services";

export const teacherRouter = Router();

const teacherRepository = TeacherRepository();
const teacherService = TeacherService(teacherRepository);

teacherRouter.get("/", async (req, res) => {

    const teachers = await teacherService.getAllTeachers();

    res.json(teachers);
});

teacherRouter.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const teacher = await teacherService.getTeacherById(id);
    res.json(teacher);
});

teacherRouter.post("/", async (req, res) =>{
    const teacher = req.body;
    const createdTeacher = await teacherService.createTeacher(teacher);
    res.status(201).json(createdTeacher);
})

teacherRouter.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const teacher = req.body;
    const updatedStudent = await teacherService.updateTeacher(teacher, id);
    res.json(updatedStudent);
})

teacherRouter.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    await teacherService.deleteTeacher(id);
    res.sendStatus(200)
})


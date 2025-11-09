import express from "express";
import cors from "cors";
import { studentRouter, teacherRouter } from "./routes";
import {config} from "dotenv"; 

config();

const { SERVER_PORT = 3000 } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/alumnos", studentRouter);
app.use("/profesores", teacherRouter);

app.listen(SERVER_PORT, () => {
    console.log(`Running in ${SERVER_PORT}}`);
});

export default app;

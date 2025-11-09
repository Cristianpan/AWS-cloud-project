import zod from "zod";

export const TeacherSchema = zod.object({
    id: zod.number().positive().optional(),
    numeroEmpleado: zod.string().nonoptional({ message: "El numero de empleado es obligatorio" }),
    nombres: zod.string().nonoptional({ message: "El nombre es obligatorio" }),
    apellidos: zod.string().nonoptional({ message: "Los apellidos son obligatorios" }),
    horasClase: zod
        .number()
        .positive({ message: "El número de horas de clase debe ser mayor o igual a cero" })
        .nonoptional({ message: "El número de horas de clase es obligatorio" })
});

export type Teacher= zod.infer<typeof TeacherSchema>;

import zod from "zod";

export const StudentSchema = zod.object({
    id: zod.number().positive().optional(),
    nombres: zod.string().nonoptional({ message: "El nombre es obligatorio" }),
    apellidos: zod.string().nonoptional({ message: "Los apellidos son obligatorios" }),
    matricula: zod.string().nonoptional({ message: "La matricula es obligatoria" }),
    promedio: zod
        .number()
        .positive({ message: "El promedio debe ser mayor o igual a cero" })
        .nonoptional({ message: "El promedio es obligatorio" })
});

export type Student = zod.infer<typeof StudentSchema>;

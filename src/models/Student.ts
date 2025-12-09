import zod from "zod";

export const StudentSchema = zod.object({
    id: zod.number().positive().optional(),
    nombres: zod.string().nonempty({ message: "El nombre es obligatorio" }),
    apellidos: zod.string().nonempty({ message: "Los apellidos son obligatorios" }),
    matricula: zod.string().nonempty({ message: "La matricula es obligatoria" }),
    promedio: zod
        .number()
        .positive({ message: "El promedio debe ser mayor o igual a cero" })
        .nonoptional({ message: "El promedio es obligatorio" }),
    fotoPerfilUrl: zod.string().nullable().optional(),
    password: zod.string().nonempty({ message: "La contraseña es obligatoria" }),
});

export type Student = zod.infer<typeof StudentSchema>;

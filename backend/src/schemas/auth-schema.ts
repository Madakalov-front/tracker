import z from "zod";

export const AuthSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email обязателен" })
        .email({ message: "Не валидный email" }),
    password: z.string().min(1, { message: "Пароль обязателен" }),
});


export type AuthFormValue = z.infer<typeof AuthSchema>;
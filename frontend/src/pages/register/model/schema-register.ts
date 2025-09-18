import { z } from "zod";

export const RegisterSchema = z
    .object({
        name: z
            .string()
            .nonempty('Имя обязательно')
            .min(2, "Имя слишком короткое")
            .max(50, "Имя слишком длинное")
            .regex(
                /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
                "Имя может содержать только буквы, пробелы и дефис"
            ),
        email: z.string().min(1, "Email обязателен").email("Не валидный емали"),
        password: z
            .string()
            .nonempty('Пароль обязателен')
            .min(8, "Не короче 8-ми символов")
            .max(128, "Слишком длинный пароль")
            .regex(
                /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                "Пароль должен содержать минимум одну заглавную букву, одну цифру и один спецсимвол"
            ),
        confirmPassword: z.string().min(1, "Подтвердите пароль"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Пароли не совпадают",
    });

export type RegisterFormValue = z.infer<typeof RegisterSchema>;

import {z} from 'zod'

export const LoginSchema = z.object({
    email: z.string().min(1, {message: "Email обязателен"}).email({ message: 'Не валидный email' }),
    password: z.string().min(1, {message: 'Пароль обязателен'})
})

export type LoginFormValues = z.infer<typeof LoginSchema>;
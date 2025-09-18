import { z } from "zod";

export const CommentZodSchema = z.object({
    author: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Некорректный ObjectId автора"),
    text: z.string().min(1, "Текст комментария обязателен"),
    date: z.date().optional(), 
});


export const TaskZodSchema = z.object({
    title: z.string().min(1, "Название задачи обязательно"),
    description: z.string().optional(),
    priority: z
        .enum(["low", "medium", "high"], {
            error: "Приоритет должен быть: low | medium | high",
        })
        .default("low"),
    status: z
        .enum(["backlog", "todo", "inProgress", "done"], {
            error: "Статус должен быть: backlog | todo | inProgress | done",
        })
        .default("todo"),
    creator: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Некорректный ObjectId создателя"),
    assignee: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Некорректный ObjectId исполнителя"),
    comments: z.array(CommentZodSchema).optional(),
});


export type CommentInput = z.infer<typeof CommentZodSchema>;
export type TaskInput = z.infer<typeof TaskZodSchema>;

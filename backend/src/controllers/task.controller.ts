import { Request, Response } from "express";
import { TaskInput, TaskZodSchema } from "../schemas";
import { Task } from "../models/Task";
import { Types } from "mongoose";

interface AuthenticatedRequest extends Request {
    userId?: string;
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const parsedData: TaskInput = TaskZodSchema.parse(req.body);
        const newTask = await Task.create(parsedData);

        res.status(201).json({
            success: true,
            data: newTask,
        });
    } catch (err: any) {
        if (err.name === "ZodError") {
            return res.status(400).json({
                success: false,
                errors: err.errors.map((e: any) => ({
                    field: e.path.join("."),
                    message: e.message,
                })),
            });
        }

        console.error(err);
        res.status(500).json({
            success: false,
            message: "Ошибка сервера при создании задачи",
        });
    }
};

export const groupedTask = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = new Types.ObjectId(req.userId);

        if (!userId) {
            return res.status(400).json({ error: "Не авторизован" });
        }

        if (!Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Неверный формат id" });
        }

        const taskCount = await Task.countDocuments({ creator: userId });

        if (taskCount === 0) {
            // Если задач нет, возвращаем все статусы с пустыми массивами
            return res.json({
                success: true,
                data: ["backlog", "todo", "inProgress", "done"].map((status) => ({
                    status,
                    count: 0,
                    tasks: [],
                })),
                totalTasks: 0,
            });
        }

        const tasks = await Task.aggregate([
            { $match: { creator: userId } },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "userInfo",
                },
            },
            {
                $unwind: {
                    path: "$userInfo",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $group: {
                    _id: "$status",
                    tasks: {
                        $push: {
                            _id: "$_id",
                            title: "$title",
                            description: "$description",
                            status: "$status",
                            createdAt: "$createdAt",
                            updatedAt: "$updatedAt",
                            user: "$userInfo._id",
                            name: "$userInfo.name",
                        },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    status: "$_id",
                    count: 1,
                    tasks: 1,
                },
            },
        ]);

        const statusOrder = ["backlog", "todo", "inProgress", "done"];

        // Формируем ответ с фиксированным порядком и пустыми массивами при отсутствии задач
        const formattedResponse = statusOrder.map((status) => {
            const group = tasks.find((t) => t.status === status);
            return group || { status, count: 0, tasks: [] };
        });

        res.json({
            success: true,
            data: formattedResponse,
            totalTasks: taskCount,
        });
    } catch (err) {
        console.error("Error in groupedTask:", err);
        res.status(500).json({
            error: "Ошибка сервера",
            message: err instanceof Error ? err.message : "Unknown error",
        });
    }
};


export const getTaskById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Некорректный id задачи" });
        }

        const task = await Task.findById(id)
            .populate("assignee", "name")
            .populate("creator", "name")
            .lean();
        if (!task) {
            return res.status(404).json({ error: "Задача не найдена" });
        }

        res.json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Некорректный id задачи" });
        }

        const { title, description, priority, status } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            id, 
            { title, description, priority, status },
            { new: true, runValidators: true }
        )
            .populate("creator", "name")
            .populate("assignee", "name")
            .lean();

        if (!updatedTask) {
            return res.status(404).json({ error: "Задача не найдена" });
        }

        res.json(updatedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};


export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id)
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Некорректный id задачи" });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ error: "Задача не найдена" });
    }

    res.json({ message: "Задача успешно удалена", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};
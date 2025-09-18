import { Router } from "express";
import { createTask, deleteTask, getTaskById, groupedTask, updateTask } from "../controllers/task.controller";
import { requireAuth } from "../middlewares/auth.middleware";


export const taskRoutes = Router();

taskRoutes.post('/tasks', createTask);
taskRoutes.get('/tasks', requireAuth, groupedTask);
taskRoutes.get("/tasks/:id", getTaskById);
taskRoutes.put("/tasks/:id", updateTask);
taskRoutes.delete("/tasks/:id", deleteTask);
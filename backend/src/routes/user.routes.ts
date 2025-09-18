import { Router } from "express";
import {
    createUser,
    getUsers,
    login,
    logout,
    me,
} from "../controllers/user.controller";
import { requireAuth } from "../middlewares/auth.middleware";

export const userRoutes = Router();

userRoutes.get("/users", requireAuth, getUsers);
userRoutes.post("/users", createUser);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
userRoutes.get("/me", me);

import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import z from "zod";
import { RegisterFromValue, RegisterSchema } from "../schemas";
import { AuthSchema } from "../schemas/auth-schema";

const COOKIE_NAME = "auth_token";
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const getUsers = async (_: Request, res: Response) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const parsedData: RegisterFromValue = RegisterSchema.parse(req.body);

        const existingUser = await User.findOne({ email: parsedData.email });
        if (existingUser) {
            return res
                .status(409)
                .json({ error: "Пользователь с таким email уже существует" });
        }

        const hashPassword = await bcrypt.hash(parsedData.password, 10);
        const user = await User.create({
            name: parsedData.name,
            email: parsedData.email,
            password: hashPassword,
        });
        const { password, ...userData } = user.toObject();
        res.status(201).json(userData);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.issues });
        } else {
            res.status(500).json({ error: "Ошибка сервера" });
        }
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const parsed = AuthSchema.parse(req.body);

        const user = await User.findOne({ email: parsed.email }).select(
            "+password"
        );
        if (!user)
            return res
                .status(401)
                .json({ message: "Неверный email или пароль" });

        const isMatch = await bcrypt.compare(parsed.password, user.password);
        if (!isMatch)
            return res
                .status(401)
                .json({ message: "Неверный email или пароль" });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie(COOKIE_NAME, token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
        });
        const { password, ...userData } = user.toObject();
        res.json({ user: userData, message: "Успешный вход" });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie(COOKIE_NAME);
    res.json({ message: "Выход выполнен" });
};

export const me = async (req: Request, res: Response) => {
    try {
        const token = req.cookies[COOKIE_NAME];

        if (!token) return res.status(401).json({ message: "Не авторизован" });

        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
        const user = await User.findById(decoded.userId).select("-password");
        if (!user)
            return res.status(401).json({ message: "Пользователь не найден" });
        res.json(user);
    } catch (err) {
        console.error("Ошибка в me middleware:", err);

        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Невалидный токен" });
        }

        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Токен истек" });
        }

        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

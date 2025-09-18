import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    id: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const COOKIE_NAME = "auth_token";

export interface AuthRequest extends Request {
    userId?: string;
}

export const requireAuth = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies[COOKIE_NAME];
        if (!token) return res.status(401).json({ message: "Не авторизован" });
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: "Неверный токен" });
    }
};

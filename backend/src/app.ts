import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoutes } from "./routes/user.routes";
import { taskRoutes } from "./routes/task.route";
const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true, 
    })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (_, res) => {
    res.send("✅ Tracker API is working!");
});

app.use("/", userRoutes);
app.use("/", taskRoutes);

export default app;

import { connectDB } from "./config/db";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

connectDB().then(() => {
    app.listen(PORT, "0.0.0.0", () => {
        console.log("Server started");
    });
});

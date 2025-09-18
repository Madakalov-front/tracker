import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    tel?: string;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        tel: { type: String, required: false },
    },
    { timestamps: true }
);

export default model<IUser>("User", userSchema);

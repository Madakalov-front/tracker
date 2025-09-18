import { model, Schema, Types } from "mongoose";

const CommentSchema = new Schema({
    author: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "low",
        },
        status: {
            type: String,
            enum: ["backlog", "todo", "inProgress", "done"],
            default: "todo",
        },
        creator: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        assignee: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        comments: [CommentSchema],
    },
    { timestamps: true }
);

export const Task = model('Task', TaskSchema);

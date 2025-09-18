export type StatusTask = "backlog" | "todo" | "inProgress" | "done";
export type PriorityTask = "low" | "medium" | "high";

export type Comment = {
    author: { _id: string; name: string };
    text: string;
    date: Date;
};

export type TaskBase = {
    readonly _id?: string;
    title: string;
    description?: string;
    priority: PriorityTask;
    status: StatusTask;
    creator: { _id: string; name: string };
    assignee?: { _id: string; name: string };
    createAt: Date;
    updatedAt: Date;
    comments?: Comment[];
};

export type TasksByStatus = {
    status: StatusTask;
    count: number;
    tasks: TaskBase[];
};

export type GetTasksResponse = {
    success: boolean;
    data: TasksByStatus[];
};

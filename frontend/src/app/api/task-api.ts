import type { TaskInput } from "@/shared/schemas";
import { baseApi } from "./base-api";
import { type GetTasksResponse, type TaskBase } from "@/shared/types";



export const taskApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createTask: build.mutation({
            query: (task: TaskInput) => ({
                url: "/tasks",
                method: "POST",
                body: task,
            }),
            invalidatesTags: ["Task"],
        }),
        getTasks: build.query<GetTasksResponse, void>({
            query: () => "/tasks",
            providesTags: ["Task"],
        }),
        getTask: build.query<TaskBase, string>({
            query: (id) => `tasks/${id}`,
            providesTags: (_, __, id) => [{ type: "Task", id }],
        }),
        updateTask: build.mutation<
            TaskBase,
            { id: string; data: Partial<TaskInput> }
        >({
            query: ({ id, data }) => ({
                url: `tasks/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (_, __, { id }) => [{ type: "Task", id }],
        }),
        deleteTask: build.mutation<{ message: string; id: string }, string>({
            query: (id) => ({
                url: `tasks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Task"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateTaskMutation,
    useGetTasksQuery,
    useGetTaskQuery,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = taskApi;

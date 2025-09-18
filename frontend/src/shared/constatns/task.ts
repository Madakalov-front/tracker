import type { PriorityTask, StatusTask } from "../types";

export const PRIORITY_NAME: Record<PriorityTask, string> = {
    low: "низкий",
    medium: "средний",
    high: "высокий",
};

export const STATUS_NAME: Record<StatusTask, string> = {
    backlog: 'идеи',
    todo: 'ожидают',
    inProgress: 'в процессе',
    done: 'готово',
};

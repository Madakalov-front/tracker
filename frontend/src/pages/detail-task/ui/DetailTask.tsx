import { useGetTaskQuery, useUpdateTaskMutation } from "@/app/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./TaskDetailPage.module.scss";
import { Button, Loader } from "@/shared/ui";
import type { TaskInput } from "@/shared/schemas";

export const DetailTask = () => {
    const { id } = useParams<{ id: string }>();
    const { data: task, isLoading, isFetching } = useGetTaskQuery(id!, { skip: !id });
    const [updateTask] = useUpdateTaskMutation();

    const [form, setForm] = useState<TaskInput>({
        title: "",
        description: "",
        priority: "low",
        status: "todo",
    });

    useEffect(() => {
        if (task) {
            setForm({
                title: task.title,
                description: task.description || "",
                priority: task.priority,
                status: task.status,
            });
        }
    }, [task]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!id) return;
        await updateTask({ id, data: form });
    };

    if (isLoading) return <p>Загрузка...</p>;
    if (!task) return <p>Задача не найдена</p>;

    return (
        <>
            <div className="container">
                <div className={styles["task-detail"]}>
                    <h2 className={styles["task-detail__title"]}>
                        Задача: {task.title}
                    </h2>

                    <div className={styles["task-detail__form"]}>
                        <label className={styles["task-detail__field"]}>
                            Название:
                            <input
                                className={styles["task-detail__input"]}
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                            />
                        </label>

                        <label className={styles["task-detail__field"]}>
                            Описание:
                            <textarea
                                className={styles["task-detail__textarea"]}
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                            />
                        </label>

                        <label className={styles["task-detail__field"]}>
                            Приоритет:
                            <select
                                className={styles["task-detail__select"]}
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                            >
                                <option value="low">Низкий</option>
                                <option value="medium">Средний</option>
                                <option value="high">Высокий</option>
                            </select>
                        </label>

                        <label className={styles["task-detail__field"]}>
                            Статус:
                            <select
                                className={styles["task-detail__select"]}
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                            >
                                <option value="backlog">В планах</option>
                                <option value="todo">К выполнению</option>
                                <option value="inProgress">В процессе</option>
                                <option value="done">Сделано</option>
                            </select>
                        </label>

                        <div className={styles["task-detail__meta"]}>
                            <p>
                                <b>Ответственный:</b>{" "}
                                {task.assignee?.name || "—"}
                            </p>
                            <p>
                                <b>Создатель:</b> {task.creator?.name || "—"}
                            </p>
                        </div>
                        <Button handleClick={handleSave} text="💾 Сохранить" />
                        {isFetching && <Loader />}
                    </div>
                </div>
            </div>
        </>
    );
};

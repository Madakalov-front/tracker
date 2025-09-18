import { useDeleteTaskMutation } from "@/app/api";
import type { TaskBase } from "@/shared/types";
import styles from "./TaskCard.module.scss";
import clsx from "clsx";
import { Link } from "react-router";
type TaskCardProps = Pick<
    TaskBase,
    "_id" | "title" | "priority" | "assignee" | "updatedAt"
>;

export const TaskCard = ({
    _id,
    title,
    priority,
    assignee,
    updatedAt,
}: TaskCardProps) => {
    const [deleteTask] = useDeleteTaskMutation();
    console.log(_id)
    const handleDelete = async () => {
        if (_id && confirm("Удалить задачу?")) {
            try {
                await deleteTask(_id).unwrap();
            } catch (err) {
                console.error("Ошибка удаления:", err);
            }
        }
    };
    return (
        <article className={styles.taskCard}>
            <header className={styles.header}>
                <Link to={`/task/${_id}`}>
                    <h3 className={styles.title}>{title}</h3>
                </Link>
                <button
                    className={styles.delete}
                    onClick={handleDelete}
                    aria-label="Удалить задачу"
                >
                    ✕
                </button>
            </header>

            <div className={styles.body}>
                <span
                    className={clsx(
                        styles.priority,
                        styles[`priority--${priority}`]
                    )}
                >
                    {priority}
                </span>
            </div>

            <footer className={styles.footer}>
                <span className={styles.assignee}>{assignee?.name}</span>
                <time
                    dateTime={new Date(updatedAt).toISOString()}
                    className={styles.time}
                >
                    {new Date(updatedAt).toLocaleDateString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </time>
            </footer>
        </article>
    );
};

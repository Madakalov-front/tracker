import { useGetTasksQuery } from "@/app/api";
import { BreadLinks, Loader } from "@/shared/ui";
import styles from "./MyTasksPage.module.scss";
import { TaskCard } from "@/entities/task-card";
import { Link } from "react-router";
import { useAppSelector } from "@/app/store";

export const MyTasksPage = () => {
    const user = useAppSelector((store) => store.auth.user);
    const { data: response, isLoading } = useGetTasksQuery();
    console.log(response);

    return (
        <main className="my-tasks-page">
            <BreadLinks />
            <div className="container">
                {!user ? (
                    <Link to="/login">Авторизуйтесь</Link>
                ) : (
                    <div className={styles["grid-tasks"]}>
                        {isLoading ? (
                            <Loader />
                        ) : (
                           response && response.data.map((currentStatus, i) => (
                                <div
                                    className={styles["grid-tasks__item"]}
                                    data-status={currentStatus.status}
                                    key={i}
                                >
                                    {currentStatus.tasks.length > 0 ? (
                                        currentStatus.tasks.map(
                                            ({
                                                priority,
                                                title,
                                                assignee,
                                                updatedAt,
                                                _id,
                                            }) => (
                                                <TaskCard
                                                    key={_id}
                                                    _id={_id}
                                                    priority={priority}
                                                    title={title}
                                                    assignee={assignee}
                                                    updatedAt={updatedAt}
                                                />
                                            )
                                        )
                                    ) : (
                                        <div
                                            className={
                                                styles["grid-tasks__empty"]
                                            }
                                        >
                                            Нет задач
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </main>
    );
};

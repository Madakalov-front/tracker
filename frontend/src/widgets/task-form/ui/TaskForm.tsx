import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "@/shared/ui/field/FieldInput.module.scss";
import { TaskZodSchema, type TaskInput } from "@/shared/schemas";
import { Button, FieldInput, Loader } from "@/shared/ui";
import { useCreateTaskMutation } from "@/app/api";
import { useAppSelector } from "@/app/store";
import { useNavigate } from "react-router";

export const TaskForm = () => {
    const user = useAppSelector((store) => store.auth.user);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TaskInput>({
        resolver: zodResolver(TaskZodSchema),
        defaultValues: {
            priority: "low",
            status: "backlog",
        },
    });
    const [createTask, { isLoading }] = useCreateTaskMutation();
    const onSubmit = async (data: TaskInput) => {
        const newTask = {
            ...data,
            creator: user?._id,
            assignee: user?._id,
        };
        try {
            const result = await createTask(newTask).unwrap();
            console.log("Задача создана:", result);
            reset();
            setTimeout(() => navigate("/my-tasks"), 1000);
        } catch (err) {
            console.error("Ошибка создания задачи:", err);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldInput
                    label="Название"
                    error={errors.title?.message}
                    registration={register("title")}
                />

                {/* Вариант textarea */}
                <FieldInput
                    label="Описание"
                    error={errors.description?.message}
                    registration={register("description")}
                    type="textarea"
                />

                {/* Приоритет */}
                <div className={styles.field}>
                    <label className={styles.field__label}>
                        Приоритет
                        <select
                            {...register("priority")}
                            className={styles.field__input}
                        >
                            <option value="low">Низкий</option>
                            <option value="medium">Средний</option>
                            <option value="high">Высокий</option>
                        </select>
                    </label>
                    {errors.priority && (
                        <span className={styles.field__error}>
                            {errors.priority.message}
                        </span>
                    )}
                </div>

                {/* Статус */}
                <div className={styles.field}>
                    <label className={styles.field__label}>
                        Статус
                        <select
                            {...register("status")}
                            className={styles.field__input}
                        >
                            <option value="backlog">На подумать</option>
                            <option value="todo">Ожидают</option>
                            <option value="inProgress">В работе</option>
                            <option value="done">Выполнено</option>
                        </select>
                    </label>
                    {errors.status && (
                        <span className={styles.field__error}>
                            {errors.status.message}
                        </span>
                    )}
                </div>

                <Button
                    type="submit"
                    text={isLoading ? "Создание..." : "Создать задачу"}
                    disabled={isLoading}
                />
                {isLoading && <Loader variant="dots" />}
            </form>
        </div>
    );
};

import { Button, FieldInput, Loader } from "@/shared/ui";
import { type LoginFormValues, LoginSchema } from "../model/schema-login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import styles from "./LoginPage.module.scss";
import { Link, useNavigate } from "react-router";
import clsx from "clsx";
import { useLoginMutation } from "@/app/api";
import { useAppDispatch } from "@/app/store";
import { setUser } from "@/app/store/auth-slice";

export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(LoginSchema),
        mode: "onSubmit",
    });

    const [login, { isError, isLoading, isSuccess, data }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const result = await login(data).unwrap();
            reset();
            dispatch(setUser(result.user));
            setTimeout(() => navigate("/"), 1000);
        } catch (error) {
            console.error("Ошибка входа:", error);
        }
    };

    return (
        <section className={clsx(styles["login"], "form-container")}>
            <h1>вход</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles["login__form"]}
            >
                <FieldInput
                    registration={register("email")}
                    label="Введите email"
                    error={errors.email?.message as string | undefined}
                    type="email"
                />
                <FieldInput
                    registration={register("password")}
                    label="Введите password"
                    error={errors.password?.message as string | undefined}
                    type="password"
                />
                <Button type="submit" text={"войти"} disabled={isSubmitting} />
            </form>
            <div className={styles["login__create-user"]}>
                Нет аккаунта? <Link to="/register">Создать</Link>
            </div>
            {isLoading && <Loader />}
            {isError && <p style={{ color: "red" }}>{data?.message}</p>}
            {isSuccess && <p style={{ color: "green" }}>{data?.message}</p>}
        </section>
    );
};

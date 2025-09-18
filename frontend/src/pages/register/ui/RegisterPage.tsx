import { Button, FieldInput, Loader } from "@/shared/ui";
import { useForm } from "react-hook-form";
import {
    type RegisterFormValue,
    RegisterSchema,
} from "../model/schema-register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUserMutation } from "@/app/api";
import type { UserType } from "@/shared/types";
import { useNavigate } from "react-router";

export const RegisterPage = () => {
    const [createUser, { isLoading, isError, isSuccess, data }] =
        useCreateUserMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValue>({
        resolver: zodResolver(RegisterSchema),
        mode: "onSubmit",
    });
    const navigate = useNavigate();

    const onSubmit = async (data: RegisterFormValue) => {
        const newUser: UserType = {
            name: data.name,
            email: data.email,
            password: data.password,
        };
        try {
            await createUser(newUser).unwrap();
            reset();
            setTimeout(() => navigate("/"), 1000);
        } catch (error) {
            console.log("Ошибка регистрации: ", error);
        }
    };

    return (
        <section className="register form-container">
            <h1>регистрация</h1>
            <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
                <FieldInput
                    label="Ваше Имя"
                    registration={register("name")}
                    error={errors.name?.message}
                />
                <FieldInput
                    label="Ваше email"
                    registration={register("email")}
                    error={errors.email?.message}
                    type="email"
                />
                <FieldInput
                    label="Придумайте пароль"
                    registration={register("password")}
                    error={errors.password?.message}
                    type="password"
                />
                <FieldInput
                    label="Повторите пароль"
                    registration={register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                    type="password"
                />
                <Button
                    text="регистрация"
                    type="submit"
                    disabled={isSubmitting}
                />
            </form>
            {isLoading && <Loader />}
            {isError && <p style={{ color: "red" }}>{data?.message}</p>}
            {isSuccess && <p style={{ color: "green" }}>{data?.message}</p>}
        </section>
    );
};

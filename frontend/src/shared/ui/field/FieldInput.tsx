import type { UseFormRegisterReturn } from "react-hook-form";
import styles from "./FieldInput.module.scss";

type FieldInputProps = {
    label: string;
    error?: string;
    registration: UseFormRegisterReturn;
    type?: "email" | "password" | "text" | "textarea";
};

export const FieldInput = ({
    label,
    error,
    registration,
    type = "text",
}: FieldInputProps) => {
    return (
        <div className={styles["field"]}>
            <label className={styles["field__label"]}>
                {label}
                {type === "textarea" ? (
                    <textarea
                        {...registration}
                        className={styles["field__input"]}
                    />
                ) : (
                    <input
                        {...registration}
                        type={type}
                        className={styles["field__input"]}
                    />
                )}
            </label>
            {error && <span className={styles["field__error"]}>{error}</span>}
        </div>
    );
};

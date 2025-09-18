import clsx from "clsx";
import styles from './Button.module.scss';

type ButtonProps = {
    type?: "submit" | "button";
    variant?: "default" | "primary";
    text: string;
    handleClick?: () => void;
    disabled?: boolean;
};

export const Button = ({
    type = "button",
    variant='default',
    text,
    handleClick,
    disabled,
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={clsx(
                styles["btn"],
                variant && styles[`btn--${variant}`]
            )}
            onClick={handleClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

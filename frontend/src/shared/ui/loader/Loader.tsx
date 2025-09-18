import styles from "./Loader.module.scss";
import clsx from "clsx";

export type LoaderSize = "small" | "medium" | "large" | "fill";
export type LoaderVariant = "spinner" | "dots" | "skeleton";

export interface AdaptiveLoaderProps {
    variant?: LoaderVariant;
    size?: LoaderSize;
    className?: string;
    ariaLabel?: string;
}

export const Loader = ({
    variant = "spinner",
    size = "medium",
    className,
    ariaLabel = "Loading",
}: AdaptiveLoaderProps) => {
    const rootClass = clsx(
        styles.root,
        styles[variant],
        styles[size],
        className
    );

    if (variant === "spinner") {
        return (
            <div className={rootClass} role="status" aria-label={ariaLabel}>
                <svg className={styles.svg} viewBox="22 22 44 44" aria-hidden>
                    <circle
                        className={styles.path}
                        cx="44"
                        cy="44"
                        r="20.2"
                        fill="none"
                        strokeWidth="3.6"
                    />
                </svg>
            </div>
        );
    }

    if (variant === "dots") {
        return (
            <div className={rootClass} role="status" aria-label={ariaLabel}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
            </div>
        );
    }

    // skeleton
    return (
        <div className={rootClass} role="status" aria-label={ariaLabel}>
            <div className={styles.skelBlock} />
        </div>
    );
};


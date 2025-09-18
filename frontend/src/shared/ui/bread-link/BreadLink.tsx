import { PATH_LABELS } from "@/shared/constatns";
import { capitalizeFirstLetter } from "@/shared/utils";
import { useLocation } from "react-router";
import { NavLink } from "react-router";
import styles from "./BreadLink.module.scss";
import clsx from "clsx";

export const BreadLinks = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const segments = pathname.split("/").filter(Boolean);
    const crumbs = segments.map((segment, i) => {
        const path = "/" + segments.slice(0, i + 1).join("/");
        const label = capitalizeFirstLetter(PATH_LABELS[segment]) || segment;

        return {
            path,
            label,
        };
    });
    return (
        <section className={styles["bread-links"]}>
            <div className="container">
                <nav className={styles["bread-list"]}>
                    <NavLink
                        to="/"
                        children="Главная"
                        className={styles["bread-list__item"]}
                    />
                    {crumbs.length &&
                        crumbs.map(({ path, label }, i) => (
                            <NavLink
                                to={path}
                                children={label}
                                key={i}
                                className={({ isActive }) =>
                                    clsx(
                                        styles["bread-list__item"],
                                        isActive
                                            ? styles[`bread-list__item--active`]
                                            : ""
                                    )
                                }
                            />
                        ))}
                </nav>
            </div>
        </section>
    );
};

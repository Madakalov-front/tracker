import { capitalizeFirstLetter } from "@/shared/utils";
import { Link } from "react-router";
import styles from "./NavList.module.scss";

type NavListDataType = {
    name: string;
    href: string;
};

export const NavList = () => {
    const dataNavList: NavListDataType[] = [
        // {
        //     name: "Мои проекты",
        //     href: "/my-projects",
        // },
        // {
        //     name: "проекты",
        //     href: "/projects",
        // },
        {
            name: "Мои задачи",
            href: "/my-tasks",
        },
    ];
    return (
        <nav className={styles["nav-list"]}>
            {dataNavList && dataNavList.length ? (
                dataNavList.map(({ name, href }, idx) => (
                    <Link
                        to={href}
                        className={styles["nav-list__link"]}
                        key={idx}
                    >
                        {capitalizeFirstLetter(name)}
                    </Link>
                ))
            ) : (
                <p>Навигация временно не доступна</p>
            )}
        </nav>
    );
};

import { Outlet } from "react-router";
import styles from "../styles/AuthLayout.module.scss";
import { BackHome } from "@/shared/ui";

export const AuthLayout = () => {
    return (
        <main className={styles["auth-layout"]}>
            <BackHome />
            <Outlet />
        </main>
    );
};

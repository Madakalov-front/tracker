import { Link } from "react-router";
import styles from "./BackHome.module.scss";

export const BackHome = () => {
    return (
        <Link to="/" className={styles["back-home"]}>
            на главную
        </Link>
    );
};

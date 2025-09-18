import { Link } from "react-router";
import { AvatarUser } from "@/shared/ui";

import styles from "./UserLogin.module.scss";

export const UserLogin = ({name}: {name: string}) => {
    return (
        <div className={styles["user-login"]}>
            <AvatarUser />
            <Link to="/profile" className={styles["user-login__name"]}>{name}</Link>
        </div>
    );
};

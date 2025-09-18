import { Link } from "react-router";
import styles from "./CreateEntity.module.scss";
import { capitalizeFirstLetter } from "@/shared/utils";

type CreateEntityProps = {
    path: string;
    label: string;
};

export const CreateEntity = ({ path, label }: CreateEntityProps) => {
    return (
        <Link to={path} className={styles["add-task"]} title={`добавить ${label}`}>
            <svg className={styles["add-task__svg"]}>
                <use href="#icon-plus"></use>
            </svg>
            <span>{capitalizeFirstLetter(label)}</span>
        </Link>
    );
};

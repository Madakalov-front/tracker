import { FormSearch } from "./includes";

import styles from './Search.module.scss';

export const Search = () => {
    return (
        <div className={styles["field-search"]}>
            <FormSearch />
        </div>
    );
};

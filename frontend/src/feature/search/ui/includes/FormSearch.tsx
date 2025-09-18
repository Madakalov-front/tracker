import styles from "./FormSearch.module.scss";

export const FormSearch = () => {
    return (
        <form action="/" className={styles["from-search"]}>
            <button type="submit" className={styles["from-search__btn"]}>
                <svg className={styles["from-search__icon"]}>
                    <use href="#icon-search"></use>
                </svg>
            </button>
            <input
                type="search"
                className={styles["from-search__input"]}
                placeholder="Начните поиск..."
            />
            <button type="button" className={styles["from-search__clear"]}>
                очистить
            </button>
        </form>
    );
};

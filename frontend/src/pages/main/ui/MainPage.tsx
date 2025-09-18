import styles from "./MainPage.module.scss";

export const MainPage = () => {
    return (
        <main className={styles.mainPage}>
            <div className={styles.container}>
                <section className={styles.thankYouSection}>
                    <h1 className={styles.title}>
                        Благодарность за курс "Junior Frontend Developer"
                    </h1>
                    <p className={styles.paragraph}>
                        Хочу выразить искреннюю благодарность команде Result
                        School за качественное и структурированное обучение.
                    </p>
                    <p className={styles.paragraph}>
                        Особую признательность хочу выразить моему наставнику,{" "}
                        <strong>Антону Мацкевичу</strong>, за его
                        профессионализм, терпение и поддержку на протяжении
                        всего курса.
                    </p>
                    <p className={styles.paragraph}>
                        Благодаря этому курсу я приобрел необходимые навыки и
                        уверенность для начала карьеры в frontend-разработке.
                    </p>
                </section>
            </div>
        </main>
    );
};

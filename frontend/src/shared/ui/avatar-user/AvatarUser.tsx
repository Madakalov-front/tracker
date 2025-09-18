import styles from './AvatarUser.module.scss';


export type AvatarUserProps = {
    img_url: string;
    char_name: string;
};

export const AvatarUser = () => {
    const avatar = {
        img_url: '',
        // img_url: 'https://storage.yandexcloud.net/storage.yasno.media/nat-geo/images/2020/6/25/0fc978aba29e466e8eb4ffc946532d5e.max-1200x800.jpg',
        char_name: 'E'
    }
    const { img_url, char_name } = avatar;
    
    return (
        <div className={styles["avatar-user"]}>
            {img_url ? (
                <img
                    src={`https://storage.yandexcloud.net/storage.yasno.media/nat-geo/images/2020/6/25/0fc978aba29e466e8eb4ffc946532d5e.max-1200x800.jpg`}
                    alt={img_url}
                    className={styles["avatar-user__img"]}
                />
            ) : (
                <span className={styles["avatar-user__char"]}>{char_name}</span>
            )}
        </div>
    );
};

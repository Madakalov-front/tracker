import { Button, Logo } from "@/shared/ui";
import {  UserLogin } from "@/feature";
import { CreateEntity } from "@/entities/create-entity";

import styles from "./Header.module.scss";
import { NavList } from "@/entities/nav-list";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useLazyGetMeQuery } from "@/app/api";
import { logout, setUser } from "@/app/store/auth-slice";
import { useEffect } from "react";

export const Header = () => {
    const navigate = useNavigate();
    const name = useAppSelector((store) => store.auth.user?.name);
    const dispatch = useAppDispatch();
    const [getMe] = useLazyGetMeQuery();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await getMe().unwrap();
                dispatch(setUser(user));
            } catch {
                dispatch(logout());
            }
        };

        checkAuth();
    }, [getMe, dispatch]);
    
    return (
        <header className={styles["header"]}>
            <div className="container">
                <div className={styles["header__inner"]}>
                    <Logo />
                    <div className={styles["header__actions"]}>
                        {/* <Search /> */}
                        <CreateEntity path="/create-task" label="задача" />
                        {/* <CreateEntity path="/create-project" label="проект" /> */}
                        <NavList />
                        {name ? (
                            <UserLogin name={name} />
                        ) : (
                            <Button
                                text="войти"
                                handleClick={() => navigate("/login")}
                            />
                        )}
                        {/*   */}
                    </div>
                </div>
            </div>
        </header>
    );
};

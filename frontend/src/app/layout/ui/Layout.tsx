import { Footer, Header } from "@/widgets";
import { Outlet } from "react-router-dom";

export const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />           
            <Footer />
        </>
    );
};

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./app";
import { CreateTaskPage, MainPage, MyTasksPage, NotFound } from "./pages";

import "./assets/style/index.scss";
import { AuthLayout } from "./app/layout";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { DetailTask } from "./pages/detail-task/ui/DetailTask";

createRoot(document.body!).render(
    <StrictMode>
        <Provider store={store}>
             <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route element={<MainPage />} index />
                    <Route path="/my-tasks" element={<MyTasksPage />} />
                    <Route path="/task/:id" element={<DetailTask />} />
                    <Route path="/create-task" element={<CreateTaskPage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
       </Provider>
    </StrictMode>
);

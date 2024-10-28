import React from 'react'
import {
    createBrowserRouter,
    Outlet,
} from "react-router-dom";
import MainPage from "../pages/MainPage"
import ListNewToken from '../components/listNewToken/ListNewToken';

const Layout = () => {
    return (
        <>
            <ListNewToken />
            <Outlet />
        </>
    );
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <MainPage />
            }
        ]
    },
]);
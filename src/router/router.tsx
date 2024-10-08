import React from 'react'
import {
    createBrowserRouter,
} from "react-router-dom";
import {Metamask} from "../components/Wallet/Metamask"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Metamask/>,
    },
]);
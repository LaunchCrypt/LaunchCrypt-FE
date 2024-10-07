import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world!</div>,
    },
]);
import React from 'react'
import {
    createBrowserRouter,
    Outlet,
} from "react-router-dom";
import MainPage from "../pages/MainPage"
import Navbar from '../components/navbar/Navbar';
import IntellectualProperty from '../components/common/IntellectualProperty';
import ListNewToken from '../components/listNewToken/ListNewToken'; // Adjust the path as necessary
import SwapPage from '../pages/SwapPage';
import TradingPage from '../pages/TradingPage';
import StatsPage from '../pages/StatsPage';
import UserProfile from '../pages/UserProfile';
import StakingPage from '../pages/StakingPage';
import SwapExternalTokenPage from '../pages/SwapExternalTokenPage';

const Layout = () => {
    return (
        <div className='w-full h-full'>
            <div className='flex flex-col align-middle items-center'>
                <Navbar />
                <IntellectualProperty />
                <ListNewToken />
            </div>
            <Outlet />
        </div>
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
            },
            {
                path: "/stake",
                element: <StakingPage/>
            },
            {
                path: "/swap",
                element: <SwapPage/>
            },
            {
                path: "/trade/:liquidityPairId",
                element: <TradingPage/>
            },
            {
                path: "/swap-external/:tradingPairId",
                element: <SwapExternalTokenPage/>
            },
            {
                path: "/stats",
                element: <StatsPage/>
            },
            {
                path: "/profile",
                element: <UserProfile/>
            }
        ]
    },
]);
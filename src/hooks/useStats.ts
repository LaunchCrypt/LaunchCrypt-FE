import { useEffect, useState } from "react";
import { axiosInstance } from "../apis/api";
import { GET_API } from "../apis/GET/getApis";

export const useStats = () => {
    const [totalValueLocked, setTotalValueLocked] = useState(0);
    const [totalSwap, setTotalSwap] = useState(0);
    const [uniqueUser, setUniqueUser] = useState(0);
    const [tradingVolumeData, setTradingVolumeData] = useState([]);
    const [userTableData, setUserTableData] = useState([]);

    const fetchStats = async () => {
        const response = await axiosInstance.get(GET_API.GET_STATS());
        const data = response.data;
        setTotalValueLocked(data.totalLockValue);
        setTotalSwap(data.totalSwap);
        setUniqueUser(data.totalUser);
        setTradingVolumeData(data.last30DayTradingVolume);
    }

    const fetchUserTableData = async () => {
        const response = await axiosInstance.get(GET_API.GET_USER_TABLE_DATA());
        const data = response.data;
        setUserTableData(data);
    }

    useEffect(() => {
        fetchStats();
        fetchUserTableData();
    }, [])

    return {
        totalValueLocked,
        totalSwap,
        uniqueUser,
        tradingVolumeData,
        userTableData,
        fetchStats,
        fetchUserTableData
    }
}

export default useStats



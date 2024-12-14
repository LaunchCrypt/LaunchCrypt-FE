import { useEffect, useCallback, useState } from "react";
import { useSelector} from "react-redux";
import { io, Socket } from "socket.io-client";

export const userTrade = (liquidityPairId:string){
    const [socket, setSocket] = useState<Socket | null>(null);
    const [trades, setTrades] = useState<any[]>([]);
    const 
}
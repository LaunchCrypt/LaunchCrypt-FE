import { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

export const userTrade = (liquidityPairId: string, tokenId: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [trades, setTrades] = useState<any[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstance = io("http://localhost:3000/trade", {
            transports: ['websocket', 'polling']
        });

        socketInstance.on('connect', () => {
            console.log('Socket connected tp Trade');
            setIsConnected(true);
            socketInstance.emit('trade:joinRoom', { liquidityPairId, tokenId });
        });

        socketInstance.on('disconnect', () => {
            console.log('Socket disconnected');
            setIsConnected(false);
        });

        socketInstance.on('previousTrades', (previousTrades: any[]) => {
            console.log('Received previous trades:', previousTrades);
            setTrades(previousTrades);
        });

        socketInstance.on('newTrade', (trade: any) => {
            console.log('Received new trade:', trade);
            setTrades(prev => [trade, ...prev]);
        });

        setSocket(socketInstance);

        return () => {
            if (socketInstance) {
                socketInstance.emit('trade:leaveRoom', liquidityPairId);
                socketInstance.disconnect();
            }
        }
    }, [liquidityPairId])

    return {
        trades,
        isConnected
    }
}
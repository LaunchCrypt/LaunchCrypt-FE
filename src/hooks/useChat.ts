import { useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import { IMessage } from '../interfaces';

export const useChat = (liquidityPairId: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const userAddress = useSelector((state: any) => state.user.address);

    useEffect(() => {
        // Initialize socket connection
        const socketInstance = io('http://localhost:3000/chat', {
            transports: ['websocket', 'polling']
        });

        // Connection event handlers
        socketInstance.on('connect', () => {
            console.log('Socket connected');
            setIsConnected(true);
            // Join room after connection
            socketInstance.emit('chat:joinRoom', liquidityPairId);
        });

        socketInstance.on('disconnect', () => {
            console.log('Socket disconnected');
            setIsConnected(false);
        });

        // Message event handlers
        socketInstance.on('previousMessages', (previousMessages: IMessage[]) => {
            setMessages(previousMessages);
        });

        socketInstance.on('newMessage', (message: IMessage) => {
            setMessages(prev => [message, ...prev]);
        });

        socketInstance.on('messageLoved', ({ messageId, loveCount }) => {
            setMessages(prev => prev.map(msg =>
                msg.id === messageId ? { ...msg, loveCount } : msg
            ));
        });

        setSocket(socketInstance);

        // Cleanup on unmount
        return () => {
            if (socketInstance) {
                socketInstance.emit('chat:leaveRoom', liquidityPairId);
                socketInstance.disconnect();
            }
        };
    }, [liquidityPairId]);

    // Message actions
    const sendMessage = useCallback((message: string, creator: string, parentId?: string) => {
        if (userAddress == "") {
            console.log('User not connected');
            return
        }
        if (socket && isConnected) {
            socket.emit('postMessage', {
                liquidityPairId,
                message,
                creator,
                parentId
            });
        }
    }, [socket, isConnected, liquidityPairId]);

    const loveMessage = useCallback((messageId: string) => {
        if (socket && isConnected) {
            socket.emit('loveMessage', messageId);
        }
    }, [socket, isConnected]);

    return {
        messages,
        sendMessage,
        loveMessage,
        isConnected
    };
};
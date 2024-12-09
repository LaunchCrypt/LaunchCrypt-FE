import io from 'socket.io-client';
import { BACKEND_URL } from '../constant';

export const socketInstance = io(BACKEND_URL,{
    transports: ['websocket', 'polling'],
    autoConnect: true,
    reconnection: true,
    timeout: 10000,
});


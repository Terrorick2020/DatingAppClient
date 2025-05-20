import { io, Socket } from 'socket.io-client';
import { WS_URL } from './env.config';


let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(WS_URL, {
        autoConnect: false,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ['websocket'],
    });
  }
  return socket;
};

export const connectSocket = () => {
  const s = getSocket();
  if (!s.connected) s.connect();
};

export const disconnectSocket = () => {
  const s = getSocket();
  if (s.connected) s.disconnect();
};

export const joinRoom = (roomId: string) => {
  const s = getSocket();
  s.emit('joinRoom', roomId);
};

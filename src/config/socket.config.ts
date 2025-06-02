import { io, Socket } from 'socket.io-client';
import { WS_URL } from './env.config';


const sockets: Record<string, Socket> = {};

export const connectToNamespace = (namespace: string): Socket => {
  if (!sockets[namespace]) {
    const socket = io(`${WS_URL}/${namespace}`, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket'],
    });

    sockets[namespace] = socket;
  }

  const socket = sockets[namespace];
  if (!socket.connected) socket.connect();

  return socket;
};

export const disconnectFromNamespace = (namespace: string) => {
  const socket = sockets[namespace];
  
  if (socket && socket.connected) {
    socket.disconnect();
  }
};

export const getNamespaceSocket = (namespace: string): Socket | undefined => {
  return sockets[namespace];
};

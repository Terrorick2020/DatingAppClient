import {
  ServerMethods,
  type ReqConnectionDto,
  type ResConnectionDto,
} from '@/types/socket.types';

import {
  WS_URL,
  BASE_URL,
  WS_COMPL,
  WS_MATCH,
  WS_CHATS,
  WS_LIKES
} from './env.config';

import { io, Socket } from 'socket.io-client';


const sockets: Record<string, Socket> = {};

export const defNamespaces = [WS_COMPL, WS_MATCH, WS_CHATS, WS_LIKES];

export const connectToNamespace = async (namespace: string, isApi?: boolean): Promise<Socket> => {
  if (!sockets[namespace]) {
    const socket = io(`${isApi ? BASE_URL : WS_URL}/${namespace}`, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket'],
    });

    sockets[namespace] = socket;
  }

  const socket = sockets[namespace];

  return new Promise((resolve, reject) => {
    if (socket.connected) return resolve(socket);

    socket.connect();

    const timeout = setTimeout(() => {
      reject(new Error('Socket connection timeout'));
    }, 5000); // таймаут подключения, например 5 сек

    socket.once('connect', () => {
      clearTimeout(timeout);
      resolve(socket);
    });

    socket.once('connect_error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
};

export const disconnectFromNamespace = async (namespace: string): Promise<void> => {
  const socket = sockets[namespace];
  
  if (socket && socket.connected) {
    socket.removeAllListeners();
    socket.disconnect();
    delete sockets[namespace];
  }
};

export const getNamespaceSocket = (namespace: string): Socket | undefined => {
  return sockets[namespace];
};

export const connectSocketRoom = (
  namespace: string,
  connectType: ServerMethods,
  data: ReqConnectionDto,
): Promise<ResConnectionDto | null> => {
  const socket: Socket = sockets[namespace];

  if (!socket) return Promise.resolve(null);

  return new Promise((resolve) => {
    socket.emit(connectType, data, (response: ResConnectionDto) => {
      resolve(response);
    });
  });
};

export async function handleSocket<TData>(
    socket: Socket | undefined,
    chanel:string,
    callback: (data: TData | null) => void,
): Promise<void> {
  if(socket === undefined) return;

  if(!socket.connected) {
      socket.once('connect', () => {
          socket.on(chanel, callback);
      });
  } else {
      socket.on(chanel, callback);
  }
};

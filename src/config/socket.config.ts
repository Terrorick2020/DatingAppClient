import {
  ServerMethods,
  type ReqConnectionDto,
  type ResConnectionDto,
} from '@/types/socket.types';

import {
  WS_URL,
  WS_COMPL,
  WS_MATCH,
  WS_CHATS,
  WS_LIKES,
} from './env.config';

import { io, Socket } from 'socket.io-client';


const sockets: Record<string, Socket> = {};

export const defNamespaces = [WS_COMPL, WS_MATCH, WS_CHATS, WS_LIKES];

export const connectToNamespace = async (namespace: string): Promise<Socket> => {
  if (sockets[namespace]?.connected) return sockets[namespace];

  const socket = io(`${WS_URL}/${namespace}`, {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ['websocket'],
  });

  return new Promise((resolve, reject) => {
    socket.connect();

    const timeout = setTimeout(() => {
      reject(new Error('Socket connection timeout'));
    }, 5000);

    socket.once('connect', () => {
      clearTimeout(timeout);
      sockets[namespace] = socket;
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

export const connectSocketRoom = async (
  namespace: string,
  connectType: ServerMethods,
  data: ReqConnectionDto,
  timeoutMs = 5000,
): Promise<ResConnectionDto | null> => {
  let socket: Socket | undefined = undefined;
  socket = sockets[namespace];

  if (socket === undefined) {
    socket = await waitForSocketConnection(() => getNamespaceSocket(namespace));
  };

  if (!socket || !socket.connected) return Promise.resolve(null);

  return new Promise((resolve) => {
    let isResolved = false;

    const timeout = setTimeout(() => {
      if (!isResolved) {
        isResolved = true;
        resolve(null);
      }
    }, timeoutMs);

    socket.emit(connectType, data, (response: ResConnectionDto) => {
      if (!isResolved) {
        isResolved = true;
        clearTimeout(timeout);
        resolve(response);
      }
    });
  });
};

export const waitForSocketConnection = (
    getSocket: () => Socket | undefined,
    maxAttempts = 10,
    interval = 300
): Promise<Socket | undefined> => {
    return new Promise((resolve, _) => {
        let attempts = 0;

        const check = () => {
            const socket = getSocket();
            if (socket && socket.connected) {
                return resolve(socket);
            }

            if (++attempts >= maxAttempts) {
                return resolve(undefined);
            }

            setTimeout(check, interval);
        };

        check();
    });
};

export async function handleSocket<TData>(
    socket: Socket | undefined,
    channel:string,
    callback: (data: TData | null) => void,
): Promise<void> {
  if(socket === undefined) return;

  socket.off(channel, callback);

  const subscribe = () => {
    socket.on(channel, callback);
  };

  if(!socket.connected) {
    socket.once('connect', subscribe);
  } else {
    subscribe();
  }
};

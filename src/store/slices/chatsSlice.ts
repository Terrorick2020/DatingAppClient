import type {
    ChatsState,
    ChatsCtx,
    TargetChat,
    ChatInterlocutor,
    IncomingMsg,
    TargetChatDay,
    GetChatByIdArgs,
    ChatsListItem,
} from '@/types/chats.types';

import {
    CHATS_ENDPOINT,
    CHATS_METADATA_ENDPOINT,
    CHATS_MSG_ENDPOINT,
    CHATS_DEL_ENDPOINT,
    USER_ENDPOINT,
    CHATS_TYPING_ENDPOINT,
    CHATS_ADD_MSG_ENDPOINT,
    CHATS_READ_ENDPOINT,
    CHATS_UNREAD_ENDPOINT,
} from '@/config/env.config';

import {
    ELineStatus,
    type AsyncThunkRes,
    type IState,
} from '@/types/store.types';

import type {
    FetchResponse,
    ChatMetaRes,
    ChatMsgRes,
    TargetUserEndpointRes,
    ChatItemRes,
} from '@/types/fetch.type';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addMessageToChat, isMsgInChatDialog, markMessagesAsRead } from '@/funcs/chats.funcs';
import { EApiStatus } from '@/types/settings.type';
import { setLoad, setBadge, setApiRes } from './settingsSlice';
import type { OnResReadMsg, OnResNewMsg } from '@/types/socket.types';
import type { AxiosResponse } from 'axios';

import api from '@/config/fetch.config';


const initialState: ChatsState = {
    chatsFavList: [],
    chatsList: [],
    targetChat: {
        id: '',
        timer: null,
        interlocutor: null,
        chatDialog: [],
    },
}

export const getUnreadChatsAsync = createAsyncThunk(
    'chats/get-unread-chats',
    async (_, { getState, dispatch }): Promise<AsyncThunkRes<string[]>> => {
        try {
            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;

            const url = CHATS_UNREAD_ENDPOINT(telegramId);

            const response: AxiosResponse<FetchResponse<string[]>> = await api.get(url);

            if(
                response.status !== 200 ||
                !response.data.success  ||
                !response.data.data     ||  
                response.data.data === 'None'
            ) return null;

            const data = response.data.data;
            const badgeCtx = rootState.settings.badge;
            const content = Array.isArray(data) ? data.length : 0;

            dispatch(setBadge({
                ...badgeCtx,
                chats: {
                    value: true,
                    content,
                }
            }));

            return response.data.data;
        } catch (error) {
            return 'error';
        }
    }
);

export const initChatsCtxAsync = createAsyncThunk(
    'chats/init-chats-ctx',
    async (_, {dispatch, getState}): Promise<AsyncThunkRes<ChatsCtx>> => {
        try {
            dispatch(setLoad(true));

            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;

            const chatsRes: AxiosResponse<FetchResponse<ChatItemRes[]>> = 
                await api.get(`${CHATS_ENDPOINT}?telegramId=${telegramId}`);

            if(
                chatsRes.status !== 200 ||
                !chatsRes.data.success  ||
                !chatsRes.data.data     ||
                chatsRes.data.data === 'None'
            ) return null;

            const chatsCtx: ChatsCtx = {
                chatsFavList: [],
                chatsList: [],
            };

            const now = Date.now();

            const sortedData = chatsRes.data.data.slice().sort((a, b) => {
                if (b.unread_count !== a.unread_count) {
                    return b.unread_count - a.unread_count;
                }
                return a.created_at - b.created_at;
            });

            for(let item of sortedData) {
                const expiresAt = item.created_at + 24 * 60 * 60 * 1000;
                const remainingMs = expiresAt - now;

                chatsCtx.chatsList.push({
                    id: item.chatId,
                    avatar: item.toUser.avatarUrl,
                    name: item.toUser.name,
                    age: item.toUser.age,
                    lastMsg: item.lastMsg ? item.lastMsg : 'Сообщений пока нет! Начните общение первым(ой)',
                    timer: Math.max(0, Math.floor(remainingMs / 1000)),
                    unreadMsgsCount: item.unread_count,
                })
            }

            chatsCtx.chatsList.sort((a, b) => {
                if (b.unreadMsgsCount !== a.unreadMsgsCount) {
                    return b.unreadMsgsCount - a.unreadMsgsCount;
                };

                return a.timer - b.timer;
            });

            return chatsCtx;
        } catch (error) {
            return 'error';
        } finally {
            dispatch(setLoad(false));
        }
    }
);

export const socketNewMsgInToChats = createAsyncThunk(
  'chats/socket-new-msg-in-to-chats',
  async (
    data: OnResNewMsg,
    { getState }
  ): Promise<AsyncThunkRes<ChatsListItem[]>> => {
    try {
      const rootState = getState() as IState;
      const chatsList = rootState.chats.chatsList;

      const updatedChats = chatsList.map(chat =>
        chat.id === data.chatId
          ? {
              ...chat,
              unreadMsgsCount: chat.unreadMsgsCount + 1,
              lastMsg: data.text,
              timer: data.timestamp,
            }
          : chat
      );

      const updatedChat = updatedChats.find(chat => chat.id === data.chatId);

      if (!updatedChat) return null;

      const reorderedChats = [
        updatedChat,
        ...updatedChats.filter(chat => chat.id !== data.chatId),
      ];

      return reorderedChats;
    } catch {
      return 'error';
    }
  }
);

export const getChatByIdAsync = createAsyncThunk(
    'chats/get-chat-by-id',
    async (args: GetChatByIdArgs, { dispatch, getState }): Promise<AsyncThunkRes<TargetChat>> => {
        try {
            dispatch(setLoad(true));

            if( !args.id ) return 'error';

            const metaEndpoint = CHATS_METADATA_ENDPOINT(args.id);
            const dialogEndpoint = CHATS_MSG_ENDPOINT(args.id, args.query.limit, args.query.offset);

            const chatMetaRes: AxiosResponse<FetchResponse<ChatMetaRes>> = await api.get(metaEndpoint);

            if (
                chatMetaRes.status !== 200 ||
                !chatMetaRes.data.success  ||
                !chatMetaRes.data.data     ||
                chatMetaRes.data.data === 'None'
            ) return null;

            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;
            const interId: string | undefined = chatMetaRes.data.data.participants.find(
                (item: string) => item !== telegramId
            );

            if(!interId) return null;

            const readedData = {
                chatId: args.id,
                userId: telegramId,
                lastReadMessageId: chatMetaRes.data.data.last_message_id,
            };

            const needingReaded = !!chatMetaRes.data.data.last_message_id;

            const [interRes, readedMsgsRes]:[
                AxiosResponse<FetchResponse<TargetUserEndpointRes>>,
                AxiosResponse<FetchResponse<boolean>> | undefined,
            ] = await Promise.all([
                api.get(`${USER_ENDPOINT}/${interId}`),
                needingReaded ? api.patch(CHATS_READ_ENDPOINT, readedData) : undefined,
            ])

            if (
                interRes.status !== 200       ||
                !interRes.data.success        ||
                !interRes.data.data           ||
                interRes.data.data === 'None' ||
                
                readedMsgsRes !== undefined && (
                    readedMsgsRes.status !== 200 ||
                    !readedMsgsRes.data.success  ||
                    !readedMsgsRes.data.data
                )

            ) return null;

            const chatDialogRes: AxiosResponse<FetchResponse<ChatMsgRes[]>> = await api.get(dialogEndpoint);

            if (
                chatDialogRes.status !== 200 ||
                !chatDialogRes.data.success  ||
                !chatDialogRes.data.data     || 
                chatDialogRes.data.data === 'None'
            ) return null;

            const promtLineStat: ELineStatus | boolean = interRes.data.data.isOnline;
            let lineStat: ELineStatus | null = null;

            if(typeof promtLineStat === 'boolean') {
                lineStat = promtLineStat ? ELineStatus.Online : ELineStatus.Offline;
            } else {
                lineStat = promtLineStat;
            }

            const interlocutor: ChatInterlocutor = {
                id: interRes.data.data.telegramId,
                avatar: interRes.data.data.photos[0].url,
                name: interRes.data.data.name,
                age: interRes.data.data.age,
                lineStat,
            };

            let chatDialog: TargetChatDay[] = [];

            for(let item of chatDialogRes.data.data) {
                const incommingMsg: IncomingMsg =  {
                    chatId: item.chatId,
                    created_at: item.created_at,
                    fromUser: item.fromUser,
                    id: item.id,
                    is_read: item.is_read,
                    text: item.text,
                    updated_at: item.updated_at,
                };

                chatDialog = addMessageToChat(chatDialog, incommingMsg, interlocutor.id);
            }

            const now = Date.now();
            const expiresAt = chatMetaRes.data.data.created_at + 24 * 60 * 60 * 1000;
            const remainingMs = expiresAt - now;

            const timer = Math.max(0, Math.floor(remainingMs / 1000));

            return {
                id: args.id,
                timer,
                interlocutor,
                chatDialog,
            }
        } catch (error) {
            return 'error';
        } finally {
            dispatch(setLoad(false));
        }
    }
);

export const getDopDialogMsgs = createAsyncThunk(
    'chats/get-dialog-msgs',
    async (args: GetChatByIdArgs, { getState }): Promise<AsyncThunkRes<TargetChatDay[] | 'None'>> => {
        try {
            if(!args.id) return 'error';

            const dialogEndpoint = CHATS_MSG_ENDPOINT(args.id, args.query.limit, args.query.offset);

            const response: AxiosResponse<FetchResponse<ChatMsgRes[]>> = await api.get(dialogEndpoint);

            if (
                response.status !== 200       ||
                !response.data.success        ||
                !response.data.data           || 
                response.data.data === 'None'
            ) return null;

            if(!response.data.data.length) return 'None';

            const rootState = getState() as IState;
            const interlocator = rootState.chats.targetChat.interlocutor

            if(!interlocator) return 'error';

            let chatDialog: TargetChatDay[] = rootState.chats.targetChat.chatDialog;
            let count: number = 0;

            for(let item of response.data.data) {
                const isHas = isMsgInChatDialog(chatDialog, item.id);
                
                if(isHas) continue;

                const incommingMsg: IncomingMsg =  {
                    chatId: item.chatId,
                    created_at: item.created_at,
                    fromUser: item.fromUser,
                    id: item.id,
                    is_read: item.is_read,
                    text: item.text,
                    updated_at: item.updated_at,
                };

                chatDialog = addMessageToChat(chatDialog, incommingMsg, interlocator.id || 'recived', true);

                count++;
            };

            if(count === 0) {
                return 'None'
            };

            return chatDialog;
        } catch {
            return 'error';
        }
    }
);

export const deleteChatByIDAsync = createAsyncThunk(
    'chats/delete-chat-by-id',
    async (id: string): Promise<AsyncThunkRes<boolean>> => {
        try {
            if( !id ) throw new Error('Не передан id');

            const delEndpoint = CHATS_DEL_ENDPOINT(id);

            const response: AxiosResponse<FetchResponse<boolean>> = await api.delete(delEndpoint);

            if(
                response.status !== 200 ||
                !response.data.success  ||
                !response.data.data     ||
                response.data.data === 'None'
            ) return null;

            return true;
        } catch (error) {
            return 'error';
        }
    }
);

export const sendMsgAsync = createAsyncThunk(
    'chats/send-msg',
    async (text: string, { dispatch, getState }): Promise<AsyncThunkRes<TargetChatDay[]>> => {
        try {
            const rootState = getState() as IState;
            const chatId = rootState.chats.targetChat.id;
            const fromUser = rootState.profile.info.id;

            const data = { chatId, fromUser, text };

            const response: AxiosResponse<FetchResponse<any>> = await api.post(CHATS_ADD_MSG_ENDPOINT, data);

            if (
                response.status !== 201       ||
                !response.data.data           ||
                response.data.data === 'None' ||
                !response.data.success
            ) return null;

            const incommingMsg: IncomingMsg =  {
                chatId: response.data.data.chatId,
                created_at: response.data.data.created_at,
                fromUser: response.data.data.fromUser,
                id: response.data.data.id,
                is_read: response.data.data.is_read,
                text: response.data.data.text,
                updated_at: response.data.data.updated_at,
            }

            const interlocatorId = rootState.chats.targetChat.interlocutor?.id;
            const chatDialog = rootState.chats.targetChat.chatDialog;

            const newChatDialog = addMessageToChat(chatDialog, incommingMsg, interlocatorId || 'recived');

            return newChatDialog;
        } catch (error) {
            dispatch(setApiRes({
                value: true,
                msg: 'Сообщение не отправлено! Попробуйте позже',
                status: EApiStatus.Warning,
                timestamp: Date.now(),
            }));

            return 'error';
        }
    } 
);

export const getMsgAsync = createAsyncThunk(
    'chats/get-msg',
    async (data: OnResNewMsg, {getState}): Promise<AsyncThunkRes<TargetChatDay[]>> => {
        try {
            const rootState = getState() as IState;
            const userId = rootState.profile.info.id;

            const readedData = {
                chatId: data.chatId,
                userId,
                lastReadMessageId: data.messageId,
            };

            const response: AxiosResponse<FetchResponse<any>> = await api.patch(CHATS_READ_ENDPOINT, readedData);

            if (
                response.status !== 200 ||
                !response.data.success  ||
                !response.data.data
            ) return null;

            const incommingMsg: IncomingMsg = {
                chatId: data.chatId,
                fromUser: data.senderId,
                id: data.messageId,
                is_read: true,
                text: data.text,
                created_at: new Date().getTime(),
                updated_at: data.timestamp,
            }

            const newChatDialog = addMessageToChat(
                rootState.chats.targetChat.chatDialog,
                incommingMsg,
                data.senderId
            );

            return newChatDialog
        } catch (error: any) {
            return 'error'
        }
    }
);

export const setTypingStatAsync = createAsyncThunk(
    'chats/set-typing-stat',
    async (isTyping: boolean, {getState}): Promise<AsyncThunkRes<'success'>> => {
        try {
            const rootState = getState() as IState;
            const chatId = rootState.chats.targetChat.id;
            const userId = rootState.profile.info.id;

            const data = { chatId, userId, isTyping };

            const response: AxiosResponse<FetchResponse<any>> = await api.post(CHATS_TYPING_ENDPOINT, data);

            if(
                response.status === 201 &&
                response.data.success
            ) return 'success';

            return null;
        } catch (error) {
            return 'error'
        }
    } 
);

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        deleteFavChatById: (state, action: PayloadAction<string>): void => {
            state.chatsFavList = state.chatsFavList.filter(
                item => item.id === action.payload
            )
        },
        deleteChatById: (state, action: PayloadAction<string>): void => {
            state.chatsList = state.chatsList.filter(
                item => item.id === action.payload
            )
        },
        socketAddMsgInChat: (state, action: PayloadAction<IncomingMsg>): void => {
            const newDialog  = addMessageToChat(
                state.targetChat.chatDialog,
                action.payload,
                state.targetChat.interlocutor?.id || 'recived',
            );

            state.targetChat.chatDialog = newDialog;
        },
        markedReadedMsgs: (state, action: PayloadAction<OnResReadMsg>): void => {
            if(!action.payload.msgsId.length) return;

            state.targetChat.chatDialog = markMessagesAsRead(state.targetChat.chatDialog, action.payload.msgsId[0]);
        },
        setInterLineStatus: (state, action: PayloadAction<ELineStatus>): void => {
            if(state.targetChat.interlocutor?.lineStat) {
                state.targetChat.interlocutor.lineStat = action.payload;
            }
        },
        resetTargetChat: (state): void => {
            state.targetChat = {
                id: '',
                timer: null,
                interlocutor: null,
                chatDialog: [],
            };
        },
    },
    extraReducers: builder => {
        // Получение количества чатов в которых есть непрочитанные сообщения
        builder.addCase(getUnreadChatsAsync.pending, _ => {
            console.log("Получение чатов в которых есть непрочитанные сообщения");
        })
        builder.addCase(getUnreadChatsAsync.fulfilled, (_, action: PayloadAction<AsyncThunkRes<string[]>>) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получения чатов в которых есть непрочитанные сообщения");
                    break;
                case null:
                    console.log("Списки чатов в которых есть непрочитанные сообщения не получены");
                    break;
                default:
                    console.log("Успешное получение чатов в которых есть непрочитанные сообщения");
                    break;
            }
        })
        builder.addCase(getUnreadChatsAsync.rejected, _ => {
            console.log("Ошибка получения чатов в которых есть непрочитанные сообщения");
        })

        // Получение списков чатов и особых пользоватеоей
        builder.addCase(initChatsCtxAsync.pending, _ => {
            console.log("Получение списков чатов и особых пользоватеоей");
        })
        builder.addCase(initChatsCtxAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<ChatsCtx>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получение списков чатов и особых пользователей");
                    break;
                case null:
                    console.log("Списки чатов и особых пользователей не получен");
                    break;
                default:
                    state.chatsFavList = action.payload.chatsFavList;
                    state.chatsList = action.payload.chatsList;
                    console.log("Успешное получение списков чатов и особых пользователей");
                    break;
            }
        })
        builder.addCase(initChatsCtxAsync.rejected, _ => {
            console.log("Ошибка получение списков чатов и особых пользователей");
        })

        // Получение сообщение, когда находишься на странице списка чатов
        // socketNewMsgInToChats
        builder.addCase(socketNewMsgInToChats.pending, _ => {
            console.log("Получение сообщения, когда находишься на странице списка чатов");
        })
        builder.addCase(socketNewMsgInToChats.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<ChatsListItem[]>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получения сообщения, когда находишься на странице списка чатов");
                    break;
                case null:
                    console.log("Получение сообщение, когда находишься на странице списка чатов не порошло");
                    break;
                default:
                    state.chatsList = action.payload;
                    console.log("Успешное получение сообщения, когда находишься на странице списка чатов");
                    break;
            }
        })
        builder.addCase(socketNewMsgInToChats.rejected, _ => {
            console.log("Ошибка получения сообщения, когда находишься на странице списка чатов");
        })

        // Получение чата по id
        builder.addCase(getChatByIdAsync.pending, _ => {
            console.log("Получение чата по id");
        })
        builder.addCase(getChatByIdAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<TargetChat>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получения чата по id");
                    break;
                case null:
                    console.log("Чат по id не получен");
                    break;
                default:
                    state.targetChat = action.payload;
                    console.log("Успешное получение чата по id");
                    break;
            }
        })
        builder.addCase(getChatByIdAsync.rejected, _ => {
            console.log("Ошибка получения чата по id");
        })

        // Получение сообщений в чате
        builder.addCase(getDopDialogMsgs.pending, _ => {
            console.log("Получение дополнительных сообщений чата");
        })
        builder.addCase(getDopDialogMsgs.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<TargetChatDay[]| 'None'>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получения дополнительных сообщений чата");
                    break;
                case null:
                    console.log("Дополнительные сообщения чата не получены");
                    break;
                case 'None':
                    console.log('Все сообщения чата были загружены')
                    break;
                default:
                    state.targetChat.chatDialog = action.payload;
                    console.log("Успешное получение дополнительных сообщений чата");
                    break;
            }
        })
        builder.addCase(getDopDialogMsgs.rejected, _ => {
            console.log("Ошибка получения дополнительных сообщений чата");
        })

        // Удаление чата по id
        builder.addCase(deleteChatByIDAsync.pending, _ => {
            console.log("Удаление чата по id");
        })
        builder.addCase(deleteChatByIDAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<boolean>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка удаления чата по id");
                    break;
                case null:
                    console.log("Чат по id не удалён");
                    break;
                default:
                    state.targetChat = {
                        id: '',
                        timer: null,
                        interlocutor: null,
                        chatDialog: [],
                    };

                    console.log("Успешное удаление чата по id");
                    break;
            }
        })
        builder.addCase(deleteChatByIDAsync.rejected, _ => {
            console.log("Ошибка удаления чата по id");
        })

        // Отправка сообщения в чат
        builder.addCase(sendMsgAsync.pending, _ => {
            console.log("Отправка сообщения в чат");
        })
        builder.addCase(sendMsgAsync.fulfilled, (state, action: PayloadAction<AsyncThunkRes<TargetChatDay[]>>) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка отправки сообщения");
                    break;
                case null:
                    console.log("Сообщение не отправлено");
                    break;
                default:
                    state.targetChat.chatDialog = action.payload;
                    console.log("Успешная отправка сообщения");
                    break;
            }
        })
        builder.addCase(sendMsgAsync.rejected, _ => {
            console.log("Ошибка отправки сообщения");
        })

        // Получение сообщения в чат
        builder.addCase(getMsgAsync.pending, _ => {
            console.log("Получение сообщения в чат");
        })
        builder.addCase(getMsgAsync.fulfilled, (state, action: PayloadAction<AsyncThunkRes<TargetChatDay[]>>) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получения сообщения");
                    break;
                case null:
                    console.log("Сообщение не получено");
                    break;
                default:
                    state.targetChat.chatDialog = action.payload;
                    console.log("Успешное получения сообщения");
                    break;
            }
        })
        builder.addCase(getMsgAsync.rejected, _ => {
            console.log("Ошибка получения сообщения");
        })

        // Установка статуса : "Печатает..."
        builder.addCase(setTypingStatAsync.pending, _ => {
            console.log("Установка статуса : \"Печатает...\"");
        })
        builder.addCase(setTypingStatAsync.fulfilled, (_, action: PayloadAction<AsyncThunkRes<'success'>>) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка установки статуса : \"Печатает...\"");
                    break;
                case null:
                    console.log("Статус \"Печатает\" не установлен");
                    break;
                default:
                    console.log("Статус \"Печатает\" успешно установлен");
                    break;
            }
        })
        builder.addCase(setTypingStatAsync.rejected, _ => {
            console.log("Ошибка установки статуса : \"Печатает...\"");
        })
    }
})

export const {
    deleteFavChatById,
    deleteChatById,
    socketAddMsgInChat,
    markedReadedMsgs,
    setInterLineStatus,
    resetTargetChat,
} = chatsSlice.actions;
export default chatsSlice.reducer;

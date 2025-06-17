import type {
    ChatsState,
    ChatsCtx,
    TargetChat,
    ChatInterlocutor,
    IncomingMsg,
    TargetChatDay,
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
    WS_MSGS,
} from '@/config/env.config';

import {
    ELineStatus,
    type AsyncThunkRes,
    type IState,
} from '@/types/store.types';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ServerMethods, type OnResReadMsg, type OnResNewMsg } from '@/types/socket.types';
import { addMessageToChat, markMessagesAsRead } from '@/funcs/chats.funcs';
import { connectSocketRoom } from '@/config/socket.config';
import { setLoad } from './settingsSlice';
import type { FetchResponse } from '@/types/fetch.type';
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

export const initChatsCtxAsync = createAsyncThunk(
    'chats/init-chats-ctx',
    async (_, {dispatch, getState}): Promise<AsyncThunkRes<ChatsCtx>> => {
        try {
            dispatch(setLoad(true));

            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;

            const chatsRes: AxiosResponse<FetchResponse<any>> = await api.get(`${CHATS_ENDPOINT}?telegramId=${telegramId}`);

            if(
                chatsRes.status === 200 &&
                chatsRes.data.data &&
                chatsRes.data.data !== 'None' &&
                chatsRes.data.success
            ) {
                const chatsCtx: ChatsCtx = {
                    chatsFavList: [],
                    chatsList: [],
                };

                const now = Date.now();

                for(let item of chatsRes.data.data) {
                    const expiresAt = item.created_at + 24 * 60 * 60 * 1000;
                    const remainingMs = expiresAt - now;

                    chatsCtx.chatsList.push({
                        id: item.chatId,
                        avatar: item.toUser.avatarUrl,
                        name: item.toUser.name,
                        age: item.toUser.age,
                        lastMsg: item.lastMsg,
                        timer: Math.max(0, Math.floor(remainingMs / 1000)),
                        unreadMsgsCount: item.unread_count,
                    })
                }

                return chatsCtx;
            }

            return null;
        } catch (error) {
            return 'error';
        } finally {
            dispatch(setLoad(false));
        }
    }
);

export const getChatByIdAsync = createAsyncThunk(
    'chats/get-chat-by-id',
    async (id: string, {dispatch, getState}): Promise<AsyncThunkRes<TargetChat>> => {
        try {
            dispatch(setLoad(true));

            if( !id ) throw new Error('Не передан id');

            const metaEndpoint = CHATS_METADATA_ENDPOINT(id);
            const dialogEndpoint = CHATS_MSG_ENDPOINT(id);

            const [chatMetaRes, chatDialogRes]: [
                AxiosResponse<FetchResponse<any>>,
                AxiosResponse<FetchResponse<any>>,
            ] = await Promise.all([
                api.get(metaEndpoint),
                api.get(`${dialogEndpoint}?limit=10&offset=0`),
            ]);

            if(
                chatMetaRes.status !== 200         ||
                !chatMetaRes.data.data             ||
                chatMetaRes.data.data === 'None'   ||
                !chatMetaRes.data.success          ||
                chatDialogRes.status !== 200       ||
                !chatDialogRes.data.data           || 
                chatDialogRes.data.data === 'None' ||
                !chatDialogRes.data.success
            ) return null;

            console.log( chatDialogRes )

            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;
            const interId: string = chatMetaRes.data.data.participants.find(
                (item: string) => item !== telegramId
            );

            const readedData = {
                chatId: id,
                userId: telegramId,
                lastReadMessageId: chatMetaRes.data.data.last_message_id,
            };

            const needingReaded = !!chatMetaRes.data.data.last_message_id;
            
            const [interRes, readedMsgsRes]:[
                AxiosResponse<FetchResponse<any>>,
                AxiosResponse<FetchResponse<any>> | undefined,
            ] = await Promise.all([
                api.get(`${USER_ENDPOINT}/${interId}`),
                needingReaded ? api.patch(CHATS_READ_ENDPOINT, readedData) : undefined,
            ])

            console.log( readedMsgsRes, interRes )

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

            const interlocutor: ChatInterlocutor = {
                id: interRes.data.data.telegramId,
                avatar: interRes.data.data.photos[0].url,
                name: interRes.data.data.name,
                age: interRes.data.data.age,
                lineStat: interRes.data.data.isOnline ? ELineStatus.Online : ELineStatus.Offline,
            };

            let chatDialog: TargetChatDay[] = []

            console.log( chatDialogRes.data.data )

            for(let item of chatDialogRes.data.data) {
                const incommingMsg: IncomingMsg =  {
                    chatId: item.chatId,
                    created_at: item.created_at,
                    fromUser: item.fromUser,
                    id: item.id,
                    is_read: readedMsgsRes?.data.success || false,
                    text: item.text,
                    updated_at: item.updated_at,
                };

                chatDialog = addMessageToChat(chatDialog, incommingMsg, interlocutor.id);
            }

            const socketData = {
                roomName: telegramId,
                telegramId,    
            };

            const msgsScoketRes = await connectSocketRoom(WS_MSGS, ServerMethods.JoinRoom, socketData);

            console.log( 'Socket: ', msgsScoketRes)

            const now = Date.now();
            const expiresAt = chatMetaRes.data.data.created_at + 24 * 60 * 60 * 1000;
            const remainingMs = expiresAt - now;

            const timer = Math.max(0, Math.floor(remainingMs / 1000));

            return {
                id,
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

export const createChatAsync = createAsyncThunk(
    'chats/create-chat',
    async (toUser: string, {getState}): Promise<AsyncThunkRes<'success'>> => {
        try {
            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;

            const data = {
                telegramId,
                toUser,
            };

            const response: AxiosResponse<FetchResponse<any>> = await api.post(CHATS_ENDPOINT, data);

            if(
                response.status === 201 &&
                response.data.success
            ) return 'success';

            return null;
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

            const response: AxiosResponse<FetchResponse<any>> = await api.delete(delEndpoint);

            if(
                response.status === 200 &&
                response.data.data      &&
                response.data.success
            ) return true;

            return null;
        } catch (error) {
            return 'error';
        }
    }
);

export const sendMsgAsync = createAsyncThunk(
    'chats/send-msg',
    async (text: string, { getState }): Promise<AsyncThunkRes<TargetChatDay[]>> => {
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
            return 'error'
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
    },
    extraReducers: builder => {
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

        // Создание чата
        builder.addCase(createChatAsync.pending, _ => {
            console.log("Создание чата");
        })
        builder.addCase(createChatAsync.fulfilled, (_, action: PayloadAction<AsyncThunkRes<'success'>>) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка создания чата");
                    break;
                case null:
                    console.log("Чат не создан");
                    break;
                default:
                    console.log("Успешное создание чата");
                    break;
            }
        })
        builder.addCase(createChatAsync.rejected, _ => {
            console.log("Ошибка создания чата");
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

export const {deleteFavChatById, deleteChatById, socketAddMsgInChat, markedReadedMsgs, setInterLineStatus} = chatsSlice.actions;
export default chatsSlice.reducer;

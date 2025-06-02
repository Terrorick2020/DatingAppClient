import type {
    ChatsState,
    ChatsCtx,
    TargetChat,
    ChatsFavListItem,
    ChatsListItem
} from '@/types/chats.types';

import {
    CHATS_ENDPOINT,
    CHATS_METADATA_ENDPOINT,
    CHATS_MSG_ENDPOINT,
    CHATS_DEL_ENDPOINT
} from '@/config/env.config';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setLoad } from './settingsSlice';
import type { FetchResponse } from '@/types/fetch.type';
import type { AxiosResponse } from 'axios';
import type { AsyncThunkRes, IState } from '@/types/store.types';

import api from '@/config/fetch.config';


const initialState: ChatsState = {
    chatsFavList: [],
    chatsList: [],
    targetChat: {
        id: '',
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

            const [chatsRes, favChatsRes]: [
                AxiosResponse<FetchResponse<ChatsListItem[]>>,
                AxiosResponse<FetchResponse<ChatsFavListItem[]>>
            ] = await Promise.all([
                api.get(`${CHATS_ENDPOINT}?telegramId=${telegramId}`),
                api.get(`${CHATS_ENDPOINT}?telegramId=${telegramId}`),
            ]);

            console.log(chatsRes, favChatsRes)

            if(
                chatsRes.status === 200 &&
                chatsRes.data.data &&
                chatsRes.data.data !== 'None' &&
                chatsRes.data.success &&
                favChatsRes.status === 200 &&
                favChatsRes.data.data &&
                favChatsRes.data.data !== 'None' &&
                favChatsRes.data.success
            ) return {
                chatsFavList: favChatsRes.data.data,
                chatsList: chatsRes.data.data,
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
    async (id: string, {dispatch}): Promise<AsyncThunkRes<TargetChat>> => {
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
                api.get(dialogEndpoint),
            ]);

            if(
                chatMetaRes.status === 200 &&
                chatMetaRes.data.data &&
                chatMetaRes.data.data !== 'None' &&
                chatMetaRes.data.success &&
                chatDialogRes.status === 200 &&
                chatDialogRes.data.data &&
                chatDialogRes.data.data !== 'None' &&
                chatDialogRes.data.success
            )  return {
                id,
                interlocutor: chatMetaRes.data.data,
                chatDialog: chatMetaRes.data.data,
            }

            return null;
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
                response.status === 200 &&
                response.data.data &&
                response.data.data !== 'None' &&
                response.data.success
            ) return 'success';

            return null;
        } catch {
            return 'error';
        }
    }
)

export const deleteChatByIDAsync = createAsyncThunk(
    'chats/delete-chat-by-id',
    async (id: string): Promise<AsyncThunkRes<boolean>> => {
        try {
            if( !id ) throw new Error('Не передан id');

            const delEndpoint = CHATS_DEL_ENDPOINT(id);

            const response: AxiosResponse<FetchResponse<any>> = await api.delete(delEndpoint);

            if(
                response.status === 200 &&
                response.data.data &&
                response.data.success
            ) return true;

            return null;
        } catch (error) {
            return 'error';
        }
    }
);

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {},
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
    }
})

export const {} = chatsSlice.actions;
export default chatsSlice.reducer;

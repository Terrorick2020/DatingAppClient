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
import type { AsyncThunkRes } from '@/types/store.types';

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
    async (_, {dispatch }): Promise<AsyncThunkRes<ChatsCtx>> => {
        try {
            dispatch(setLoad(true));

            const [chatsRes, favChatsRes]: [
                AxiosResponse<FetchResponse<ChatsListItem[]>>,
                AxiosResponse<FetchResponse<ChatsFavListItem[]>>
            ] = await Promise.all([
                api.get(CHATS_ENDPOINT),
                api.get(CHATS_ENDPOINT),
            ]);

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
            ) return {
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
            console.log("Успешное получение списков чатов и особых пользоватеоей");
            if(!!action.payload && action.payload !== 'error') {
                state.chatsFavList = action.payload.chatsFavList;
                state.chatsList = action.payload.chatsList;
            }
        })
        builder.addCase(initChatsCtxAsync.rejected, _ => {
            console.log("Ошибка получение списков чатов и особых пользоватеоей");
        })

        // Получение чата по id
        builder.addCase(getChatByIdAsync.pending, _ => {
            console.log("Получение чата по id");
        })
        builder.addCase(getChatByIdAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<TargetChat>> ) => {
            console.log("Успешное получение чата по id");
            if(!!action.payload && action.payload !== 'error') {
                state.targetChat = action.payload;
            }
        })
        builder.addCase(getChatByIdAsync.rejected, _ => {
            console.log("Ошибка получения чата по id");
        })

        // Удаление чата по id
        builder.addCase(deleteChatByIDAsync.pending, _ => {
            console.log("Удаление чата по id");
        })
        builder.addCase(deleteChatByIDAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<boolean>> ) => {
            console.log("Успешное удаление чата по id");
            if(!!action.payload && action.payload !== 'error') {
                state.targetChat = {
                    id: '',
                    interlocutor: null,
                    chatDialog: [],
                }
            }
        })
        builder.addCase(deleteChatByIDAsync.rejected, _ => {
            console.log("Ошибка удаления чата по id");
        })
    }
})

export const {} = chatsSlice.actions;
export default chatsSlice.reducer;

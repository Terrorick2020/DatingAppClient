import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { delay } from '@/funcs/general.funcs';
import { chatsFavList, chatsList, targetChat } from '@/constant/chats';
import { setLoad } from './settingsSlice';
import type { ChatsState, ChatsCtx, TargetChat } from '@/types/chats.types';


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
    async (_, {dispatch}): Promise<ChatsCtx> => {
        try {
            dispatch(setLoad(true));

            await delay(2000);

            return {
                chatsFavList: chatsFavList,
                chatsList: chatsList,
            };
        } catch (error) {
            throw error;
        } finally {
            dispatch(setLoad(false));
        }
    }
)

export const getChatByIdAsync = createAsyncThunk(
    'chats/get-chat-by-id',
    async (id: string, {dispatch}): Promise<TargetChat> => {
        try {
            dispatch(setLoad(true));

            if( !id ) throw Error('Не передан id');

            await delay(2000);

            return targetChat;
        } catch (error) {
            throw error;
        } finally {
            dispatch(setLoad(false));
        }
    }
)

export const delteChatByIDAsync = createAsyncThunk(
    'chats/delete-chat-by-id',
    async (id: string, {dispatch}): Promise<boolean> => {
        try {
            dispatch(setLoad(true));

            await delay(2000);

            return !!id;
        } catch (error) {
            throw error;
        } finally {
            dispatch(setLoad(false));
        }
    }
)

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        // Получение списков чатов и особых пользоватеоей
        builder.addCase(initChatsCtxAsync.pending, _ => {
            console.log("Получение списков чатов и особых пользоватеоей");
        })
        builder.addCase(initChatsCtxAsync.fulfilled, ( state, action ) => {
            console.log("Успешное получение списков чатов и особых пользоватеоей");
            state.chatsFavList = action.payload.chatsFavList;
            state.chatsList = action.payload.chatsList;
        })
        builder.addCase(initChatsCtxAsync.rejected, _ => {
            console.log("Ошибка получение списков чатов и особых пользоватеоей");
        })

        // Получение чата по id
        builder.addCase(getChatByIdAsync.pending, _ => {
            console.log("Получение чата по id");
        })
        builder.addCase(getChatByIdAsync.fulfilled, ( state, action ) => {
            console.log("Успешное получение чата по id");
            state.targetChat = action.payload;
        })
        builder.addCase(getChatByIdAsync.rejected, _ => {
            console.log("Ошибка получения чата по id");
        })

        // Удаление чата по id
        builder.addCase(delteChatByIDAsync.pending, _ => {
            console.log("Удаление чата по id");
        })
        builder.addCase(delteChatByIDAsync.fulfilled, _ => {
            console.log("Успешное удаление чата по id");
        })
        builder.addCase(delteChatByIDAsync.rejected, _ => {
            console.log("Ошибка удаления чата по id");
        })
}
})

export const {} = chatsSlice.actions;
export default chatsSlice.reducer;

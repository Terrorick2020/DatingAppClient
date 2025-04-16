import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { delay } from '@/funcs/general.funcs';
import { chatsFavList, chatsList } from '@/constant/chats';
import { setLoad } from './settingsSlice';
import type { ChatsState, ChatsCtx } from '@/types/chats.types';


const initialState: ChatsState = {
    chatsFavList: [],
    chatsList: [],
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
    }
})

export const {} = chatsSlice.actions;
export default chatsSlice.reducer;

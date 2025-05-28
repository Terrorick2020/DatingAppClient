import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LIKES_ENDPOINT } from '@/config/env.config';
import { delay } from '@/funcs/general.funcs';
import { setLoad } from './settingsSlice';
import { type FetchResponse, EFetchLikesTProps } from '@/types/fetch.type';
import type { LikesState, LikesItem, LikesMatch } from '@/types/likes.types';
import type { AxiosResponse } from 'axios';
import type { IState, AsyncThunkRes } from '@/types/store.types';

import api from '@/config/fetch.config';


const initialState: LikesState = {
    likesList: [],
    match: {
        value: false,
        from: null
    }
}

export const initLikesListAsync = createAsyncThunk(
    'likes/init-likes-list',
    async (_, { getState, dispatch }): Promise<AsyncThunkRes<LikesItem[]>> => {
        try {
            dispatch(setLoad(true));

            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;

            const response: AxiosResponse<FetchResponse<LikesItem[]>> =
                await api.get(`${LIKES_ENDPOINT}?telegramId=${telegramId}&type=${EFetchLikesTProps.Received}`);

            if(
                response.status === 200 &&
                response.data.data &&
                response.data.data !== 'None' &&
                response.data.success
            ) return response.data.data;

            return null;
        } catch (error) {
            return 'error';
        } finally {
            dispatch(setLoad(false));
        }
    }
)

export const acceptLikingAsync = createAsyncThunk(
    'likes/accept-liking',
    async (id: string): Promise<boolean> => {
        try {
            await delay(2000);

            return !!id;
        } catch (error) {
            throw error;
        }
    }
);

export const rejectLikingAsync = createAsyncThunk(
    'likes/reject-liking',
    async (id: string): Promise<boolean> => {
        try {
            await delay(2000);

            return !!id;
        } catch (error) {
            throw error;
        }
    }
);

export const acceptMatchAsync = createAsyncThunk(
    'likes/accept-match',
    async (): Promise<void> => {
        await delay(2000);
    }
)

const likesSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        setMatch: (state, action: PayloadAction<LikesMatch>) => {
            state.match = action.payload;
        }
    },
    extraReducers: builder => {
        // Получение списка симпатий
        builder.addCase(initLikesListAsync.pending, _ => {
            console.log("Получение списка симпатий");
        })
        builder.addCase(initLikesListAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<LikesItem[]>> ) => {
            console.log("Успешное получение списка симпатий");
            if(!!action.payload && action.payload !== 'error') {
                state.likesList = action.payload;
            }
        })
        builder.addCase(initLikesListAsync.rejected, _ => {
            console.log("Ошибка получение списка симпатий");
        })

        // Принятие симпатии
        builder.addCase(acceptLikingAsync.pending, _ => {
            console.log("Принятие симпатии");
        })
        builder.addCase(acceptLikingAsync.fulfilled, _ => {
            console.log("Успешное принятие симпатии");
        })
        builder.addCase(acceptLikingAsync.rejected, _ => {
            console.log("Ошибка принятия симпатии");
        })

        // Отклонение симпантии
        builder.addCase(rejectLikingAsync.pending, _ => {
            console.log("Отклонение симпантии");
        })
        builder.addCase(rejectLikingAsync.fulfilled, _ => {
            console.log("Успешное отклонение симпантии");

        })
        builder.addCase(rejectLikingAsync.rejected, _ => {
            console.log("Ошибка отклонения симпантии");
        })

        // Ответ на симпатию
        builder.addCase(acceptMatchAsync.pending, _ => {
            console.log("Ответ на симпатию");
        })
        builder.addCase(acceptMatchAsync.fulfilled, _ => {
            console.log("Успешный ответ на симпатию");

        })
        builder.addCase(acceptMatchAsync.rejected, _ => {
            console.log("Ошибка ответа на симпатию");
        })
    },
})

export const { setMatch } = likesSlice.actions;
export default likesSlice.reducer;

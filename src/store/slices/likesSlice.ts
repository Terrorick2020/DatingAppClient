import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createChatAsync } from './chatsSlice';
import { LIKES_ENDPOINT } from '@/config/env.config';
import { delay } from '@/funcs/general.funcs';
import { setLoad } from './settingsSlice';
import { PlanLabelSvgType } from '@/types/ui.types';
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

            const response: AxiosResponse<FetchResponse<any>> =
                await api.get(`${LIKES_ENDPOINT}?telegramId=${telegramId}&type=${EFetchLikesTProps.Received}`);

            console.log(response)

            const likesList: LikesItem[] = [];

            const now = Date.now();

            for(let item of response.data.data) {
                const ms = new Date(item.createdAt).getTime()
                const expiresAt = ms + 24 * 60 * 60 * 1000;
                const remainingMs = expiresAt - now;
                const remainingS = Math.max(0, Math.floor(remainingMs / 1000));

                likesList.push({
                    id: item.fromUser.telegramId,
                    avatar: item.fromUser.photoUrl,
                    planStatus: PlanLabelSvgType.success,
                    timer: {
                        value: remainingS,
                        isCritical: remainingS < 3600 * 3,
                    },
                    name: item.fromUser.name,
                    age: item.fromUser.age,
                })
            };

            if(
                response.status === 200 &&
                response.data.data &&
                response.data.data !== 'None' &&
                response.data.success
            ) return likesList;

            return null;
        } catch (error) {
            return 'error';
        } finally {
            dispatch(setLoad(false));
        }
    }
);

export const acceptLikingAsync = createAsyncThunk(
    'likes/accept-liking',
    async (toUserId: string, { getState, dispatch }): Promise<AsyncThunkRes<boolean>> => {
        try {
            const rootState = getState() as IState;
            const fromUserId = rootState.profile.info.id;

            const data = {
                fromUserId,
                toUserId,
            };

            dispatch(createChatAsync(toUserId));

            const response: AxiosResponse<FetchResponse<any>> = await api.post(LIKES_ENDPOINT, data);

            // if(
            //     response.status === 201 &&
            //     response.data.success &&
            //     response.data.data.isMatch
            // ) dispatch(createChatAsync(toUserId));

            return response.data.success;
        } catch (error) {
            return 'error';
        }
    }
);

export const rejectLikingAsync = createAsyncThunk(
    'likes/reject-liking',
    async (id: string, { getState }): Promise<AsyncThunkRes<boolean>> => {
        try {
            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;

            const delLikingEndpoint = `${LIKES_ENDPOINT}/${telegramId}/${id}`;

            const response: AxiosResponse<FetchResponse<string>> = await api.delete(delLikingEndpoint);

            return response.data.success;
        } catch (error) {
            return 'error';
        }
    }
);

export const acceptMatchAsync = createAsyncThunk(
    'likes/accept-match',
    async (): Promise<AsyncThunkRes<void>> => {
        try {
            await delay(2000);

            return null;
        } catch (error) {
            return 'error';
        }
    }
);

const likesSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        setMatch: (state, action: PayloadAction<LikesMatch>): void => {
            state.match = action.payload;
        },
        deleteById: (state, action: PayloadAction<string>): void => {
            const result = state.likesList.filter(
                item => item.id !== action.payload 
            );

            state.likesList = result;
        }
    },
    extraReducers: builder => {
        // Получение списка симпатий
        builder.addCase(initLikesListAsync.pending, _ => {
            console.log("Получение списка симпатий");
        })
        builder.addCase(initLikesListAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<LikesItem[]>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получение списка симпатий");
                    break;
                case null:
                    console.log("Симпатии не получены");
                    break;
                default:
                    state.likesList = action.payload;
                    console.log("Успешное получение списка симпати");
                    break;
            }
        })
        builder.addCase(initLikesListAsync.rejected, _ => {
            console.log("Ошибка получение списка симпатий");
        })

        // Принятие симпатии
        builder.addCase(acceptLikingAsync.pending, _ => {
            console.log("Принятие симпатии");
        })
        builder.addCase(acceptLikingAsync.fulfilled, (_, action: PayloadAction<AsyncThunkRes<boolean>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка принятия симпатии");
                    break;
                case null:
                    console.log("Симпатия не принята");
                    break;
                default:
                    console.log("Успешное принятие симпатии");
                    break;
            }
        })
        builder.addCase(acceptLikingAsync.rejected, _ => {
            console.log("Ошибка принятия симпатии");
        })

        // Отклонение симпантии
        builder.addCase(rejectLikingAsync.pending, _ => {
            console.log("Отклонение симпантии");
        })
        builder.addCase(rejectLikingAsync.fulfilled, (_, action: PayloadAction<AsyncThunkRes<boolean>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка отклонения симпантии");
                    break;
                case null:
                    console.log("Симпатия не откланене");
                    break;
                default:
                    console.log("Успешное отклонение симпантии");
                    break;
            }

        })
        builder.addCase(rejectLikingAsync.rejected, _ => {
            console.log("Ошибка отклонения симпантии");
        })

        // Ответ на симпатию
        builder.addCase(acceptMatchAsync.pending, _ => {
            console.log("Ответ на симпатию");
        })
        builder.addCase(acceptMatchAsync.fulfilled, (_, action: PayloadAction<AsyncThunkRes<void>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка ответа на симпатию");
                    break;
                case null:
                    console.log("На симпатию не удалось ответить");
                    break;
                default:
                    console.log("Успешный ответ на симпатию");
                    break;
            }

        })
        builder.addCase(acceptMatchAsync.rejected, _ => {
            console.log("Ошибка ответа на симпатию");
        })
    },
})

export const { setMatch, deleteById } = likesSlice.actions;
export default likesSlice.reducer;

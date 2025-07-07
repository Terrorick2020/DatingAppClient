import {
    ERejectLikingType,
    type LikesState,
    type LikesItem,
    type LikesMatch,
    type RejectLikingData,
} from '@/types/likes.types';

import {
    EFetchLikesTProps,
    type FetchResponse,
    type UnreadLikesRes,
    type LikesListRes,
    type TargetUserEndpointRes,
    type MarkReadLikesRes,
} from '@/types/fetch.type';

import {
    LIKES_ENDPOINT,
    USER_ENDPOINT,
    CHATS_ADD_MSG_ENDPOINT,
    LIKES_UNREADED_ENDPOINT,
    LIKES_READED_ENDPOINT,
} from '@/config/env.config';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setLoad, setApiRes, setBadge } from './settingsSlice';
import { PlanLabelSvgType } from '@/types/ui.types';
import { EApiStatus } from '@/types/settings.type';
import type { OnResNewMatch, OnResNewLike } from '@/types/socket.types';
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

export const getUnreadLikesAsync = createAsyncThunk(
    'likes/get-unread-likes',
    async (_, { getState, dispatch }): Promise<AsyncThunkRes<'success'>> => {
        try {
            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;

            const url = LIKES_UNREADED_ENDPOINT(telegramId);

            const response: AxiosResponse<FetchResponse<UnreadLikesRes>> = await api.get(url);

            if(
                response.status !== 200 ||
                !response.data.success  ||
                !response.data.data     ||
                response.data.data === 'None'
            ) return null;

            const data = response.data.data;
            const badgeCtx = rootState.settings.badge;
            
            dispatch(setBadge({
                ...badgeCtx,
                likes: {
                    value: data.count !== 0,
                    content: data.count,
                }
            }));

            return 'success';
        } catch (error) {
            return 'error';
        }
    }
);

export const readNewLikesAsync = createAsyncThunk(
    'likes/read-new-likes',
    async (_, { getState }): Promise<AsyncThunkRes<'success'>> => {
        try {
            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;
            const data = { telegramId };
            
            const response: AxiosResponse<FetchResponse<MarkReadLikesRes>> =
                await api.post(LIKES_READED_ENDPOINT, data);

            if(
                response.status !== 201 ||
                !response.data.success  ||
                !response.data.data     ||
                response.data.data === 'None'
            ) return null;

            return 'success';
        } catch {
            return 'error';
        }
    }
);

export const initLikesListAsync = createAsyncThunk(
    'likes/init-likes-list',
    async (_, { getState, dispatch }): Promise<AsyncThunkRes<LikesItem[]>> => {
        try {
            dispatch(setLoad(true));

            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;

            const response: AxiosResponse<FetchResponse<LikesListRes[]>> =
                await api.get(`${LIKES_ENDPOINT}?telegramId=${telegramId}&type=${EFetchLikesTProps.Received}`);
            
            if(
                response.status !== 200 ||
                !response.data.success  ||
                !response.data.data     ||
                response.data.data === 'None'
            ) return null;

            const likesList: LikesItem[] = [];
            const now: number = Date.now();

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
                    isRead: item.isRead,
                })
            };

            likesList.sort((a, b) => {
                if (a.isRead !== b.isRead) {
                    return a.isRead ? 1 : -1;
                };

                return a.timer.value - b.timer.value;
            });

            return likesList;
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

            const response: AxiosResponse<FetchResponse<any>> = await api.post(LIKES_ENDPOINT, data);

            if (
                response.status !== 201  ||
                !response.data.success
            ) {
                dispatch(setApiRes({
                    value: true,
                    msg: 'Не удалось отправить симпатию',
                    status: EApiStatus.Warning,
                    timestamp: Date.now(),
                }));

                return null;
            }

            return true;
        } catch (error) {
            dispatch(setApiRes({
                value: true,
                msg: 'Не удалось отправить симпатию',
                status: EApiStatus.Warning,
                timestamp: Date.now(),
            }));

            return 'error';
        }
    }
);

export const rejectLikingAsync = createAsyncThunk(
    'likes/reject-liking',
    async (data: RejectLikingData, { getState, dispatch }): Promise<AsyncThunkRes<boolean>> => {
        try {
            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;

            let url: string;

            switch(data.type) {
                case ERejectLikingType.Direct:
                    url = `${LIKES_ENDPOINT}/${telegramId}/${data.id}`;
                    break;
                case ERejectLikingType.Reverse:
                    url = `${LIKES_ENDPOINT}/${data.id}/${telegramId}`;
                    break;
            }


            const response: AxiosResponse<FetchResponse<null>> = await api.delete(url);

            if (
                response.status !== 200 ||
                !response.data.success
            ) {
                dispatch(setApiRes({
                    value: true,
                    msg: 'Не удалось отклонить симпатию',
                    status: EApiStatus.Warning,
                    timestamp: Date.now(),
                }));
            };

            return response.data.success;
        } catch (error) {
            dispatch(setApiRes({
                value: true,
                msg: 'Не удалось отклонить симпатию',
                status: EApiStatus.Warning,
                timestamp: Date.now(),
            }));

            return 'error';
        }
    }
);

export const getMatchDataAsync = createAsyncThunk(
    'likes/get-match-data',
    async (data: OnResNewMatch, {getState}): Promise<AsyncThunkRes<LikesMatch>> => {
        try {
            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;

            const id = telegramId === data.user1Id ? data.user2Id : data.user1Id;
            
            const response: AxiosResponse<FetchResponse<any>> = await api.get(`${USER_ENDPOINT}/${id}`);

            if (
                response.status !== 200 ||
                !response.data.success  ||
                !response.data.data     ||
                response.data.data === 'None'
            ) return null;

            const userData = response.data.data;

            const result: LikesMatch = {
                value: true,
                from: {
                    id,
                    chatId: data.chatId,
                    avatar: userData.photos[0].url,
                    name: userData.name,
                }
            }

            return result
        } catch (error) {
            return 'error';
        }
    }
)

export const acceptMatchAsync = createAsyncThunk(
    'likes/accept-match',
    async (text: string, {getState, dispatch}): Promise<AsyncThunkRes<'success'>> => {
        try {
            const rootState = getState() as IState;
            const fromUser = rootState.profile.info.id;
            const chatId = rootState.likes.match.from?.chatId;

            if(!chatId) return 'error';

            const data = { chatId, fromUser, text };

            const response: AxiosResponse<FetchResponse<any>> = await api.post(CHATS_ADD_MSG_ENDPOINT, data);

            if (
                response.status !== 201       ||
                !response.data.data           ||
                response.data.data === 'None' ||
                !response.data.success
            ) return null;

            return 'success';
        } catch (error) {
            dispatch(setApiRes({
                value: true,
                msg: 'Ошибка отправки сообщения в чат! Попробуйте сделать это в чате',
                status: EApiStatus.Warning,
                timestamp: Date.now(),
            }));

            return 'error';
        }
    }
);

export const addLikeInRealTimeAsync = createAsyncThunk(
    'likes/add-like-in-real-time',
    async (data: OnResNewLike): Promise<AsyncThunkRes<LikesItem>> => {
        try {
            const response: AxiosResponse<FetchResponse<TargetUserEndpointRes>> = 
                await api.get(`${USER_ENDPOINT}/${data.fromUserId}`);

            if (
                response.status !== 200 ||
                !response.data.success  ||
                !response.data.data     ||
                response.data.data === 'None'
            ) return null;

            const userData = response.data.data;

            const result = {
                id: data.fromUserId,
                avatar: userData.photos[0].url,
                planStatus: PlanLabelSvgType.success,
                timer: {
                    value: 24 * 60 * 60 - 15,
                    isCritical: false,
                },
                name: userData.name,
                age: userData.age,
                isRead: false,
            };

            return result;
        } catch (error) {
            return 'error';
        }
    }
)

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
        // Получениие списка новых симпатий
        builder.addCase(getUnreadLikesAsync.pending, _ => {
            console.log("Получениие списка новых симпатий");
        })
        builder.addCase(getUnreadLikesAsync.fulfilled, ( _, action: PayloadAction<AsyncThunkRes<'success'>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получения списка новых симпатий");
                    break;
                case null:
                    console.log("Список новых сипатий не получен");
                    break;
                case 'success':
                    console.log("Успешное получение списка новых симпатий");
                    break;
            }
        })
        builder.addCase(getUnreadLikesAsync.rejected, _ => {
            console.log("Ошибка получения списка новых симпатий");
        })

        // Отметка новых лайков прочтёнными
        builder.addCase(readNewLikesAsync.pending, _ => {
            console.log("Отметка новых лайков прочтёнными");
        })
        builder.addCase(readNewLikesAsync.fulfilled, ( _, action: PayloadAction<AsyncThunkRes<'success'>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка отметки новых лайков прочтёнными");
                    break;
                case null:
                    console.log("Отметка новых лайков прочтёнными не прошла");
                    break;
                case 'success':
                    console.log("Успешноя отметка новых лайков прочтёнными");
                    break;
            }
        })
        builder.addCase(readNewLikesAsync.rejected, _ => {
            console.log("Ошибка отметки новых лайков прочтёнными");
        })

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
            console.log("Ошибка получения списка симпатий");
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

        // Получение данных о мэтче
        builder.addCase(getMatchDataAsync.pending, _ => {
            console.log("Получение данных о мэтче");
        })
        builder.addCase(getMatchDataAsync.fulfilled, (state, action: PayloadAction<AsyncThunkRes<LikesMatch>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получения данных о мэтче");
                    break;
                case null:
                    console.log("Данные о мэтче не получены");
                    break;
                default:
                    state.match = action.payload;
                    console.log("Успешное получение данных о мэтче не получены");
                    break;
            }

        })
        builder.addCase(getMatchDataAsync.rejected, _ => {
            console.log("Ошибка получения данных о мэтче");
        })

        // Ответ на симпатию
        builder.addCase(acceptMatchAsync.pending, _ => {
            console.log("Ответ на симпатию");
        })
        builder.addCase(acceptMatchAsync.fulfilled, (_, action: PayloadAction<AsyncThunkRes<'success'>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка ответа на симпатию");
                    break;
                case null:
                    console.log("На симпатию не удалось ответить");
                    break;
                case 'success':
                    console.log("Успешный ответ на симпатию");
                    break;
            }

        })
        builder.addCase(acceptMatchAsync.rejected, _ => {
            console.log("Ошибка ответа на симпатию");
        })

        // Добавление симпатии в реальном времени
        builder.addCase(addLikeInRealTimeAsync.pending, _ => {
            console.log("Добавление симпатии в реальном времени");
        })
        builder.addCase(addLikeInRealTimeAsync.fulfilled, (state, action: PayloadAction<AsyncThunkRes<LikesItem>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка добавления симпатии в реальном времени");
                    break;
                case null:
                    console.log("Симпатия в реальном времени не добавлена");
                    break;
                default:
                    const data = action.payload;
                    const needPush = !state.likesList.find(item => item.id === data.id);

                    if(needPush) {
                        state.likesList.unshift(action.payload);
                    };

                    console.log("Успешное добавление симпатии в реальном времени");
                    break;
            }

        })
        builder.addCase(addLikeInRealTimeAsync.rejected, _ => {
            console.log("Ошибка добавления симпатии в реальном времени");
        })
    },
})

export const { setMatch, deleteById } = likesSlice.actions;
export default likesSlice.reducer;

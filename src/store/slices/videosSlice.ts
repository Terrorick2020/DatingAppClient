import type {
    FetchResponse,
    PsychAddVideoRes,
    PsychPublishVideoRes,
    ToggleShortsLikeRes,
    ShortsViewRes,
} from '@/types/fetch.type';

import type {
    VideosState,
    PsychAddVideoParams,
    TargetPsychVideo,
    SelfPsychVideos,
    VideoShortsList,
    VideoItemWithPsych,
    VideoItem,
    EditVideoData,
} from '@/types/videos.types';

import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from '@reduxjs/toolkit';

import {
    VIDEO_UPL_ENDPOINT,
    VIDEO_SAVE_ENDPOINT,
    VIDEO_SELF_ENDPOINT,
    VIDEO_SHORTS_ENDPOINT,
    VIDEO_LIKE_ENDPOINT,
    VIDEO_VIEW_ENDPOINT,
    VIDEO_ENDPOIN,
    VIDEO_ADMIN_ENDPOINT,
} from '@/config/env.config';

import { hasAllKeys } from '@/funcs/utels';
import { setLoad } from './settingsSlice';
import { setApiRes } from './settingsSlice';
import { EApiStatus } from '@/types/settings.type';
import { targetPsychVideoBase, selfPsychVideosBase, shortsListBase } from '@/constant/video';
import { type AxiosResponse, type AxiosProgressEvent, isAxiosError } from 'axios';
import type { InitSliderData } from '@/types/quest.types';
import type { AsyncThunkRes, IState } from '@/types/store.types';

import api from '@/config/fetch.config';
import isEqual from 'lodash.isequal';


const initialState: VideosState = {
    targetPsychVideo: targetPsychVideoBase,
    selfPsychVideos: selfPsychVideosBase,
    shortsList: shortsListBase,
};

export const psychAddVideoAsync = createAsyncThunk(
    'videos/psych-add-video',
    async (
        { file, setProgress }: PsychAddVideoParams,
        { getState, dispatch },
    ): Promise<AsyncThunkRes<PsychAddVideoRes>> => {
        try {
            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;
            const formData = new FormData();

            formData.append('video', file);
            formData.append('telegramId', telegramId);

            const fetchVideo = async (): Promise<AsyncThunkRes<PsychAddVideoRes>> => {
                try {
                    const response: AxiosResponse<FetchResponse<PsychAddVideoRes>> =
                        await api.post(VIDEO_UPL_ENDPOINT, formData, {
                            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                                if (progressEvent.total) {
                                const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                                setProgress(percent);
                                }
                            }
                        });
                    console.log( response )

                    if(
                        response.status !== 201 ||
                        !response.data.success  ||
                        !response.data.data     ||
                        response.data.data === 'None'
                    ) return null;
                    
                    return response.data.data;

                } catch (error) {
                    if (isAxiosError(error) && error.code === 'ERR_NETWORK') {
                        return null;
                    };

                    return 'error';
                };
            };

            let response: AsyncThunkRes<PsychAddVideoRes> = null;
            const tryCount: number = 3;
            
            for(let i = 0; i < tryCount; i++) {
                response = await fetchVideo();

                if(response) break;

                if(!response && response !== 'error' && tryCount > i) {
                    dispatch(setApiRes({
                        value: true,
                        msg: `Произошёл сбой сети! Попыка загрузки №${i + 2}`,
                        status: EApiStatus.Warning,
                        timestamp: Date.now(),
                    }));
                };
            };

            return response;
        } catch (error) {
            return 'error';
        };
    },
);

export const publishPsychVideoAsync = createAsyncThunk(
    'videos/publish-psych-video',
    async (_, { getState }): Promise<AsyncThunkRes<'success'>> => {
        try {
            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;
            const targetPsychVideo = rootState.videos.targetPsychVideo;

            const data = {
                key: targetPsychVideo.key,
                title: targetPsychVideo.title,
                description: targetPsychVideo.description,
                telegramId,
            };

            const response: AxiosResponse<FetchResponse<PsychPublishVideoRes>> =
                await api.post(VIDEO_SAVE_ENDPOINT, data);

            if(
                response.status !== 201 ||
                !response.data.success  ||
                !response.data.data     ||
                response.data.data === 'None'
            ) return null;

            return 'success'
        } catch {
            return 'error'
        };
    },
);

export const editPsychVideoAsync = createAsyncThunk(
    'videos/edit-psych-video',
    async (editData: EditVideoData, { getState }): Promise<AsyncThunkRes<VideoItem[]>> => {
        try {
            const rootState = getState() as IState;
            const {videoId, ...data} = editData;
            const url = `${VIDEO_ENDPOIN}/${videoId}`;

            const response: AxiosResponse<FetchResponse<Omit<VideoItemWithPsych, 'isLiked'>>> =
                await api.patch(url, data);

            if(
                response.status !== 200 ||
                !response.data.success  ||
                !response.data.data     ||
                response.data.data === 'None'
            ) return null;

            const { psychologist, id,  ...dataRes} = response.data.data;

            return rootState.videos.selfPsychVideos.videos.map(item =>
                item.id === videoId
                    ? {
                        ...item,
                        ...dataRes,
                    }
                    : item
            );
        } catch {
            return 'error';
        };
    },
);

export const getTargetPsychVideoAsync = createAsyncThunk(
    'videos/get-target-psych-video',
    async (id: number, { getState }): Promise<TargetPsychVideo | null> => {
        const rootState = getState() as IState;
        const selfVideos = rootState.videos.selfPsychVideos.videos;

        const targetItem = selfVideos.find(item => item.id === id);

        if(!targetItem) return null;

        const response: TargetPsychVideo = {
            videoId: targetItem.id,
            key: targetItem.key,
            url: targetItem.url,
            title: targetItem.title,
            description: targetItem.description,
            preview: targetItem.previewUrl,
        };

        return response;
    },
);

export const deletePsychVideoAsync = createAsyncThunk(
    'videos/delete-psych-video',
    async (videoId: number, { getState }): Promise<AsyncThunkRes<VideoItem[]>> => {
        try {
            const rootState = getState() as IState;
            const url = `${VIDEO_ENDPOIN}/${videoId}`;

            const response: AxiosResponse<FetchResponse<null>> =
                await api.delete(url);
                
            if(
                response.status !== 200 ||
                !response.data.success
            ) return null;

            return rootState.videos.selfPsychVideos.videos.filter(
                item => item.id !== videoId
            );
        } catch {
            return 'error';
        };
    },
);

export const getSelfPsychVideosAsync = createAsyncThunk(
    'videos/get-self-psych-videos',
    async (data: InitSliderData, { dispatch, getState }): Promise<AsyncThunkRes<SelfPsychVideos>> => {
        try {
            dispatch(setLoad(true));

            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;
            const url = VIDEO_SELF_ENDPOINT(telegramId, data.offset, data.limit);

            const response: AxiosResponse<FetchResponse<SelfPsychVideos>> = await api.get(url);

            if(
                response.status !== 200 ||
                !response.data.success  ||
                !response.data.data     ||
                response.data.data === 'None'
            ) return null;

            return response.data.data;
        } catch (error) {            
            return 'error';
        } finally {
            dispatch(setLoad(false));
        };
    },
);

export const getShortsAsync = createAsyncThunk(
    'videos/get-shorts',
    async (data: InitSliderData, { dispatch, getState }): Promise<AsyncThunkRes<VideoShortsList>> => {
        try {
            dispatch(setLoad(true));

            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;

            const url = VIDEO_SHORTS_ENDPOINT(telegramId, data.offset, data.limit);

            const response: AxiosResponse<FetchResponse<VideoShortsList>> = await api.get(url);

            if(
                response.status !== 200 ||
                !response.data.success  ||
                !response.data.data     ||
                response.data.data === 'None'
            ) return null;
            
            return response.data.data;
        } catch {
            return 'error';
        } finally {
            dispatch(setLoad(false));
        };
    },
);

export const getAdminShorrtsAsync = createAsyncThunk(
    'videos/get-admin-shorts',
    async (data: InitSliderData, { dispatch, getState }): Promise<AsyncThunkRes<VideoShortsList>> => {
        try {
            dispatch(setLoad(true));

            const rootState = getState() as IState;
            const search = rootState.admin.searchId;
            const telegramId = rootState.profile.info.id;

            const url = VIDEO_ADMIN_ENDPOINT(telegramId, data.offset, data.limit, search);

            const response: AxiosResponse<FetchResponse<VideoShortsList>> = await api.get(url);

            console.log(response)

            if(
                response.status !== 200 ||
                !response.data.success  ||
                !response.data.data     ||
                response.data.data === 'None'
            ) return null;
            
            return response.data.data;
        } catch {
            return 'error';
        } finally {
            dispatch(setLoad(false));
        };
    },
);

export const toggleShortsLikeAsync = createAsyncThunk(
    'videos/toggle-shorts-like',
    async (videoId: number, { getState }): Promise<AsyncThunkRes<VideoItemWithPsych[]>> => {
        try {
            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;
            const data = { telegramId, videoId };
            const url = VIDEO_LIKE_ENDPOINT(videoId);

            const response: AxiosResponse<FetchResponse<ToggleShortsLikeRes>> =
                await api.post(url, data);

            if(
                response.status !== 201 ||
                !response.data.success  ||
                !response.data.data     ||
                response.data.data === 'None'
            ) return null;

            const dataRes = response.data.data;

            return rootState.videos.shortsList.videos.map(item =>
                item.id === videoId
                    ? {
                        ...item,
                        likesCount: dataRes.likesCount,
                        isLiked: dataRes.isLiked,
                    }
                    : item
            );
        } catch {
            return 'error';
        };
    },
);

export const viewShortsAsync = createAsyncThunk(
    'videos/view-shorts',
    async (videoId: number, { getState }): Promise<AsyncThunkRes<VideoItemWithPsych[]>> => {
        try {
            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;
            const data = { telegramId, videoId };
            const url = VIDEO_VIEW_ENDPOINT(videoId);

            const response: AxiosResponse<FetchResponse<ShortsViewRes>> =
                await api.post(url, data);

            if(
                response.status !== 201 ||
                !response.data.success  ||
                !response.data.data     ||
                response.data.data === 'None'
            ) return null;

            const dataRes = response.data.data;

            return rootState.videos.shortsList.videos.map(item =>
                item.id === videoId
                    ? {
                        ...item,
                        viewsCount: dataRes.viewsCount,
                        isView: true,
                    }
                    : item
            );
        } catch {
            return 'error';
        };
    },
);

const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        setTargetPsychVideo: (
            state,
            action: PayloadAction<TargetPsychVideo | Partial<TargetPsychVideo>>
        ): void => {
            if(!isEqual(state.targetPsychVideo, action.payload)) {
                if(hasAllKeys(action.payload, ['videoId', 'key', 'preview', 'title', 'url'])) {
                    state.targetPsychVideo = action.payload;
                } else {
                    Object.assign(state.targetPsychVideo, action.payload);
                };
            };
        },
        resetTargetPsychVideo: state => {
            if(!isEqual(state.targetPsychVideo, targetPsychVideoBase)) {
                state.targetPsychVideo = targetPsychVideoBase;
            };
        },
    },
    extraReducers: builder => {
        // Загрузка видео психолога
        builder.addCase(psychAddVideoAsync.pending, _ => {
            console.log("Загрузка видео психолога");
        })
        builder.addCase(psychAddVideoAsync.fulfilled, (
            state,
            action: PayloadAction<AsyncThunkRes<PsychAddVideoRes>>,
        ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка загрузки видео психолога");
                    break;
                case null:
                    console.log("Видео психолога не загружено");
                    break;
                default:
                    if (!isEqual(state.targetPsychVideo, action.payload)) {
                        Object.assign(state.targetPsychVideo, action.payload);
                    };
                    console.log("Видео психолога успешно загружено");
                    break;
            }
        })
        builder.addCase(psychAddVideoAsync.rejected, _ => {
            console.log("Ошибка загрузки видео психолога");
        })

        // Публикация видео психолога
        builder.addCase(publishPsychVideoAsync.pending, _ => {
            console.log("Публикация видео психолога");
        })
        builder.addCase(publishPsychVideoAsync.fulfilled, (
            _,
            action: PayloadAction<AsyncThunkRes<'success'>>,
        ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка публикации видео психолога");
                    break;
                case null:
                    console.log("Видео психолога не опубликовано");
                    break;
                default:
                    console.log("Видео психолога успешно опубликовано");
                    break;
            }
        })
        builder.addCase(publishPsychVideoAsync.rejected, _ => {
            console.log("Ошибка публикации видео психолога");
        })

        // Изменение видео психолога
        builder.addCase(editPsychVideoAsync.pending, _ => {
            console.log("Изменение видео психолога");
        })
        builder.addCase(editPsychVideoAsync.fulfilled, (
            state,
            action: PayloadAction<AsyncThunkRes<VideoItem[]>>,
        ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка изменения видео психолога");
                    break;
                case null:
                    console.log("Личное видео психолога не изменено");
                    break;
                default:
                    state.selfPsychVideos.videos = action.payload;
                    console.log("Личное видео психолога успешно изменено");
                    break;
            }
        })
        builder.addCase(editPsychVideoAsync.rejected, _ => {
            console.log("Ошибка изменения видео психолога");
        })

        // Получение целевого видео псхолога
        builder.addCase(getTargetPsychVideoAsync.pending, _ => {
            console.log("Получение целевого видео псхолога");
        })
        builder.addCase(getTargetPsychVideoAsync.fulfilled, (
            state,
            action: PayloadAction<TargetPsychVideo | null>,
        ) => {
            switch(action.payload) {
                case null:
                    state.targetPsychVideo = targetPsychVideoBase;
                    console.log("Целевое видео психолога не получено");
                    break;
                default:
                    state.targetPsychVideo = action.payload;
                    console.log("Целевое видео психолога успешно получено");
                    break;
            }
        })
        builder.addCase(getTargetPsychVideoAsync.rejected, _ => {
            console.log("Ошибка получения целевого видео псхолога");
        })

        // Удаление личного видео психолога
        builder.addCase(deletePsychVideoAsync.pending, _ => {
            console.log("Удаление личного видео психолога");
        })
        builder.addCase(deletePsychVideoAsync.fulfilled, (
            state,
            action: PayloadAction<AsyncThunkRes<VideoItem[]>>,
        ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка удаления личного видео психолога");
                    break;
                case null:
                    console.log("Личное видео психолога не удалено");
                    break;
                default:
                    state.selfPsychVideos.videos = action.payload;
                    console.log("Личное видео психолога успешно удалено");
                    break;
            }
        })
        builder.addCase(deletePsychVideoAsync.rejected, _ => {
            console.log("Ошибка удаления видео психолога");
        })

        // Получение личных видео психолога
        builder.addCase(getSelfPsychVideosAsync.pending, _ => {
            console.log("Получение личных видео психолога");
        })
        builder.addCase(getSelfPsychVideosAsync.fulfilled, (
            state,
            action: PayloadAction<AsyncThunkRes<SelfPsychVideos>>,
        ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получения личных видео психолога");
                    break;
                case null:
                    console.log("Личные видео психолога не получены");
                    break;
                default:
                    state.selfPsychVideos = action.payload;
                    console.log("Личные видео психолога успешно получены");
                    break;
            }
        })
        builder.addCase(getSelfPsychVideosAsync.rejected, _ => {
            console.log("Ошибка получения личных видео психолога");
        })

        // Получение шортсов
        builder.addCase(getShortsAsync.pending, _ => {
            console.log("Получение шортсов");
        })
        builder.addCase(getShortsAsync.fulfilled, (
            state,
            action: PayloadAction<AsyncThunkRes<VideoShortsList>>,
        ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получения шортсов");
                    break;
                case null:
                    console.log("Шортсы не получены");
                    break;
                default:
                    state.shortsList = action.payload;
                    console.log("Шортсы успешно получены");
                    break;
            }
        })
        builder.addCase(getShortsAsync.rejected, _ => {
            console.log("Ошибка получения шортсов");
        })

        // Получение видео админом
        builder.addCase(getAdminShorrtsAsync.pending, _ => {
            console.log("Получение видео админом");
        })
        builder.addCase(getAdminShorrtsAsync.fulfilled, (
            state,
            action: PayloadAction<AsyncThunkRes<VideoShortsList>>,
        ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получения видео админом");
                    break;
                case null:
                    console.log("Видео админом не получены");
                    break;
                default:
                    state.shortsList = action.payload;
                    console.log("Видео админом успешно получены");
                    break;
            }
        })
        builder.addCase(getAdminShorrtsAsync.rejected, _ => {
            console.log("Ошибка получения видео админом");
        })

        // Изменение лайка шортса
        builder.addCase(toggleShortsLikeAsync.pending, _ => {
            console.log("Изменение лайка шортса");
        })
        builder.addCase(toggleShortsLikeAsync.fulfilled, (
            state,
            action: PayloadAction<AsyncThunkRes<VideoItemWithPsych[]>>,
        ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка изменения лайка шортса");
                    break;
                case null:
                    console.log("Лайк шортса не изменён");
                    break;
                default:
                    state.shortsList.videos = action.payload;
                    console.log("Лайк шортса успешно изменён");
                    break;
            }
        })
        builder.addCase(toggleShortsLikeAsync.rejected, _ => {
            console.log("Ошибка изменения лайка шортса");
        })

        // Просмотр шортса
        builder.addCase(viewShortsAsync.pending, _ => {
            console.log("Просмотр шортса");
        })
        builder.addCase(viewShortsAsync.fulfilled, (
            state,
            action: PayloadAction<AsyncThunkRes<VideoItemWithPsych[]>>,
        ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка просмотра шортса");
                    break;
                case null:
                    console.log("Шортс не просмотрен");
                    break;
                default:
                    state.shortsList.videos = action.payload;
                    console.log("Шортс успешно просмотрен");
                    break;
            }
        })
        builder.addCase(viewShortsAsync.rejected, _ => {
            console.log("Ошибка просмотра шортса");
        })
    },
});

export const {
    setTargetPsychVideo,
    resetTargetPsychVideo,
} = videosSlice.actions;
export default videosSlice.reducer;

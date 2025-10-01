import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from '@reduxjs/toolkit';

import type {
    VideosState,
    PsychAddVideoParams,
    TargetPsychVideo,
} from '@/types/videos.types';

import { VIDEO_UPL_ENDPOINT, VIDEO_SAVE_ENDPOINT } from '@/config/env.config';
import { hasAllKeys } from '@/funcs/utels';
import { targetPsychVideoBase } from '@/constant/video';
import type { AsyncThunkRes, IState } from '@/types/store.types';
import type { FetchResponse, PsychAddVideoRes, PsychPublishVideoRes } from '@/types/fetch.type';
import type { AxiosResponse, AxiosProgressEvent } from 'axios';

import api from '@/config/fetch.config';
import isEqual from 'lodash.isequal';


const initialState: VideosState = {
    targetPsychVideo: targetPsychVideoBase,
};

export const psychAddVideoAsync = createAsyncThunk(
    'videos/psych-add-video',
    async (
        { file, setProgress }: PsychAddVideoParams,
        { getState },
    ): Promise<AsyncThunkRes<PsychAddVideoRes>> => {
        try {
            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;
            const formData = new FormData();

            formData.append('video', file);
            formData.append('telegramId', telegramId);

            const response: AxiosResponse<FetchResponse<PsychAddVideoRes>> =
                await api.post(VIDEO_UPL_ENDPOINT, formData, {
                    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                        if (progressEvent.total) {
                        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setProgress(percent);
                        }
                    }
                });

            if(
                response.status !== 201 ||
                !response.data.success  ||
                !response.data.data     ||
                response.data.data === 'None'
            ) return null;
            
            return response.data.data;
        } catch (error) {
            console.log(error)

            return 'error';
        }
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
        }
    }
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
                if(hasAllKeys(action.payload, ['videoId', 'key', 'preview', 'title'])) {
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
    },
});

export const {
    setTargetPsychVideo,
    resetTargetPsychVideo,
} = videosSlice.actions;
export default videosSlice.reducer;

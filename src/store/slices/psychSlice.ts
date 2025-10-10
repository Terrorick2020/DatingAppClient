import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PSYCH_FOR_USER_ENDPOINT, PSYCH_BY_MARK_ENDPOINT } from '@/config/env.config';
import { setLoad } from './settingsSlice';
import { initialArgs } from '@/constant/psych';
import { AsyncThunkRes, IState } from '@/types/store.types';
import { ELineStatus} from '@/types/store.types';
import type { InitSliderData } from '@/types/quest.types';
import type { FetchResponse, InitPsychListRes, TargetPsychologistRes } from '@/types/fetch.type';
import type { AxiosResponse } from 'axios';
import type { PsychState, PsychListItem, TargerPsych, PsychListResult } from '@/types/psych.types';

import api from '@/config/fetch.config';


const initialState: PsychState = {
    serchPsychQuery: '',
    psychList: [],
    totalPsychCount: null,
    targetPsych: {
        id: '',
        photo: null,
        name: '',
        exp: null,
        spec: '',
        lineStat: ELineStatus.Offline,
        desc: '',
        expList: []
    },
};

export const initPsychList = createAsyncThunk(
    'psychologists/init-psych-list',
    async (
        args: InitSliderData | undefined,
        { dispatch, getState }
    ): Promise<AsyncThunkRes<PsychListResult>> => {
        try {
            dispatch(setLoad(true));

            const query: InitSliderData = args || initialArgs;

            const rootState = getState() as IState;
            const userTelegramId = rootState.profile.info.id;
            const search = rootState.psych.serchPsychQuery;

            const data = {
                ...( search && { search } ),
                ...query,
                userTelegramId,
            };

            const response: AxiosResponse<FetchResponse<InitPsychListRes>> =
                await api.post(PSYCH_FOR_USER_ENDPOINT, data);

            if(
                response.status !== 201 ||
                !response.data.success  ||
                !response.data.data     ||
                response.data.data === 'None'
            ) return null;

            const dataRes = response.data.data;

            const result: PsychListItem[] = dataRes.psychologists.map(
                item => ({
                    id: item.telegramId,
                    avatar: item.photos[0].url,
                    name: item.name,
                    spec: 'Психоаналитик',
                    lineStat: ELineStatus.Online,
                    exp: 5,
                }),
            );

            return {
                psych: result,
                total: dataRes.total,
            };
        } catch {
            return 'error';
        } finally {
            dispatch(setLoad(false));
        }
    }
);

export const getPsycByIdhAsync = createAsyncThunk(
    'psychologists/get-target-psych',
    async (id: string, { dispatch }): Promise<AsyncThunkRes<TargerPsych>> => {
        try {
            dispatch(setLoad(true));

            if(!id) return null;

            const url = PSYCH_BY_MARK_ENDPOINT(id);

            const response: AxiosResponse<FetchResponse<TargetPsychologistRes>> = await api.get(url);

            if(
                response.status !== 200 ||
                !response.data.success  ||
                !response.data.data     ||
                response.data.data === 'None'
            ) return null;

            const dataRes = response.data.data;

            const result: TargerPsych = {
                id: ''+dataRes.id,
                photo: dataRes.photos[0].url,
                name: dataRes.name,
                exp: 5,
                spec: 'Психоаналитик',
                lineStat: ELineStatus.Online,
                desc: dataRes.about,
                expList: [
                    {
                        id: '0.0',
                        title: 'Частная практика',
                        desc: 'Психоаналитик',
                        expGap: '2015-н.в.'
                    },
                    {
                        id: '0.1',
                        title: 'Курсы психологии',
                        desc: 'Психология',
                        expGap: '2013-2015'
                    },
                ],
            };

            return result;
        } catch (error) {
            console.log(error)

            return 'error';
        } finally {
            dispatch(setLoad(false));
        }
    }
);

const psychSlice = createSlice({
    name: 'psychologists',
    initialState,
    reducers: {
        setSerchPsychQuery: (state, action: PayloadAction<string>): void => {
            state.serchPsychQuery = action.payload;
        }
    },
    extraReducers: builder => {
        // Получние списка психологов
        builder.addCase(initPsychList.pending, _ => {
            console.log("Получние списка психологов");
        })
        builder.addCase(initPsychList.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<PsychListResult>> ) => {
            switch (action.payload) {
                case 'error':
                    console.log("Ошибка получния списка психологов");
                    break;
                case null:
                    console.log("Список психологов не получен");
                    break;
                default:
                    state.psychList = action.payload.psych;
                    state.totalPsychCount = action.payload.total;
                    console.log("Успешное получние списка психологов");
                    break;
            }
        })
        builder.addCase(initPsychList.rejected, _ => {
            console.log("Ошибка получния списка психологов");
        })

        // Получние выбранного психолога
        builder.addCase(getPsycByIdhAsync.pending, _ => {
            console.log("Получние выбранного психолога");
        })
        builder.addCase(getPsycByIdhAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<TargerPsych>> ) => {
            switch (action.payload) {
                case 'error':
                    console.log("Ошибка получния выбранного психолога");
                    break;
                case null:
                    console.log("Выбранный психолог не получен");
                    break;
                default:
                    console.log("Ошибка получния выбранного психолога");
                    state.targetPsych = action.payload;
                    break;
            }
        })
        builder.addCase(getPsycByIdhAsync.rejected, _ => {
            console.log("Ошибка получния выбранного психолога");
        })
    }
})

export const { setSerchPsychQuery } = psychSlice.actions;
export default psychSlice.reducer;

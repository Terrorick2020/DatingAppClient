import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PSYCH_FOR_USER_ENDPOINT, PSYCH_BY_MARK_ENDPOINT } from '@/config/env.config';
import { setLoad } from './settingsSlice';
import { initialArgs } from '@/constant/psych';
import { AsyncThunkRes, IState } from '@/types/store.types';
import { ELineStatus} from '@/types/store.types';
import type { InitSliderData } from '@/types/quest.types';
import type { FetchResponse, InitPsychListRes } from '@/types/fetch.type';
import type { AxiosResponse } from 'axios';
import type { PsychState, PsychListItem, TargerPsych } from '@/types/psych.types';

import api from '@/config/fetch.config';


const initialState: PsychState = {
    serchPsychQuery: '',
    psychList: [],
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
}

export const initPsychList = createAsyncThunk(
    'psychologists/init-psych-list',
    async (
        args: InitSliderData | undefined,
        { dispatch, getState }
    ): Promise<AsyncThunkRes<PsychListItem[]>> => {
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

            return [];
        } catch {
            return 'error';
        } finally {
            dispatch(setLoad(false));
        }
    }
);

export const getPsycByIdhAsync = createAsyncThunk(
    'psychologists/get-target-psych',
    async (id: string, {dispatch}): Promise<AsyncThunkRes<TargerPsych>> => {
        try {
            dispatch(setLoad(true));

            if(!id) return null;

            const url = PSYCH_BY_MARK_ENDPOINT(id);

            const response: AxiosResponse<FetchResponse<any>> = await api.get(url);

            if(
                response.status !== 200 ||
                !response.data.success  ||
                !response.data.data     ||
                response.data.data === 'None'
            ) return null;

            return null;
        } catch {
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
        builder.addCase(initPsychList.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<PsychListItem[]>> ) => {
            switch (action.payload) {
                case 'error':
                    console.log("Ошибка получния списка психологов");
                    break;
                case null:
                    console.log("Список психологов не получен");
                    break;
                default:
                    console.log("Успешное получние списка психологов");
                    state.psychList = action.payload;
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

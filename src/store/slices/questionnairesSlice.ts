import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { USERS_ENDPOINT, USER_ENDPOINT } from '@/config/env.config';
import { setLoad } from './settingsSlice';
import type { QuestState, SliderItem, DetailsTargetUser } from '@/types/quest.types';
import type { FetchResponse } from '@/types/fetch.type';
import type { AxiosResponse } from 'axios';
import { IState, AsyncThunkRes } from '@/types/store.types';

import api from '@/config/fetch.config';


const initialState: QuestState = {
    sliderList: [],
    targetUser: null,
}

export const initSliderListAsync = createAsyncThunk(
    'questionnaires/init-slider-list',
    async (_, {dispatch}): Promise<AsyncThunkRes<SliderItem[]>> => {
        try {
            dispatch(setLoad(true));

            const usersEndpoint = USERS_ENDPOINT();

            const response: AxiosResponse<FetchResponse<SliderItem[]>> = await api.get(usersEndpoint);

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

export const initTargetUserAsync = createAsyncThunk(
    'questionnaires/init-terget-user',
    async (_id: string, {getState, dispatch}): Promise<AsyncThunkRes<DetailsTargetUser>> => {
        try {
            dispatch(setLoad(true));

            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;

            const response = await api.get(`${USER_ENDPOINT}/${telegramId}`);

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

const questionnairesSlice = createSlice({
    name: 'questionnaires',
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Получение списка анкет
        builder.addCase(initSliderListAsync.pending, _ => {
            console.log("Получение списка анкет");
        })
        builder.addCase(initSliderListAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<SliderItem[]>> ) => {
            console.log("Успешное получение списка анкет");
            if(!!action.payload && action.payload !== 'error') {
                state.sliderList = action.payload;
            }
        })
        builder.addCase(initSliderListAsync.rejected, _ => {
            console.log("Ошибка получения списка анкет");
        })

        // Получение информации о целевой анкете
        builder.addCase(initTargetUserAsync.pending, _ => {
            console.log("Получение информации о целевой анкете");
        })
        builder.addCase(initTargetUserAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<DetailsTargetUser>> ) => {
            console.log("Успешное получение информации о целевой анкете");
            if(!!action.payload && action.payload !== 'error') {
                state.targetUser = action.payload;
            }
        })
        builder.addCase(initTargetUserAsync.rejected, _ => {
            console.log("Ошибка получения информации о целевой анкете");
        })
    },
})

export const {} = questionnairesSlice.actions;
export default questionnairesSlice.reducer;

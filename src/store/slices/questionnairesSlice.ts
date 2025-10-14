import {
    USER_ENDPOINT,
    HELP_CITYES_ENDPOINT,
    HELP_PLANS_ENDPOINT,
    HELP_REGIONS_ENDPOINT,
    PLANS_GET_ENDPOINT,
    USERS_QUESTS_ENDPOINT,
} from '@/config/env.config';

import type {
    QuestState,
    SliderItem,
    DetailsTargetUser,
    InitSliderData,
    InitSliderResData,
} from '@/types/quest.types';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setLoad } from './settingsSlice';
import { initialArgs } from '@/constant/quest';
import type { BaseVarsItem, DistrictVarsItem } from '@/types/settings.type';
import type { EveningPlans } from '@/types/profile.types';
import type { FetchResponse, TargetUserEndpointRes } from '@/types/fetch.type';
import type { AsyncThunkRes, IState } from '@/types/store.types';
import type { AxiosResponse } from 'axios';

import api from '@/config/fetch.config';


const initialState: QuestState = {
    sliderList: [],
    targetUser: null,
};

export const initSliderListAsync = createAsyncThunk(
    'questionnaires/init-slider-list',
    async (
        args: InitSliderData = initialArgs,
        { dispatch, getState },
    ): Promise<AsyncThunkRes<InitSliderResData>> => {
        const isPush = args !== initialArgs;

        try {
            if(!isPush) dispatch(setLoad(true));

            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id
 
            const questEndpoint = USERS_QUESTS_ENDPOINT(telegramId, args.limit, args.offset);

            const response: AxiosResponse<FetchResponse<SliderItem[]>> = await api.get(questEndpoint);

            if (
                response.status !== 200 ||
                !response.data.success  ||
                !response.data.data     ||
                response.data.data === 'None'
            ) return null;


            return {
                isPush,
                slides: response.data.data,
            };
        } catch (error) {
            return 'error';
        } finally {
            dispatch(setLoad(false));
        }
    }
);

export const initTargetUserAsync = createAsyncThunk(
    'questionnaires/init-target-user',
    async (id: string, {dispatch}): Promise<AsyncThunkRes<DetailsTargetUser>> => {
        try {
            dispatch(setLoad(true));

            const response: [
                AxiosResponse<FetchResponse<TargetUserEndpointRes>>,
                AxiosResponse<FetchResponse<EveningPlans>>,
            ] = await Promise.all([
                api.get(`${USER_ENDPOINT}/${id}`),
                api.get(`${PLANS_GET_ENDPOINT}/${id}`),
            ]);

            let allValid = response.every(res =>
                res.status === 200 &&
                res.data?.success &&
                res.data?.data &&
                res.data.data !== 'None'
            );

            if (!allValid) return null;

            const userData = response[0].data.data as any;
            const plansData = response[1].data.data as EveningPlans;

            const dataRes: [
                AxiosResponse<FetchResponse<BaseVarsItem>>,
                AxiosResponse<FetchResponse<BaseVarsItem>>,
                AxiosResponse<FetchResponse<DistrictVarsItem>>
            ] = await Promise.all([
                api.get(`${HELP_CITYES_ENDPOINT}/${userData.town}`),
                api.get(`${HELP_PLANS_ENDPOINT}/${plansData.plan.value}`),
                api.get(`${HELP_REGIONS_ENDPOINT}/${plansData.location.value}`),
            ])

            allValid = dataRes.every(res =>
                res.status === 200 &&
                res.data?.success &&
                res.data?.data &&
                res.data.data !== 'None'
            );

            if (!allValid) return null;

            const cityData = dataRes[0].data.data as BaseVarsItem;
            const planData = dataRes[1].data.data as BaseVarsItem;
            const distData  = dataRes[2].data.data as DistrictVarsItem;

            const result: DetailsTargetUser = {
                id: userData.telegramId,
                photos: userData.photos.map((item: any) => item.url),
                city: cityData.label,
                name: userData.name,
                age: userData.age,
                plans: {
                    targetTime: '',
                    district: distData.label,
                    distDesc: plansData.location.description.trim(),
                    place: planData.label,
                    planDesc: plansData.plan.description.trim(),
                },
                interest: userData.interest.label,
                bio: userData.bio,
            }

            return result;
        } catch (error) {
            return 'error';
        } finally {
            dispatch(setLoad(false));
        }
    }
);

const questionnairesSlice = createSlice({
    name: 'questionnaires',
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Получение списка анкет
        builder.addCase(initSliderListAsync.pending, _ => {
            console.log("Получение списка анкет");
        })
        builder.addCase(initSliderListAsync.fulfilled, (
            state, 
            action: PayloadAction<AsyncThunkRes<InitSliderResData>>
        ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получения списка анкет");
                    break;
                case null:
                    console.log("Список анкет не получен");
                    break;
                default:

                    if(action.payload.isPush) {
                        state.sliderList.push( ...action.payload.slides );
                    } else {
                        state.sliderList = action.payload.slides;
                    }

                    console.log("Успешное получение списка анкет");
                    break;
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
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получения информации о целевой анкете");
                    break;
                case null:
                    console.log("Информация о целевой анкете не получена");
                    break;
                default:
                    state.targetUser = action.payload;
                    console.log("Успешное получение информации о целевой анкете");
                    break;
            }
        })
        builder.addCase(initTargetUserAsync.rejected, _ => {
            console.log("Ошибка получения информации о целевой анкете");
        })
    },
})

export const {} = questionnairesSlice.actions;
export default questionnairesSlice.reducer;

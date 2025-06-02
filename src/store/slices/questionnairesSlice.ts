import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { USERS_ENDPOINT, USER_ENDPOINT, PHOTO_LINK } from '@/config/env.config';
import { setLoad } from './settingsSlice';
import type { QuestState, SliderItem, DetailsTargetUser } from '@/types/quest.types';
import type { FetchResponse } from '@/types/fetch.type';
import type { AsyncThunkRes } from '@/types/store.types';
import type { AxiosResponse } from 'axios';

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

            const response: AxiosResponse<FetchResponse<any>> = await api.get(usersEndpoint);

            if(
                response.status === 200 &&
                response.data.data &&
                response.data.data !== 'None' &&
                response.data.success
            ) {
                const resultList: SliderItem[] = [];

                for(let item of response.data.data) {
                    const photos: string[] = item.photos.map((ret: any) => PHOTO_LINK(ret.key));

                    resultList.push({
                        id: item.telegramId,
                        name: item.name,
                        age: item.age,
                        city: item.town,
                        description: item.bio,
                        plans: {
                            date: 'Планы на сегодня',
                            content: 'Бар, Адмиралтейский район',
                        },
                        photos,
                    })
                }
    
                return resultList;
            }

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
    async (id: string, {dispatch}): Promise<AsyncThunkRes<DetailsTargetUser>> => {
        try {
            dispatch(setLoad(true));

            const response = await api.get(`${USER_ENDPOINT}/${id}`);

            if(
                response.status === 200 &&
                response.data.data &&
                response.data.data !== 'None' &&
                response.data.success
            ) {
                const data = response.data.data;

                const result: DetailsTargetUser = {
                    id: data.telegramId,
                    photos: data.photos.map((item: any) => item.url),
                    city: data.town,
                    name: data.name,
                    age: data.age,
                    plans: {
                        targetTime: '18:00',
                        district: 'Адмиралтейский район',
                        place: 'Коктелтный бар',
                        description: 'Хочу сходить в коктейльный бар, выпить пару коктейлей и пообщаться.',
                    },
                    bio: data.bio
                }

                return result;
            }

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
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получения списка анкет");
                    break;
                case null:
                    console.log("Список анкет не получен");
                    break;
                default:
                    state.sliderList = action.payload;
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

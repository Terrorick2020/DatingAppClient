import type {
    ProfileState,
    ProfileSelf,
    SendGeoData,
    EveningPlans,
    PhotoItem,
    EveningPlansItem,
    EveningPlansMeta,
    SavePhotoAsyncThuncData,
    ProfileSelfGeo,
} from '@/types/profile.types';

import type {
    FetchResponse,
    FetchGeoRes,
    FetchSavePhotoRes,
    RegEndpointRes,
} from '@/types/fetch.type';

import {
    INITIAL_ENDPOINT,
    SET_GEO_ENDPOINT,
    UPLOAD_PHOTO,
    DELETE_PHOTO,
    REG_ENDPOINT,
    LOG_ENDPOINT,
    PLANS_GET_ENDPOINT,
    PLANS_SET_ENDPOINT,
    REFERAL_LINK,
    USER_ENDPOINT,
} from '@/config/env.config';

import {
    ESex,
    EProfileRoles,
    EProfileStatus,
    ELineStatus,
    type IState,
    type AsyncThunkRes 
} from '@/types/store.types';

import {
    setLoad,
    setIsFirstly,
    setApiRes,
    addPhotoInCashe,
    delPhotoInCashe,
    resetPhotosCashe,
} from './settingsSlice';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { delay } from '@/funcs/general.funcs';
import { getTgID } from '@/funcs/tg.funcs';
import { EApiStatus } from '@/types/settings.type';
import { KeyFQBtnText } from '@/types/register.typs';
import type { AxiosResponse, AxiosProgressEvent  } from 'axios';

import api from '@/config/fetch.config';


const initialState: ProfileState = {
    info: {
        id: '',
        photos: [],
        enableGeo: false,
        latitude: null,
        longitude: null,
        lineStat: ELineStatus.Online,
        role: EProfileRoles.User,
        status: EProfileStatus.Noob,
        name: '',
        age: null,
        town: '',
        sex: ESex.Male,
        bio: '',
        interest: '',
        selSex: ESex.All,
        referralCode: '',
    },
    addLink: '',
    eveningPlans: {
        isCurrent: false,
        remains: null,
        plan: {
            value: '',
            description: '',
        },
        location: {
            value: '',
            description: '',
        },
    },
    selPsych: ''
}

export const initProfileAsync = createAsyncThunk(
    'profile/init-profile',
    async ( _, { getState, dispatch } ): Promise<AsyncThunkRes<EProfileStatus>> => {
        try {
            const telegramId = getTgID() || '3799365';

            if(!telegramId) return 'error';

            const rootState = getState() as IState;
            const profileInfo = rootState.profile.info;
            
            dispatch(setInfo({...profileInfo, id: telegramId}));

            const data = { telegramId };

            const response: AxiosResponse<FetchResponse<EProfileStatus>> = await api.post(INITIAL_ENDPOINT, data);

            if(
                response.status !== 200 ||
                !response.data.success  ||
                !response.data.data     ||
                response.data.data === 'None'
            ) {
                dispatch(setIsFirstly(true));

                return null;
            };

            dispatch(setIsFirstly(false));

            return response.data.data;

        } catch (error) {
            dispatch(setIsFirstly(true));

            return 'error';
        }
    }
);

export const sendSelfGeoAsync = createAsyncThunk(
    'profile/send-self-geo',
    async (data: SendGeoData, {dispatch}): Promise<AsyncThunkRes<FetchGeoRes>> => {
        try {
            const response: AxiosResponse<FetchResponse<FetchGeoRes>> = await api.post(SET_GEO_ENDPOINT, data);

            if (
                response.status === 201 &&
                response.data.data &&
                response.data.data !== 'None' &&
                response.data.success
            ) {
                dispatch(setGeoCoords({
                    latitude: data.latitude,
                    longitude: data.longitude,
                }))

                return response.data.data
            };

            dispatch(setApiRes({
                value: true,
                msg: 'Не удалось узнать ваш город или он не находится в разрешённом списке!',
                status: EApiStatus.Info,
                timestamp: Date.now(),
            }))

            return null;
        } catch (error) {
            return 'error';
        }
    }
);

export const saveSelfPhotoAsync = createAsyncThunk(
    'profile/save-self-photo',
    async (data: SavePhotoAsyncThuncData, { dispatch, getState }): Promise<AsyncThunkRes<PhotoItem>> => {
        try {
            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;
    
            const formData = new FormData();
            formData.append('photo', data.photo);
            formData.append('telegramId', telegramId);
    
            const response: AxiosResponse<FetchResponse<FetchSavePhotoRes>> = await api.post(UPLOAD_PHOTO, formData, {
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    if (progressEvent.total) {
                      const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                      data.setUploadProgress(percent);
                    }
                }
            });
    
            if(
                response.status === 201 &&
                response.data.data &&
                response.data.data !== 'None' &&
                response.data.success
            ) {
                const photoUrl = URL.createObjectURL(data.photo);
                const id = String(response.data.data.photoId);

                dispatch(addPhotoInCashe(id));

                return {
                    id,
                    photo: photoUrl,
                } as PhotoItem;
            }
    
            return null;
        } catch (error) {
            return 'error';
        }
    }
);

export const deleteSelfPhotoAsync = createAsyncThunk(
    'profile/delete-self-photo',
    async (id: string, { dispatch, getState }): Promise<AsyncThunkRes<string>> => {
        try {
            const rootState = getState() as IState;

            if(rootState.settings.photosCashe.includes(id)) {
                dispatch(delPhotoInCashe(id));

                return id;
            };

            if(rootState.profile.info.photos.length === 1) {
                return id;
            };

            const telegramId = rootState.profile.info.id;

            const data = {
                telegramId,
                photoId: id,
            }

            const response: AxiosResponse<FetchResponse<any>> = await api.post(DELETE_PHOTO, data);

            if(
                response.status === 200 &&
                response.data.success
            ) return id;

            dispatch(setApiRes({
                value: true,
                msg: 'Нельзя удалить последнюю сохранённую фотографию',
                status: EApiStatus.Warning,
                timestamp: Date.now(),
            }));

            return null;
        } catch (error) {
            dispatch(setApiRes({
                value: true,
                msg: 'Ошибка удаления фотограяии',
                status: EApiStatus.Error,
                timestamp: Date.now(),
            }));

            return 'error';
        }
    }
);

export const signUpProfileAsync = createAsyncThunk(
    'profile/sign-up-profile',
    async (mark: KeyFQBtnText, { getState, dispatch }): Promise<AsyncThunkRes<'success'>> => {
        try {
            const rootState = getState() as IState;
            const profileInfo = rootState.profile.info;
            const lang = rootState.settings.lang;

            const interestsVars = rootState.settings.interestsVars;

            const interestId = interestsVars.find(
                item => item.value === profileInfo.interest
            )?.id;

            if(interestId === undefined) return null;

            const data = {
                telegramId: profileInfo.id,
                name: profileInfo.name,
                town: profileInfo.town,
                sex: profileInfo.sex,
                selSex: profileInfo.selSex,
                bio: profileInfo.bio,
                age: profileInfo.age,
                enableGeo: profileInfo.enableGeo,
                ...(profileInfo.enableGeo && {
                    latitude: profileInfo.latitude,
                    longitude: profileInfo.longitude,
                }),
                lang,
                photoIds: profileInfo.photos.map(item => +item.id),
                interestId,
            }

            let response;
            let msg: string = '';

            switch(mark) {
                case KeyFQBtnText.First:
                    response = await api.post(REG_ENDPOINT, data) as AxiosResponse<FetchResponse<RegEndpointRes>>;
                    msg = 'Регистрация пользователя прошла успешно';
                    break;
                case KeyFQBtnText.Other:
                    response = await api.patch(`${USER_ENDPOINT}/${profileInfo.id}`, data) as AxiosResponse<FetchResponse<any>>;
                    msg = 'Профиль обновлён успешно';
                    break;
            }

            if(
                response &&
                [200, 201].includes(response.status) &&
                response.data.success
            ) {
                dispatch(setApiRes({
                    value: true,
                    msg,
                    status: EApiStatus.Success,
                    timestamp: Date.now(),
                }));

                console.log(response);

                dispatch(resetPhotosCashe());
                
                return 'success';
            }
    
            return null;
        } catch ( error ) {
            dispatch(setApiRes({
                value: true,
                msg: 'Произошла ошибка сервера',
                status: EApiStatus.Error,
                timestamp: Date.now(),
            }));

            return 'error';
        }
    }
);

export const getSelfProfile = createAsyncThunk(
    'profile/get-self-profile',
    async (_, { getState, dispatch }): Promise<AsyncThunkRes<ProfileSelf>> => {
        const rootState = getState() as IState;
        const isLoad = rootState.settings.load;

        let needSetLoad = !isLoad;

        try {
            if(needSetLoad) dispatch(setLoad(true));
            
            const telegramId = rootState.profile.info.id;

            const data = { telegramId };

            const response: AxiosResponse<FetchResponse<any>> = await api.post(LOG_ENDPOINT, data);

            if(
                response.status === 200 &&
                response.data.data &&
                response.data.data !== 'None' &&
                response.data.success
            ) {
                const referralCode = response.data.data.referralCode;

                const data: ProfileSelf = {
                    id: telegramId,
                    photos: response.data.data.photos.map((item: any) => ({id: item.id, photo: item.url})),
                    enableGeo: response.data.data.enableGeo,
                    latitude: response.data.data.latitude || null,
                    longitude: response.data.data.longitude || null,
                    lineStat: ELineStatus.Online,
                    role: response.data.data.role,
                    status: response.data.data.status,
                    name: response.data.data.name,
                    age: response.data.data.age,
                    town: response.data.data.town,
                    sex: response.data.data.sex,
                    bio: response.data.data.bio,
                    interest: response.data.data.interest.value,
                    selSex: response.data.data.selSex,
                    referralCode,
                }

                referralCode && dispatch(
                    setAddLink(REFERAL_LINK(
                        response.data.data.role,
                        referralCode,
                    ))
                )

                return data
            }

            return null;

        } catch (error) {
            return 'error';
        } finally {
            if(needSetLoad) dispatch(setLoad(false));
        }
    }
);

export const getSelfPlansAsync = createAsyncThunk(
    'profile/get-self-plans',
    async (_, { getState }): Promise<AsyncThunkRes<EveningPlans>> => {
        try {
            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;
            
            const response: AxiosResponse<FetchResponse<EveningPlans>> = 
                await api.get(`${PLANS_GET_ENDPOINT}/${telegramId}`);

            if(
                response.status === 200 &&
                response.data.data &&
                response.data.data !== 'None' &&
                response.data.success
            ) return response.data.data;

            return null;
        } catch (error) {
            return 'error';
        }
    }
);

export const saveSelfPlansAsync = createAsyncThunk(
    'profile/save-self-plans',
    async (_, {getState}): Promise<AsyncThunkRes<EveningPlans>> => {
        try {
            const rootState = getState() as IState;
            const eveningPlans = rootState.profile.eveningPlans;
            const telegramId = rootState.profile.info.id;

            const targetPlans = rootState.settings.plansVars.find(
                item => item.value === eveningPlans.plan.value
            );

            const targetDistrict = rootState.settings.districtsVars.find(
                item => item.value === eveningPlans.location.value
            );

            if(!targetPlans?.id || !targetDistrict?.id) {
                return 'error'
            }

            const data = {
                telegramId,
                planId: targetPlans.id,
                planDescription: eveningPlans.plan.description,
                regionId: targetDistrict.id,
                regionnDescription: eveningPlans.location.description,
            }

            const response: AxiosResponse<FetchResponse<EveningPlans>> = 
                await api.post(PLANS_SET_ENDPOINT, data);

            if(
                response.status === 201 &&
                response.data.data &&
                response.data.data !== 'None' &&
                response.data.success
            ) return response.data.data;

            return null;
        } catch (error) {
            return 'error';
        }
    }
);

export const selectSelfPsychAsync = createAsyncThunk(
    'profile/select-self-psych',
    async (id: string): Promise<AsyncThunkRes<string>> => {
        try {
            await delay(1000);

            return id;
        } catch (error) {
            return 'error';
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setInfo: (state, action: PayloadAction<ProfileSelf>): void => {
            state.info = action.payload;
        },
        setGeoCoords: (state, action: PayloadAction<ProfileSelfGeo>): void => {
            state.info.latitude = action.payload.latitude;
            state.info.longitude = action.payload.longitude;
        },
        setPlan: (state, action: PayloadAction<EveningPlansItem>): void => {
            state.eveningPlans.plan = action.payload;
        },
        setPlanMeta: (state, action: PayloadAction<EveningPlansMeta>): void => {
            state.eveningPlans.isCurrent = action.payload.isCurrent;
            state.eveningPlans.remains = action.payload.remains;
        },
        setLocation: (state, action: PayloadAction<EveningPlansItem>): void => {
            state.eveningPlans.location = action.payload;
        },
        setAddLink: (state, action: PayloadAction<string>): void => {
            state.addLink = action.payload;
        }
    },
    extraReducers: builder => {
        // Первичная проверка пользователя
        builder.addCase(initProfileAsync.pending, _ => {
            console.log("Первичная проверка пользователя");
        })
        builder.addCase(initProfileAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<EProfileStatus>> ) => {
            switch (action.payload) {
                case 'error':
                    console.log("Ошибка при первичной проверки пользователя");
                    break;
                case null:
                    console.log("Первичная проверка пользователя не проведена");
                    break;
                default:
                    state.info.status = action.payload;
                    state.info.enableGeo = true;
                    console.log("Успешная первичная проверка пользователя");
                    break;
            }
        })
        builder.addCase(initProfileAsync.rejected, _ => {
            console.log("Ошибка при первичной проверки пользователя");
        })

        // Отправка личного geo
        builder.addCase(sendSelfGeoAsync.pending, _ => {
            console.log("Отправка личного geo");
        })
        builder.addCase(sendSelfGeoAsync.fulfilled, (state, action: PayloadAction<AsyncThunkRes<FetchGeoRes>>) => {
            switch (action.payload) {
                case 'error':
                    console.log("Ошибка при отправке личного geo");
                    break;
                case null:
                    console.log("Личный geo не отправлен");
                    break;
                default:
                    state.info.town = action.payload.city;
                    state.info.enableGeo = true;
                    console.log("Успешная отправка личного geo");
                    break;
            }
        })
        builder.addCase(sendSelfGeoAsync.rejected, _ => {
            console.log("Ошибка при отправке личного geo");
        })

        //Отправка сообщения на добавление фотографии пользвателя
        builder.addCase(saveSelfPhotoAsync.pending, _ => {
            console.log("Отправка сообщения на добавление фотографии пользвателя");
        })
        builder.addCase(saveSelfPhotoAsync.fulfilled, (state, action: PayloadAction<AsyncThunkRes<PhotoItem>>) => {
            switch (action.payload) {
                case 'error':
                    console.log("Ошибка при отправке сообщения на добавление фотографии пользвателя");
                    break;
                case null:
                    console.log("Фотография не добавлена");
                    break;
                default:
                    state.info.photos.push(action.payload);
                    console.log("Успешная отправка сообщения на добавление фотографии пользвателя");
                    break;
            }
        })
        builder.addCase(saveSelfPhotoAsync.rejected, _ => {
            console.log("Ошибка при отправке сообщения на добавление фотографии пользвателя");
        })

        //Отправка сообщения на удаление фотографии пользвателя
        builder.addCase(deleteSelfPhotoAsync.pending, _ => {
            console.log("Отправка сообщения на удаление фотографии пользвателя");
        })
        builder.addCase(deleteSelfPhotoAsync.fulfilled, (state, action: PayloadAction<AsyncThunkRes<string>>) => {
            switch (action.payload) {
                case 'error':
                    console.log("Ошибка при отправке сообщения на удаление фотографии пользвателя");
                    break;
                case null:
                    console.log("Фотография не удалилась");
                    break;
                default:
                    state.info.photos = state.info.photos.filter(item => item.id !== action.payload);
                    console.log("Успешная отправка сообщения на удаление фотографии пользвателя");
                    break;
            }
        })
        builder.addCase(deleteSelfPhotoAsync.rejected, _ => {
            console.log("Ошибка при отправке сообщения на удаление фотографии пользвателя");
        })

        // Регистрация профиля пользователя
        builder.addCase(signUpProfileAsync.pending, _ => {
            console.log("Регистрация профиля пользователя");
        })
        builder.addCase(signUpProfileAsync.fulfilled, ( _, action: PayloadAction<AsyncThunkRes<'success'>> ) => {
            switch (action.payload) {
                case 'error':
                    console.log("Ошибка регистрации профиля пользователя");
                    break;
                case null:
                    console.log("Регистрация профиля пользователя не прошла");
                    break;
                case 'success':
                    console.log("Успешная регистрация профиля пользователя");
                    break;
            }
        })
        builder.addCase(signUpProfileAsync.rejected, _ => {
            console.log("Ошибка регистрации профиля пользователя");
        })

        // Получение текущего профиля пользователя
        builder.addCase(getSelfProfile.pending, _ => {
            console.log("Получение текущего профиля пользователя");
        })
        builder.addCase(getSelfProfile.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<ProfileSelf>> ) => {
            switch (action.payload) {
                case 'error':
                    console.log("Ошибка получения текущего профиля пользователя");
                    break;
                case null:
                    console.log("Профиль текущего пользователя не получен");
                    break;
                default:
                    state.info = action.payload;
                    console.log("Успешное получение текущего профиля пользователя");
                    break;
            }
        })
        builder.addCase(getSelfProfile.rejected, _ => {
            console.log("Ошибка получения текущего профиля пользователя");
        })

        // Получение планов пользователя
        builder.addCase(getSelfPlansAsync.pending, _ => {
            console.log("Получение текущих планов пользователя");
        })
        builder.addCase(getSelfPlansAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<EveningPlans>> ) => {
            switch (action.payload) {
                case 'error':
                    console.log("Ошибка получения текущих планов пользователя");
                    break;
                case null:
                    console.log("Текущие планы пользователя не получены");
                    break;
                default:
                    state.eveningPlans = action.payload;
                    console.log("Успешное получение текущих планов пользователя");
                    break;
            }
        })
        builder.addCase(getSelfPlansAsync.rejected, _ => {
            console.log("Ошибка получения текущих планов пользователя");
        })

        // Обновление планов пользователя
        builder.addCase(saveSelfPlansAsync.pending, _ => {
            console.log("Обновление планов пользователя");
        })
        builder.addCase(saveSelfPlansAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<EveningPlans>> ) => {
            switch (action.payload) {
                case 'error':
                    console.log("Ошибка обновления планов пользователя");
                    break;
                case null:
                    console.log("Планы пользователя не обновлены");
                    break;
                default:
                    state.eveningPlans = action.payload;
                    console.log("Успешное обновление планов пользователя");
                    break;
            }
        })
        builder.addCase(saveSelfPlansAsync.rejected, _ => {
            console.log("Ошибка обновления планов пользователя");
        })

        // Выбор специалиста
        builder.addCase(selectSelfPsychAsync.pending, _ => {
            console.log("Выбор специалиста");
        })
        builder.addCase(selectSelfPsychAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<string>> ) => {
            switch (action.payload) {
                case 'error':
                    console.log("Ошибка выбора специалиста");
                    break;
                case null:
                    console.log("Специалист не выбран");
                    break;
                default:
                    state.selPsych = action.payload;
                    console.log("Успешный выбор специалиста");
                    break;
            }
        })
        builder.addCase(selectSelfPsychAsync.rejected, _ => {
            console.log("Ошибка выбора специалиста");
        })
    }
})

export const {
    setInfo,
    setGeoCoords,
    setPlan,
    setPlanMeta,
    setLocation,
    setAddLink
} = profileSlice.actions;
export default profileSlice.reducer;

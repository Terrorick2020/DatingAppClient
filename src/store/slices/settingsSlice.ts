import {
    ELanguage,
    EComplaintType,
    EApiStatus,
    EComplaintStep,
    type Complaint,
    type FQErrors,
    type FEPErrors,
    type SettingsState,
    type BaseVarsItem,
    type InterestsVarsItem,
    type SetApiRes,
    type SelSexVarsItem,
    type BadgeBlock,
    type InitEPCtxAsyncRes,
} from '@/types/settings.type';

import {
    dfltErrItem,
    badgeEmptyItem,
} from '@/constant/settings';

import {
    LinkPageType,
    type IState,
    type AsyncThunkRes,
    type InitFillingQuestRes,
} from '@/types/store.types';

import {
    HELP_INTERESTS_ENDPOINT,
    HELP_CITYES_ENDPOINT,
    HELP_REGIONS_ENDPOINT,
    HELP_PLANS_ENDPOINT,
    HELP_GLOB_COMPLAINTS_ENDPOINT,
    HELP_DESC_COMPLAINTS_ENDPOINT,
    COMPLS_ENDPOINT,
} from '@/config/env.config';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setInfo } from './profileSlice';
import { delay } from '@/funcs/general.funcs';
import type { FetchResponse } from '@/types/fetch.type';
import type { AxiosResponse } from 'axios';

import api from '@/config/fetch.config';


export const initialState: SettingsState = {
    routes: [],
    lang: ELanguage.Russian,
    load: false,
    apiRes: {
        value: false,
        msg: '',
        status: EApiStatus.Info,
        timestamp: null,
    },
    fQErrors: {
        photErr: dfltErrItem,
        nameErr: dfltErrItem,
        cityErr: dfltErrItem,
        ageErr: dfltErrItem,
        bioErr: dfltErrItem,
    },
    fEPErrors: {
        descPlanErr: dfltErrItem,
        districtErr: dfltErrItem,
        descDistErr: dfltErrItem,
    },
    cityesVars: [],
    interestsVars: [],
    selSexVars: [],
    complaint: {
        open: false,
        type: EComplaintType.Load,
        step: EComplaintStep.FStep,
        to: '',
        value: '',
        valueGlob: '',
        query: '',
        complaintsVars: [],
    },
    mediaLink: '',
    plansVars: [],
    districtsVars: [],
    badge: {
        chats: badgeEmptyItem,
        likes: badgeEmptyItem,
    },
};

export const initFillingQuestAsync = createAsyncThunk(
    'settings/init-interest-variants',
    async (_, { getState, dispatch  }): Promise<AsyncThunkRes<InitFillingQuestRes>> => {
        const rootState = getState() as IState;
        const isLoad = rootState.settings.load;

        let needSetLoad = !isLoad;

        try {
            if(needSetLoad) dispatch(setLoad(true));

            const [cityesRes, interestsRes]: [
                cityes: AxiosResponse<FetchResponse<BaseVarsItem[]>>,
                interests: AxiosResponse<FetchResponse<InterestsVarsItem[]>>,
            ] = await Promise.all([
                api.get(HELP_CITYES_ENDPOINT),
                api.get(HELP_INTERESTS_ENDPOINT),
            ]);

            if(
                cityesRes.status === 200 &&
                cityesRes.data.data &&
                cityesRes.data.data !== 'None' &&
                cityesRes.data.success &&
                interestsRes.status === 200 &&
                interestsRes.data.data &&
                interestsRes.data.data !== 'None' &&
                interestsRes.data.success
            ) {
                const response: InitFillingQuestRes = {
                    cityes: cityesRes.data.data,
                    interests: interestsRes.data.data,
                };

                const profileState = rootState.profile;

                if( !profileState.info.interest ) {
                    dispatch(setInfo({
                        ...profileState.info,
                        interest: response.interests[0].value,
                    }))
                }

                return response
            };

            return null;

        } catch (error) {
            return 'error';
        } finally {
            if(needSetLoad) dispatch(setLoad(false));
        }
    }
);

export const initComplaintsVarsAsync = createAsyncThunk(
    'settings/init-complaints-variants',
    async (_, { dispatch, getState }): Promise<AsyncThunkRes<BaseVarsItem[]>> => {
        const rootState = getState() as IState;
        const compalint = rootState.settings.complaint;

        try {
            dispatch(setComplCtx(EComplaintType.Load));

            let result: BaseVarsItem[] | null = null;
            let response: AxiosResponse<FetchResponse<BaseVarsItem[]>> | null = null;

            if (!compalint.value) {
                response = await api.get(HELP_GLOB_COMPLAINTS_ENDPOINT);
            } else {
                const data = { globVal: compalint.value };

                response = await api.post(HELP_DESC_COMPLAINTS_ENDPOINT, data);

                !compalint.valueGlob && dispatch(setGlobValueComplaint(compalint.value));
            }

            if(
                response &&
                [200, 201].includes(response.status) &&
                response.data.data &&
                response.data.data !== 'None' &&
                response.data.success
            ) result = response.data.data;
    
            return result;
        } catch (error) {
            return 'error';
        } finally {
            if (compalint.value) {
                switch (compalint.step) {
                    case EComplaintStep.FStep:
                        dispatch(setComplStep(EComplaintStep.SStep));
                        break;
                    case EComplaintStep.SStep:
                        dispatch(setComplStep(EComplaintStep.TStep));
                        break;
                }
            }

            dispatch(setComplCtx(EComplaintType.Content));
        }
    }
);

export const sendComplaintAsync = createAsyncThunk(
    'settings/send-complaint',
    async (_, {dispatch, getState}): Promise<AsyncThunkRes<'success'>> => {
        try {
            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;
            const complaint = rootState.settings.complaint;

            const data = {
                fromUserId: telegramId,
                reportedUserId: complaint.to,
                type: `${complaint.valueGlob}, ${complaint.value}`,
                description: complaint.query,
                // reportedContentId: "msg_123456",
            };

            const response: AxiosResponse<FetchResponse<any>> = await api.post(COMPLS_ENDPOINT, data);

            if(
                response.status === 201 &&
                response.data.success
            ) return 'success';

            return null;
        } catch (error) {
            return 'error';
        } finally {
            dispatch(resetComplaint());
        }
    },
);

export const initEPCtxAsync = createAsyncThunk(
    'settings/init-ep-ctx',
    async (_, {getState, dispatch}): Promise<AsyncThunkRes<InitEPCtxAsyncRes>> => {
        try {
            dispatch(setLoad(true));

            const rootState = getState() as IState;
            const cityesVars = rootState.settings.cityesVars;

            let cityesVarsRes: BaseVarsItem[] = [];

            if( !cityesVars.length ) {
                const cityesRes: AxiosResponse<FetchResponse<BaseVarsItem[]>> = await api.get(HELP_CITYES_ENDPOINT);

                if(
                    cityesRes.status === 200 &&
                    cityesRes.data.data &&
                    cityesRes.data.data !== 'None' &&
                    cityesRes.data.success
                ) {
                    cityesVarsRes = cityesRes.data.data;

                    dispatch(setCityes(cityesRes.data.data));
                }
            } else {
                cityesVarsRes = cityesVars;
            }

            if(!cityesVarsRes.length) return 'error';

            const targetCity = cityesVarsRes.find(
                item => item.value === rootState.profile.info.town
            );

            if(!targetCity?.id) return 'error';

            const data = {
                cityId: targetCity.id,
            }

            const [plansRes, districtsRes]: [
                plansRes: AxiosResponse<FetchResponse<BaseVarsItem[]>>,
                districtsRes: AxiosResponse<FetchResponse<BaseVarsItem[]>>,
            ] = await Promise.all([
                api.get(HELP_PLANS_ENDPOINT),
                api.post(HELP_REGIONS_ENDPOINT, data),
            ]);

            if (
                plansRes.status === 200 &&
                plansRes.data.data &&
                plansRes.data.data !== 'None' &&
                plansRes.data.success &&
                districtsRes.status === 201 &&
                districtsRes.data.data &&
                districtsRes.data.data !== 'None' &&
                districtsRes.data.success
            ) return {
                plans: plansRes.data.data,
                districts: districtsRes.data.data,
            }

            return null;
        } catch (error: any) {
            return 'error';
        } finally {
            dispatch(setLoad(false));
        }
    }
);

export const initMediaLinkAsync = createAsyncThunk(
    'settings/init-media-link',
    async (_linkType: LinkPageType): Promise<AsyncThunkRes<string>> => {
        try {
            await delay(2000);

            return 'https://storage.yandexcloud.net/photodatingapp/' +
                    '1.MOV?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=' +
                    'YCAJE2WAntPULZcEo0LlklLMu%2F20250429%2Fru-central1%2Fs3%' +
                    '2Faws4_request&X-Amz-Date=20250429T165117Z&X-Amz-Expires' +
                    '=108000&X-Amz-Signature=6dc73f2a9ed9d1a4703f787fd4aec413' +
                    '1ee3c3ea75c8adffbcdbae10db54d5ed&X-Amz-SignedHeaders=host';
        } catch (error) {
            return 'error';
        }
    }
);

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setLang: (state, action: PayloadAction<ELanguage>): void => {
            state.lang = action.payload;
        },
        addRoute: (state, action: PayloadAction<string>): void => {
            state.routes.push(action.payload);
        },
        dellRoute: (state): void => {
            state.routes.pop();
        },
        resetRoutes: (state): void => {
            state.routes = [];
        },
        setSelSexVars: (state, action: PayloadAction<SelSexVarsItem[]>): void => {
            state.selSexVars = action.payload;
        },
        setLoad: (state, action: PayloadAction<boolean>): void => {
            state.load = action.payload;
        },
        setApiRes: (state, action: PayloadAction<SetApiRes>): void => {
            state.apiRes = action.payload;
        },
        resetApiRes: (state): void => {
            state.apiRes = {
                value: false,
                msg: '',
                status: EApiStatus.Info,
                timestamp: null,
            };
        },
        setFQErrors: (state, action: PayloadAction<FQErrors>): void => {
            state.fQErrors = action.payload;
        },
        setEPErrors: (state, action: PayloadAction<FEPErrors>): void => {
            state.fEPErrors = action.payload;
        },
        setComplOpen: (state, action: PayloadAction<boolean>): void => {
            state.complaint.open = action.payload;
        },
        setComplCtx: (state, action: PayloadAction<EComplaintType>): void => {
            state.complaint.type = action.payload;
        },
        setComplStep: (state, action: PayloadAction<EComplaintStep>): void => {
            state.complaint.step = action.payload;
        },
        setComplaint: (state, action: PayloadAction<Complaint>): void => {
            state.complaint = action.payload;
        },
        resetComplaint: (state): void => {
            state.complaint = {
                open: false,
                type: EComplaintType.Load,
                step: EComplaintStep.FStep,
                to: '',
                value: '',
                valueGlob: '',
                query: '',
                complaintsVars: [],
            }
        },
        setGlobValueComplaint: (state, action: PayloadAction<string>): void => {
            state.complaint.valueGlob = action.payload;
        },
        setBadge: (state, action: PayloadAction<BadgeBlock>): void => {
            state.badge = action.payload
        },
        setCityes: (state, action: PayloadAction<BaseVarsItem[]>): void => {
            state.cityesVars = action.payload;
        },
    },
    extraReducers: builder => {
        // Получение варианетов интересов
        builder.addCase(initFillingQuestAsync.pending, _ => {
            console.log("Получение варианетов интересов");
        })
        builder.addCase(initFillingQuestAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<InitFillingQuestRes>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получния вариантов интереесов");
                    break;
                case null:
                    console.log("Варианты интересов не получены");
                    break;
                default:
                    state.cityesVars = action.payload.cityes;
                    state.interestsVars = action.payload.interests;
                    console.log("Варианты интересов успешно полученый");
                    break;
            }
        })
        builder.addCase(initFillingQuestAsync.rejected, _ => {
            console.log("Ошибка получния вариантов интереесов");
        })

        // Получение варианетов жалоб
        builder.addCase(initComplaintsVarsAsync.pending, _ => {
            console.log("Получение варианетов жалоб");
        })
        builder.addCase(initComplaintsVarsAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<BaseVarsItem[]>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получния вариантов жалоб");
                    break;
                case null:
                    console.log("Варианты жалоб не получены");
                    break;
                default:
                    state.complaint.complaintsVars = action.payload;
                    console.log("Варианты жалоб успешно получены");
                    break;
            }
        })
        builder.addCase(initComplaintsVarsAsync.rejected, _ => {
            console.log("Ошибка получния вариантов жалоб");
        })

        // Получение вариантов планов и районов
        builder.addCase(initEPCtxAsync.pending, _ => {
            console.log("Получение вариантов планов и районов");
        })
        builder.addCase(initEPCtxAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<InitEPCtxAsyncRes>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получния вариантов планов и районов");
                    break;
                case null:
                    console.log("Варианты планов и районов не получены");
                    break;
                default:
                    state.plansVars = action.payload.plans;
                    state.districtsVars = action.payload.districts;
                    console.log("Варианты планов и районов успешно загружены");
                    break;
            }
        })
        builder.addCase(initEPCtxAsync.rejected, _ => {
            console.log("Ошибка получния вариантов планов и районов");
        })

        // Получение ссылки видео
        builder.addCase(initMediaLinkAsync.pending, _ => {
            console.log("Получение ссылки видео");
        })
        builder.addCase(initMediaLinkAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<string>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получения ссылки видео");
                    break;
                case null:
                    console.log("Ссылка на видео не получена");
                    break;
                default:
                    state.mediaLink = action.payload;
                    console.log("Успешное получение ссылки видео");
                    break;
            }
        })
        builder.addCase(initMediaLinkAsync.rejected, _ => {
            console.log("Ошибка получения ссылки видео");
        })
    }
});

export const {
    setLang,
    addRoute,
    dellRoute,
    resetRoutes,
    setSelSexVars,
    setLoad,
    setApiRes,
    resetApiRes,
    setFQErrors,
    setEPErrors,
    setComplOpen,
    setComplCtx,
    setComplStep,
    setComplaint,
    setGlobValueComplaint,
    resetComplaint,
    setCityes,
} = settingsSlice.actions;
export default settingsSlice.reducer;

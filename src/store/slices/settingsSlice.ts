import {
    ELanguage,
    EComplaintType,
    EApiStatus,
    EComplaintStep,
    EBadgeType,
    ELikeBtnType,
    type Complaint,
    type FQErrors,
    type FEPErrors,
    type SettingsState,
    type BaseVarsItem,
    type CityesVarsItem,
    type DistrictVarsItem,
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

import type {
    IState,
    AsyncThunkRes,
    InitFillingQuestRes,
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
import { connectSocketRoom } from '@/config/socket.config';
import { ServerMethods } from '@/types/socket.types';
import { setInfo, setPlan } from './profileSlice';
import type { FetchResponse } from '@/types/fetch.type';
import type { AxiosResponse } from 'axios';

import api from '@/config/fetch.config';


export const initialState: SettingsState = {
    isFirstly: true,
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
    photosCashe: [],
    likeBtnType: ELikeBtnType.Accepted,
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
                cityes: AxiosResponse<FetchResponse<CityesVarsItem[]>>,
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
            const city = rootState.profile.info.town;
            const cityesVars = rootState.settings.cityesVars;

            let cityesVarsRes: CityesVarsItem[] = [];

            if( !cityesVars.length ) {
                const cityRes: AxiosResponse<FetchResponse<CityesVarsItem>> = await api.get(`${HELP_CITYES_ENDPOINT}/${city}`);

                if (
                    cityRes.status !== 200 ||
                    !cityRes.data.success  ||
                    !cityRes.data.data     ||
                    cityRes.data.data === 'None'
                ) return 'error';

                cityesVarsRes = [ cityRes.data.data ];

                dispatch(setCityes([ cityRes.data.data ]));
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
            };

            const [plansRes, districtsRes]: [
                plansRes: AxiosResponse<FetchResponse<BaseVarsItem[]>>,
                districtsRes: AxiosResponse<FetchResponse<DistrictVarsItem[]>>,
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
            ) {
                const isFirstly = rootState.settings.isFirstly;
                const plan = rootState.profile.eveningPlans.plan;

                const isDispatch = isFirstly || !plan.value;

                isDispatch && dispatch(setPlan({
                    ...plan,
                    value: plansRes.data.data[0].value,
                }))

                return {
                    plans: plansRes.data.data,
                    districts: districtsRes.data.data,
                }
            }

            return null;
        } catch (error: any) {
            return 'error';
        } finally {
            dispatch(setLoad(false));
        }
    }
);

export const initSocketRoomsConnectAsync = createAsyncThunk(
    'settings/init-socket-rooms-connection',
    async (namespaces: string[], {getState}): Promise<AsyncThunkRes<'success'>> => {
        try {
            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;
            
            const socketData = {
                roomName: telegramId,
                telegramId,    
            };

            const responses = await Promise.all([
                namespaces.map(
                    item => connectSocketRoom(item, ServerMethods.JoinRoom, socketData),
                )
            ]);

            for(let item of responses) {
                if(!item) return null
            }

            return 'success';
        } catch (error: any) {
            return 'error';
        }
    }
);

export const initSocketRoomsDisconnectAsync = createAsyncThunk(
    'settings/init-socket-rooms-disconnection',
    async (namespaces: string[], {getState}): Promise<AsyncThunkRes<'success'>> => {
        try {
            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;
            
            const socketData = {
                roomName: telegramId,
                telegramId,    
            };

            const responses = await Promise.all([
                namespaces.map(
                    item => connectSocketRoom(item, ServerMethods.LeaveRoom, socketData),
                )
            ]);

            for(let item of responses) {
                if(!item) return null
            };

            return 'success';
        } catch (error: any) {
            return 'error';
        }
    }
);

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setIsFirstly: (state, action: PayloadAction<boolean>): void => {
            state.isFirstly = action.payload;
        },
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
        resetBadge: (state, action: PayloadAction<EBadgeType>) => {
            switch(action.payload) {
                case EBadgeType.Chats:
                    state.badge.chats = badgeEmptyItem;
                    break;
                case EBadgeType.Likes:
                    state.badge.likes = badgeEmptyItem;
                    break;
            }
        },
        setCityes: (state, action: PayloadAction<CityesVarsItem[]>): void => {
            state.cityesVars = action.payload;
        },
        addPhotoInCashe: (state, action: PayloadAction<string>): void => {
            state.photosCashe.push(action.payload);
        },
        delPhotoInCashe: (state, action: PayloadAction<string>): void => {
            state.photosCashe = state.photosCashe.filter(
                item => item === action.payload
            );
        },
        resetPhotosCashe: state => {
            state.photosCashe = [];
        },
        setMedaiLink: (state, action: PayloadAction<string>): void => {
            state.mediaLink = action.payload;
        },
        setLikeTypeBtn: (state, action: PayloadAction<ELikeBtnType>): void => {
            state.likeBtnType = action.payload;
        },
    },
    extraReducers: builder => {
        // Получение варианетов интересов
        builder.addCase(initFillingQuestAsync.pending, _ => {
            console.log("Получение варианетов интересов");
        })
        builder.addCase(initFillingQuestAsync.fulfilled, ( 
            state, 
            action: PayloadAction<AsyncThunkRes<InitFillingQuestRes>>,
        ) => {
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
        builder.addCase(initComplaintsVarsAsync.fulfilled, (
            state,
            action: PayloadAction<AsyncThunkRes<BaseVarsItem[]>>,
        ) => {
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

        // Подключение к комнатам тунелей ws
        // initSocketRoomsConnectAsync, initSocketRoomsDisconnectAsync
        builder.addCase(initSocketRoomsConnectAsync.pending, _ => {
            console.log("Подключение к комнатам тунелей ws");
        })
        builder.addCase(initSocketRoomsConnectAsync.fulfilled, ( _, action: PayloadAction<AsyncThunkRes<'success'>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка подключения к комнатам тунелей ws");
                    break;
                case null:
                    console.log("К комнатам тунелей ws не подключены");
                    break;
                case 'success':
                    console.log("К комнатам тунелей ws успешно подключены");
                    break;
            }
        })
        builder.addCase(initSocketRoomsConnectAsync.rejected, _ => {
            console.log("Ошибка подключения к комнатам тунелей ws");
        })

        // Отключение от комнат тунелей ws
        builder.addCase(initSocketRoomsDisconnectAsync.pending, _ => {
            console.log("Отключение от комнат тунелей ws");
        })
        builder.addCase(initSocketRoomsDisconnectAsync.fulfilled, ( _, action: PayloadAction<AsyncThunkRes<'success'>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка отключения к комнатам тунелей ws");
                    break;
                case null:
                    console.log("От комнат тунелей ws не отключены");
                    break;
                case 'success':
                    console.log("От комнат тунелей ws успешно отключены");
                    break;
            }
        })
        builder.addCase(initSocketRoomsDisconnectAsync.rejected, _ => {
            console.log("Ошибка отключения к комнатам тунелей ws");
        })
    }
});

export const {
    setIsFirstly,
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
    addPhotoInCashe,
    delPhotoInCashe,
    resetPhotosCashe,
    setMedaiLink,
    setBadge,
    resetBadge,
    setLikeTypeBtn,
} = settingsSlice.actions;
export default settingsSlice.reducer;

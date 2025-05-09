import {
    ELanguage,
    EComplaintType,
    EApiStatus,
    EComplaintStep,
    type SettingsState,
    type InterestsVarsItem,
    type BaseVarsItem,
    type SetApiRes,
} from '@/types/settings.type';

import {
    interestsVarsList,
    complaintsVarsList,
    targetComplaintsVarsList,
    dfltErrItem,
    plansVarsList,
    districtsVarsList,
} from '@/constant/settings';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setInfo } from './profileSlice';
import { delay } from '@/funcs/general.funcs';
import { type IState } from '@/types/store.types';


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
    interestsVars: [],
    selSexVars: [],
    complaint: {
        open: false,
        type: EComplaintType.Load,
        step: EComplaintStep.FStep,
        to: '',
        value: '',
        query: '',
        complaintsVars: [],
    },
    mediaLink: 'https://storage.yandexcloud.net/photodatingapp/1.MOV?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJE2WAntPULZcEo0LlklLMu%2F20250429%2Fru-central1%2Fs3%2Faws4_request&X-Amz-Date=20250429T165117Z&X-Amz-Expires=108000&X-Amz-Signature=6dc73f2a9ed9d1a4703f787fd4aec4131ee3c3ea75c8adffbcdbae10db54d5ed&X-Amz-SignedHeaders=host',
    plansVars: [],
    districtsVars: [],
}

export const initInterestsVariantsAsync = createAsyncThunk(
    'settings/init-interest-variants',
    async (_, { getState, dispatch  }): Promise<InterestsVarsItem[]> => {
        try {
            dispatch(setLoad(true));

            await delay(2000);

            const response = interestsVarsList;

            const rootState = getState() as IState;
            const profileState = rootState.profile;
    
            if( !profileState.info.interest ) {
                dispatch(setInfo({
                    ...profileState.info,
                    interest: response[0].value,
                }))
            }
    
            return response;

        } catch (error) {
            throw error;
        } finally {
            dispatch(setLoad(false));
        }
    }
)

export const initComplaintsVarsAsync = createAsyncThunk(
    'settings/init-complaints-variants',
    async (_, { dispatch, getState }): Promise<BaseVarsItem[]> => {
        const rootState = getState() as IState;
        const compalint = rootState.settings.complaint;

        try {
            dispatch(setComplCtx(EComplaintType.Load));

            await delay(2000);

            if (!compalint.value) return complaintsVarsList;
    
            return targetComplaintsVarsList;
        } catch (error) {
            throw error;
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
)

export const sendComplaintAsync = createAsyncThunk(
    'settings/send-complaint',
    async (_, {dispatch, getState}) => {
        try {
            const rootState = getState() as IState;
            rootState.settings.complaint;

            await delay(2000);
        } catch (error) {
            throw error;
        } finally {
            dispatch(resetComplaint());
        }
    },
)

export const initPlansVarsAsync = createAsyncThunk(
    'settings/init-plans-vars',
    async (_, {dispatch}): Promise<BaseVarsItem[]> => {
        try {
            dispatch(setLoad(true));

            await delay(2000);

            return plansVarsList;
        } catch (error) {
            throw error;
        } finally {
            dispatch(setLoad(false));
        }
    }
)

export const initDistrictsVarsAsync = createAsyncThunk(
    'settings/init-districts-vars',
    async (_, {dispatch}): Promise<BaseVarsItem[]> => {
        try {
            dispatch(setLoad(true));

            await delay(2000);

            return districtsVarsList;
        } catch (error) {
            throw error;
        } finally {
            dispatch(setLoad(false));
        }
    }
)

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setLang: (state, action) => {
            state.lang = action.payload;
        },
        addRoute: (state, action) => {
            state.routes.push(action.payload);
        },
        dellRoute: (state) => {
            state.routes.pop();
        },
        resetRoutes: (state) => {
            state.routes = [];
        },
        setSelSexVars: (state, action) => {
            state.selSexVars = action.payload;
        },
        setLoad: (state, action) => {
            state.load = action.payload;
        },
        setApiRes: (state, action: PayloadAction<SetApiRes>) => {
            state.apiRes = action.payload;
        },
        resetApiRes: (state) => {
            state.apiRes = {
                value: false,
                msg: '',
                status: EApiStatus.Info,
                timestamp: null,
            };
        },
        setFQErrors: (state, action) => {
            state.fQErrors = action.payload;
        },
        setEPErrors: (state, action) => {
            state.fEPErrors = action.payload;
        },
        setComplOpen: (state, action) => {
            state.complaint.open = action.payload;
        },
        setComplCtx: (state, action) => {
            state.complaint.type = action.payload;
        },
        setComplStep: (state, action) => {
            state.complaint.step = action.payload;
        },
        setComplaint: (state, action) => {
            state.complaint = action.payload;
        },
        resetComplaint: (state) => {
            state.complaint = {
                open: false,
                type: EComplaintType.Load,
                step: EComplaintStep.FStep,
                to: '',
                value: '',
                query: '',
                complaintsVars: [],
            }
        },
    },
    extraReducers: builder => {
        // Получение варианетов интересов
        builder.addCase(initInterestsVariantsAsync.pending, _ => {
            console.log("Получение варианетов интересов");
        })
        builder.addCase(initInterestsVariantsAsync.fulfilled, ( state, action ) => {
            console.log("Варианты интересов успешно полученый");
            state.interestsVars = action.payload;
        })
        builder.addCase(initInterestsVariantsAsync.rejected, _ => {
            console.log("Ошибка получния вариантов интереесов");
        })

        // Получение варианетов жалоб
        builder.addCase(initComplaintsVarsAsync.pending, _ => {
            console.log("Получение варианетов жалоб");
        })
        builder.addCase(initComplaintsVarsAsync.fulfilled, ( state, action ) => {
            console.log("Варианты жалоб успешно получены");
            state.complaint.complaintsVars = action.payload;
        })
        builder.addCase(initComplaintsVarsAsync.rejected, _ => {
            console.log("Ошибка получния вариантов жалоб");
        })

        // Получение варианетов планов
        builder.addCase(initPlansVarsAsync.pending, _ => {
            console.log("Получение варианетов планов");
        })
        builder.addCase(initPlansVarsAsync.fulfilled, ( state, action ) => {
            console.log("Варианты планов успешно получены");
            state.plansVars = action.payload;
        })
        builder.addCase(initPlansVarsAsync.rejected, _ => {
            console.log("Ошибка получния вариантов планов");
        })

        // Получение варианетов районов
        builder.addCase(initDistrictsVarsAsync.pending, _ => {
            console.log("Получение варианетов районов");
        })
        builder.addCase(initDistrictsVarsAsync.fulfilled, ( state, action ) => {
            console.log("Варианты районов успешно получены");
            state.districtsVars = action.payload;
        })
        builder.addCase(initDistrictsVarsAsync.rejected, _ => {
            console.log("Ошибка получния вариантов районов");
        })
    }
})

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
    resetComplaint,
} = settingsSlice.actions;
export default settingsSlice.reducer;

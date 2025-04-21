import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ELanguage, EComplaintType } from '@/types/settings.type';
import { dfltErrItem } from '@/constant/settings';
import { interestsVarsList, complaintsVarsList, targetComplaintsVarsList } from '@/constant/settings';
import { setInfo } from './profileSlice';
import { delay } from '@/funcs/general.funcs';
import { EApiStatus } from '@/types/settings.type';
import { type IState } from '@/types/store.types';
import type { SettingsState, InterestsVarsItem, ComplaintsVarsItem } from '@/types/settings.type';


const initialState: SettingsState = {
    routes: [],
    lang: ELanguage.Russian,
    load: false,
    apiRes: EApiStatus.Info,
    fQErrors: {
        photErr: dfltErrItem,
        nameErr: dfltErrItem,
        cityErr: dfltErrItem,
        ageErr: dfltErrItem,
        bioErr: dfltErrItem,
    },
    interestsVars: [],
    selSexVars: [],
    complaint: {
        open: false,
        type: EComplaintType.TxtArea,
        query: '',
        complaintsVars: [],
    },
}

export const initInterestsVariantsAsync = createAsyncThunk(
    'settings/init-interest-variants',
    async (_, { getState, dispatch  }): Promise<InterestsVarsItem[]> => {

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
    }
)

export const initComplaintsVarsAsync = createAsyncThunk(
    'settings/init-complaints-variants',
    async (value: string | null, { dispatch }): Promise<ComplaintsVarsItem[]> => {
        try {
            dispatch(setComplCtx(EComplaintType.Load));
    
            await delay(2000);
    
            if (!value) {
                return complaintsVarsList;
            };
    
    
            return targetComplaintsVarsList;
        } catch (error) {
            throw error;
        } finally {
            dispatch(setComplCtx(EComplaintType.List));
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
        setApiRes: (state, action) => {
            state.apiRes = action.payload;
        },
        setComplOpen: (state, action) => {
            state.complaint.open = action.payload;
        },
        setComplCtx: (state, action) => {
            state.complaint.type = action.payload;
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
            console.log("Варианты жалоб успешно полученый");
            state.complaint.complaintsVars = action.payload;
            state.complaint.type = EComplaintType.TxtArea;
        })
        builder.addCase(initComplaintsVarsAsync.rejected, _ => {
            console.log("Ошибка получния вариантов жалоб");
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
    setComplOpen,
    setComplCtx,
} = settingsSlice.actions;
export default settingsSlice.reducer;

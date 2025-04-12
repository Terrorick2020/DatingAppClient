import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ELanguage, EApiStatus } from '@/types/settings.type';
import { dfltErrItem } from '@/constant/settings';
import { interestsVarsList } from '@/constant/settings';
import { setInfo } from './profileSlice';
import { type IState } from '@/types/store.types';
import type { SettingsState, InterestsVarsItem } from '@/types/settings.type';


const initialState: SettingsState = {
    routes: [],
    lang: ELanguage.Russian,
    load: false,
    apiStatus: EApiStatus.success,
    fQErrors: {
        photErr: dfltErrItem,
        nameErr: dfltErrItem,
        cityErr: dfltErrItem,
        ageErr: dfltErrItem,
        bioErr: dfltErrItem,
    },
    interestsVars: [],
    selSexVars: [],
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
            state.selSexVars = action.payload
        },
        setLoad: (state, action) => {
            state.load = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(initInterestsVariantsAsync.pending, _ => {
            console.log("Получение варианетов интереесов")
        })
        builder.addCase(initInterestsVariantsAsync.fulfilled, ( state, action ) => {
            console.log("Варианты интересов успешно полученый")
            
            state.interestsVars = action.payload
        })
        builder.addCase(initInterestsVariantsAsync.rejected, _ => {
            console.log("Ошибка получния вариантов интереесов")
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
} = settingsSlice.actions;
export default settingsSlice.reducer;

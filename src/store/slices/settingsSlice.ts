import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ELanguage, EApiStatus } from '@/types/settings.type';
import type { SettingsState, InterestsVariant } from '@/types/settings.type';


import { interestsVariantsList } from '@/constant/settings';


const initialState: SettingsState = {
    routes: [],
    lang: ELanguage.Russian,
    load: false,
    apiStatus: EApiStatus.success,
    regInpErr: {
        nameErr: false,
        cityErr: false,
        ageErr: false,
        bioErr: false,
    },
    interestsVariants: [],
}

export const initInterestsVariantsAsync = createAsyncThunk(
    'settings/init-interests-variants',
    async () => {
        return interestsVariantsList;
    }
)

const settingsSlice = createSlice({
    name: 'questionnaires',
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
        }
    },
    extraReducers: builder => {
        builder.addCase(initInterestsVariantsAsync.pending, _ => {
            console.log('Инициализация вариантов интересов!')
        })
        builder.addCase(initInterestsVariantsAsync.fulfilled, ( state, action ) => {
            state.interestsVariants = action.payload as InterestsVariant[]
            console.log('Успешная инициализация вариантов интересов!')
        })
        builder.addCase(initInterestsVariantsAsync.rejected, _ => {
            console.log('Ошибка инициализации вариантов интересов!')
        })
    }
})

export const { setLang, addRoute, dellRoute, resetRoutes } = settingsSlice.actions;
export default settingsSlice.reducer;

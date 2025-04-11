import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ELanguage, EApiStatus } from '@/types/settings.type';
import { dfltErrItem } from '@/constant/settings';
import { interestsVarsList } from '@/constant/settings';
import { type SettingsState } from '@/types/settings.type';


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
}

export const initInterestsVariants = createAsyncThunk(
    'settings/init-interest-variants',
    async () => {
        return interestsVarsList
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
        }
    },
    extraReducers: builder => {
        builder.addCase(initInterestsVariants.pending, _ => {
            console.log("Получение варианетов интереесов")
        })
        builder.addCase(initInterestsVariants.fulfilled, ( state, action ) => {
            console.log("Варианты интересов успешно полученый")
            
            state.interestsVars = action.payload
        })
        builder.addCase(initInterestsVariants.rejected, _ => {
            console.log("Ошибка получния вариантов интереесов")
        })
    }
})

export const { setLang, addRoute, dellRoute, resetRoutes } = settingsSlice.actions;
export default settingsSlice.reducer;

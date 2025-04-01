import { createSlice } from '@reduxjs/toolkit';
import { ELanguage, EApiStatus } from '@/types/settings.type';
import { type SettingsState } from '@/types/settings.type';


const initialState: SettingsState = {
    routes: [],
    lang: ELanguage.Russian,
    load: false,
    apiStatus: EApiStatus.success
}

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
})

export const { setLang, addRoute, dellRoute, resetRoutes } = settingsSlice.actions;
export default settingsSlice.reducer;
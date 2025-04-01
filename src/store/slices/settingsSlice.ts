import { createSlice } from '@reduxjs/toolkit'
import { ELanguage, ETheme, EApiStatus } from '@/types/settings.type'
import { type SettingsState } from '@/types/settings.type'


const initialState: SettingsState = {
    lang: ELanguage.Russian,
    theme: ETheme.dark,
    load: false,
    apiStatus: EApiStatus.success
}

const settingsSlice = createSlice({
    name: 'questionnaires',
    initialState,
    reducers: {
        setLang: (state, action) => {
            state.lang = action.payload
        },
        setTheme: (state, action) => {
            state.theme = action.payload
        },
    },
})

export const { setLang, setTheme } = settingsSlice.actions
export default settingsSlice.reducer
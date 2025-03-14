import { createSlice } from '@reduxjs/toolkit'
import { ELanguage, ETheme } from '@/types/store.types'
import { type SettingsState } from '@/types/store.types'


const initialState: SettingsState = {
    lang: ELanguage.Russian,
    theme: ETheme.dark,
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
        }
    },
})

export const { setLang, setTheme } = settingsSlice.actions
export default settingsSlice.reducer
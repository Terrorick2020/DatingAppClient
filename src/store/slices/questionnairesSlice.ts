import { createSlice } from '@reduxjs/toolkit'
import { type QuestionnairesState } from '@/types/store.types'


const initialState: QuestionnairesState = {
}

const questionnairesSlice = createSlice({
    name: 'questionnaires',
    initialState,
    reducers: {
    },
})

export const {} = questionnairesSlice.actions
export default questionnairesSlice.reducer
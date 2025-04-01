import { createSlice } from '@reduxjs/toolkit';
import { type QuestState } from '@/types/quest.types';


const initialState: QuestState = {
}

const questionnairesSlice = createSlice({
    name: 'questionnaires',
    initialState,
    reducers: {
    },
})

export const {} = questionnairesSlice.actions
export default questionnairesSlice.reducer
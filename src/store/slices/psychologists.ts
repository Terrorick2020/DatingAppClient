import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setLoad } from './settingsSlice';
import { delay } from '@/funcs/general.funcs';
import { psychTestList } from '@/constant/psych';
import type { PsychState, PsychListItem } from '@/types/psych.types';

// import axios from 'axios';


const initialState: PsychState = {
    serchPsychId: '',
    psychList: [],
    targetPsych: {},
}

export const initPsychList = createAsyncThunk(
    'psychologists/init-psych-list',
    async (_, {dispatch}): Promise<PsychListItem[]> => {
        try {
            dispatch(setLoad(true));

            await delay(2000);

            const response = psychTestList;

            return response;
        } catch (error) {
            throw error;
        } finally {
            dispatch(setLoad(false));
        }
    }
)

const psychSlice = createSlice({
    name: 'psychologists',
    initialState,
    reducers: {
        setSerchPsychId: (state, action) => {
            state.serchPsychId = action.payload;
        }
    },
    extraReducers: builder => {
        // Получние списка психологов
        builder.addCase(initPsychList.pending, _ => {
            console.log("Получние списка психологов");
        })
        builder.addCase(initPsychList.fulfilled, ( state, action ) => {
            console.log("Успешное получние списка психологов");
            state.psychList = action.payload;
        })
        builder.addCase(initPsychList.rejected, _ => {
            console.log("Ошибка получния списка психологов");
        })
    }
})

export const { setSerchPsychId } = psychSlice.actions;
export default psychSlice.reducer;

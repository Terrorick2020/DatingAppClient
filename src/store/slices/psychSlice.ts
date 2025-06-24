import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setLoad } from './settingsSlice';
import { delay } from '@/funcs/general.funcs';
import { targerPsychList } from '@/constant/psych';
import { ELineStatus} from '@/types/store.types';
import type { PsychState, PsychListItem, TargerPsych } from '@/types/psych.types';


const initialState: PsychState = {
    serchPsychQuery: '',
    psychList: [],
    targetPsych: {
        id: '',
        photo: null,
        name: '',
        exp: null,
        spec: '',
        lineStat: ELineStatus.Offline,
        desc: '',
        expList: []
    },
}

export const initPsychList = createAsyncThunk(
    'psychologists/init-psych-list',
    async (_, {dispatch}): Promise<PsychListItem[]> => {
        try {
            dispatch(setLoad(true));

            await delay(1000);

            return [];
        } catch (error) {
            throw error;
        } finally {
            dispatch(setLoad(false));
        }
    }
);

export const getPsycByIdhAsync = createAsyncThunk(
    'psychologists/get-target-psych',
    async (id: string, {dispatch}): Promise<TargerPsych | null> => {
        try {
            dispatch(setLoad(true));

            await delay(2000);

            const response = targerPsychList.find(item => item.id === id);

            return response ?? null;
        } catch (error) {
            throw error;
        } finally {
            dispatch(setLoad(false));
        }
    }
);

const psychSlice = createSlice({
    name: 'psychologists',
    initialState,
    reducers: {
        setSerchPsychQuery: (state, action: PayloadAction<string>): void => {
            state.serchPsychQuery = action.payload;
        }
    },
    extraReducers: builder => {
        // Получние списка психологов
        builder.addCase(initPsychList.pending, _ => {
            console.log("Получние списка психологов");
        })
        builder.addCase(initPsychList.fulfilled, ( state, action: PayloadAction<PsychListItem[]> ) => {
            console.log("Успешное получние списка психологов");
            state.psychList = action.payload;
        })
        builder.addCase(initPsychList.rejected, _ => {
            console.log("Ошибка получния списка психологов");
        })

        // Получние выбранного психолога
        builder.addCase(getPsycByIdhAsync.pending, _ => {
            console.log("Получние выбранного психолога");
        })
        builder.addCase(getPsycByIdhAsync.fulfilled, ( state, action: PayloadAction<TargerPsych | null> ) => {
            console.log("Получние выбранного психолога");
            state.targetPsych = action.payload;
        })
        builder.addCase(getPsycByIdhAsync.rejected, _ => {
            console.log("Получние выбранного психолога");
        })
    }
})

export const { setSerchPsychQuery } = psychSlice.actions;
export default psychSlice.reducer;

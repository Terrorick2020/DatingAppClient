import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setLoad } from './settingsSlice';
import { delay } from '@/funcs/general.funcs';
import { psychTestList, targerPsychList } from '@/constant/psych';
import { ELineStatus } from '@/types/store.types';
import type { IState } from '@/types/store.types';
import type { PsychState, PsychListItem, TargerPsych } from '@/types/psych.types';

// import api from '@/config/fetch.config';


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
    async (_, {getState, dispatch}): Promise<PsychListItem[]> => {
        try {
            dispatch(setLoad(true));

            const rootState = getState() as IState;
            const psychState = rootState.psych;

            let response = psychTestList;

            const query =psychState.serchPsychQuery.trim().toLowerCase()

            const retOn = {
                value: 'Onlie',
                query: 'онлайн',
            };
            const retOff = {
                value: 'Offline',
                query: 'оффлайн',
            };

            if( query ) {
                const resIdQuery = psychTestList.filter(item => item.id.includes( query ));
                const resNameQuery = psychTestList.filter(item => item.name.toLowerCase().includes( query ));
                const resSpecQuery = psychTestList.filter(item => item.spec.toLowerCase().includes( query ));
                const resExpQuery = psychTestList.filter(item => item.exp === +query );


                const resLineQuery = psychTestList.filter(item => {
                    if ( retOn.query.includes( query ) ) {
                        return item.lineStat === retOn.value;
                    } else if ( retOff.query.includes( query ) ) {
                        return item.lineStat === retOff.value;
                    }

                    return false;
                });

                const combined = [
                    ...resIdQuery,
                    ...resNameQuery,
                    ...resSpecQuery,
                    ...resExpQuery,
                    ...resLineQuery,
                ];
            
                const uniqueById = Array.from(
                    new Map(combined.map(item => [item.id, item])).values()
                );
            
                response = uniqueById;
            }

            await delay(2000);

            return response;
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

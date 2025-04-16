import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setLoad } from './settingsSlice';
import { delay } from '@/funcs/general.funcs';
import { slidersList } from '@/constant/quest';
import type { QuestState, SliderItem } from '@/types/quest.types';


const initialState: QuestState = {
    sliderList: [],
}

export const initSliderListAsync = createAsyncThunk(
    'questionnaires/init-slider-list',
    async (_, {dispatch}): Promise<SliderItem[]> => {
        try {
            dispatch(setLoad(true));

            await delay(2000);

            return slidersList;
        } catch (error) {
            throw error;
        } finally {
            dispatch(setLoad(false));
        }
    }
)

const questionnairesSlice = createSlice({
    name: 'questionnaires',
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Получение списка анкет
        builder.addCase(initSliderListAsync.pending, _ => {
            console.log("Получение списка анкет");
        })
        builder.addCase(initSliderListAsync.fulfilled, ( state, action ) => {
            console.log("Успешное получение списка анкет");
            state.sliderList = action.payload;
        })
        builder.addCase(initSliderListAsync.rejected, _ => {
            console.log("Ошибка получение списка анкет");
        })
    },
})

export const {} = questionnairesSlice.actions;
export default questionnairesSlice.reducer;

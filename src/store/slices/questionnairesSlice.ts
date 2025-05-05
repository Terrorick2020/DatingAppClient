import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setLoad } from './settingsSlice';
import { delay } from '@/funcs/general.funcs';
import { slidersList, targetUser } from '@/constant/quest';
import type { QuestState, SliderItem, DetailsTargetUser } from '@/types/quest.types';


const initialState: QuestState = {
    sliderList: [],
    targetUser: null,
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

export const initTargetUserAsync = createAsyncThunk(
    'questionnaires/init-terget-user',
    async (_id: string, {dispatch}): Promise<DetailsTargetUser> => {
        try {
            dispatch(setLoad(true));

            await delay(2000);

            return targetUser;
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
            console.log("Ошибка получения списка анкет");
        })

        // Получение информации о целевой анкете
        builder.addCase(initTargetUserAsync.pending, _ => {
            console.log("Получение информации о целевой анкете");
        })
        builder.addCase(initTargetUserAsync.fulfilled, ( state, action ) => {
            console.log("Успешное получение информации о целевой анкете");
            state.targetUser = action.payload;
        })
        builder.addCase(initTargetUserAsync.rejected, _ => {
            console.log("Ошибка получения информации о целевой анкете");
        })
    },
})

export const {} = questionnairesSlice.actions;
export default questionnairesSlice.reducer;

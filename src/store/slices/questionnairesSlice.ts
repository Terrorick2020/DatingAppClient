import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setLoad } from './settingsSlice';
import { delay } from '@/funcs/general.funcs';
import { slidersList, likesList } from '@/constant/quest';
import type { QuestState, SliderItem, LikesItem } from '@/types/quest.types';


const initialState: QuestState = {
    sliderList: [],
    likesList: [],
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

export const initLikesListAsync = createAsyncThunk(
    'questionnaires/init-likes-list',
    async (_, {dispatch}): Promise<LikesItem[]> => {
        try {
            dispatch(setLoad(true));

            await delay(2000);

            return likesList;
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
    reducers: {
    },
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

        // Получение списка симпатий
        builder.addCase(initLikesListAsync.pending, _ => {
            console.log("Получение списка симпатий");
        })
        builder.addCase(initLikesListAsync.fulfilled, ( state, action ) => {
            console.log("Успешное получение списка симпатий");
            state.likesList = action.payload;
        })
        builder.addCase(initLikesListAsync.rejected, _ => {
            console.log("Ошибка получение списка симпатий");
        })
    }
})

export const {} = questionnairesSlice.actions;
export default questionnairesSlice.reducer;

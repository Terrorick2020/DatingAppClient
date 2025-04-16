import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { delay } from '@/funcs/general.funcs';
import { likesList } from '@/constant/likes';
import { setLoad } from './settingsSlice';
import type { LikesState, LikesItem } from '@/types/likes.types';


const initialState: LikesState = {
    likesList: []
}

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

const likesSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
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
    },
})

export const {} = likesSlice.actions
export default likesSlice.reducer
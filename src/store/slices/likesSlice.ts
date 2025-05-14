import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { delay } from '@/funcs/general.funcs';
import { likesList } from '@/constant/likes';
import { setLoad } from './settingsSlice';
import type { LikesState, LikesItem, LikesMatch } from '@/types/likes.types';


const initialState: LikesState = {
    likesList: [],
    match: {
        value: false,
        from: null
    }
}

export const initLikesListAsync = createAsyncThunk(
    'likes/init-likes-list',
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

export const acceptLikingAsync = createAsyncThunk(
    'likes/accept-liking',
    async (id: string): Promise<boolean> => {
        try {
            await delay(2000);

            return !!id;
        } catch (error) {
            throw error;
        }
    }
);

export const rejectLikingAsync = createAsyncThunk(
    'likes/reject-liking',
    async (id: string): Promise<boolean> => {
        try {
            await delay(2000);

            return !!id;
        } catch (error) {
            throw error;
        }
    }
);

export const acceptMatchAsync = createAsyncThunk(
    'likes/accept-match',
    async (): Promise<void> => {
        await delay(2000);
    }
)

const likesSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        setMatch: (state, action: PayloadAction<LikesMatch>) => {
            state.match = action.payload;
        }
    },
    extraReducers: builder => {
        // Получение списка симпатий
        builder.addCase(initLikesListAsync.pending, _ => {
            console.log("Получение списка симпатий");
        })
        builder.addCase(initLikesListAsync.fulfilled, ( state, action: PayloadAction<LikesItem[]> ) => {
            console.log("Успешное получение списка симпатий");
            state.likesList = action.payload;
        })
        builder.addCase(initLikesListAsync.rejected, _ => {
            console.log("Ошибка получение списка симпатий");
        })

        // Принятие симпатии
        builder.addCase(acceptLikingAsync.pending, _ => {
            console.log("Принятие симпатии");
        })
        builder.addCase(acceptLikingAsync.fulfilled, _ => {
            console.log("Успешное принятие симпатии");
        })
        builder.addCase(acceptLikingAsync.rejected, _ => {
            console.log("Ошибка принятия симпатии");
        })

        // Отклонение симпантии
        builder.addCase(rejectLikingAsync.pending, _ => {
            console.log("Отклонение симпантии");
        })
        builder.addCase(rejectLikingAsync.fulfilled, _ => {
            console.log("Успешное отклонение симпантии");

        })
        builder.addCase(rejectLikingAsync.rejected, _ => {
            console.log("Ошибка отклонения симпантии");
        })

        // Ответ на симпатию
        builder.addCase(acceptMatchAsync.pending, _ => {
            console.log("Ответ на симпатию");
        })
        builder.addCase(acceptMatchAsync.fulfilled, _ => {
            console.log("Успешный ответ на симпатию");

        })
        builder.addCase(acceptMatchAsync.rejected, _ => {
            console.log("Ошибка ответа на симпатию");
        })
    },
})

export const { setMatch } = likesSlice.actions;
export default likesSlice.reducer;

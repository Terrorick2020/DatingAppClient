import { createSlice } from '@reduxjs/toolkit';
import { type LikesState } from '@/types/likes.types';


const initialState: LikesState = {
}

const likesSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
    },
})

export const {} = likesSlice.actions
export default likesSlice.reducer
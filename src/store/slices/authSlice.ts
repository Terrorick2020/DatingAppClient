import { createSlice } from '@reduxjs/toolkit';

import { type AuthState } from '@/types/auth.types';

const initialState: AuthState = {
}

const austSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
})

// export const {  } = adminSlice.actions
export default austSlice.reducer

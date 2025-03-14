import { createSlice } from '@reduxjs/toolkit'
import { type AdminState } from '@/types/store.types'


const initialState: AdminState = {
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
    },
})

export const {} = adminSlice.actions
export default adminSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import { type ChatsState } from '@/types/store.types'


const initialState: ChatsState = {
}

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
    },
})

export const {} = chatsSlice.actions
export default chatsSlice.reducer
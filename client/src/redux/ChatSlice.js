import { createSlice } from '@reduxjs/toolkit'

export const ChatSlice = createSlice({
    name: 'chat',
    initialState: {
        host: false,
        messages: [],
        message: '',
    },
    reducers: {
        setHost: (state, action) => {
            state.host = action.payload.isHost
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload.msg)
        },
        setMessage: (state, action) => {
            state.message = action.payload.msg
        },
    },
})

export const { addMessage, setMessage, setHost } = ChatSlice.actions

export default ChatSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name : 'user',
    initialState : {
        isLoggedIn : false,
        username : ""

    },
    reducers : {
        setLoginStatus : (state, action) => {
            state.isLoggedIn = action.payload
        },
        setUsername: (state, action) => {
            state.username = action.payload.username
        },
    }
})

export const {setLoginStatus, setUsername} = UserSlice.actions;
export default UserSlice.reducer;
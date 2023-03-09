import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name : 'user',
    initialState : {
        isLoggedIn : false,
        username : "",
        userUrlPic : "",
        newJoiner : ""

    },
    reducers : {
        setLoginStatus : (state, action) => {
            state.isLoggedIn = action.payload
        },
        setUsername: (state, action) => {
            state.username = action.payload.username
        },
        setUserUrlPic : (state, action) => {
            state.userUrlPic = action.payload
        },
        setNewJoiner : (state, action) => {
            state.newJoiner = action.payload
        }
    }
})

export const {setLoginStatus, setUsername, setUserUrlPic, setNewJoiner} = UserSlice.actions;
export default UserSlice.reducer;
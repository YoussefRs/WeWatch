import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name : 'user',
    initialState : {
        isLoggedIn : false,
        username : "",
        userUrlPic : "",
        newJoiner : "",
        newJoinerId: ""

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
        },
        setNewJoinerId : (state, action) => {
            state.newJoinerId = action.payload
        }
    }
})

export const {setLoginStatus, setUsername, setUserUrlPic, setNewJoiner, setNewJoinerId} = UserSlice.actions;
export default UserSlice.reducer;
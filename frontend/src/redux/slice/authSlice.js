import {createSlice} from '@reduxjs/toolkit'

let authSlice = createSlice({
    name:"auth",
    initialState:{
        user:JSON.parse(localStorage.getItem("userInfo")) || null,
    },
    //! reducers
    reducers:{
        loginAction:(state,action)=>{
            state.user = action.payload
        },
        logoutAction:(state,action)=>{
            state.user = null
        }
    }
})

//! generate actions
export let {loginAction, logoutAction} = authSlice.actions

//! generate reducers
let authReducer = authSlice.reducer
export default authReducer
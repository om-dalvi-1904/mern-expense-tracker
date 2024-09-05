import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slice/authSlice'

export let store = configureStore({
    reducer:{
        auth:authReducer
    }
})
import { configureStore } from '@reduxjs/toolkit'
import PasteReducer from '../src/Redux/PasteSlice'

export const store = configureStore({
reducer:{
    paste:PasteReducer,
},
})

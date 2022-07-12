import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
    name:'notifications',
    initialState:{
        global:{}
    },
    reducers:{
        errGlobal:(state, action) => {
            state.global.error = true;
            state.global.msg = action.payload;
        },
        successGlobal:(state, action) => {
            state.global.success = true;
            state.global.msg = action.payload;
        },
        clearNotification:(state) => {
            state.global = {}
        }
    }
})
export const {errGlobal, successGlobal, clearNotification} = notificationsSlice.actions;
export default notificationsSlice.reducer
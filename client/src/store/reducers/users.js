import { createSlice} from '@reduxjs/toolkit'
import { registerUser, signinUser, isAuth, signOut, updateUserProfile, changeEmail } from '../actions/users'
const DEFAULT_USER = {
    loading:false,
    data:{
        _id:null,
        email:null,
        firstname:null,
        lastname:null,
        age:null,
        verified:null,
        role:null
    },
    auth:null
}

export const userSlice = createSlice({
    name:'users',
    initialState:DEFAULT_USER,
    reducers:{
        setVerify:(state) => {
            state.data.verified = true;
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(registerUser.pending, (state) => {state.loading=true})
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading=false;
            state.data=action.payload.data;
            state.auth=action.payload.auth;
        })
        .addCase(registerUser.rejected, (state) => {state.loading=false})

        .addCase(signinUser.pending, (state) => {state.loading=true})
        .addCase(signinUser.fulfilled, (state, action) => {
            state.loading=false;
            state.data=action.payload.data;
            state.auth=action.payload.auth;
        })
        .addCase(signinUser.rejected, (state) => {state.loading=false})

        .addCase(isAuth.pending, (state) => {state.loading=true})
        .addCase(isAuth.fulfilled, (state, action) => {
            state.loading=false;
            state.data={...state.data, ...action.payload.data};
            state.auth=action.payload.auth;
        })
        .addCase(isAuth.rejected, (state) => {state.loading=false})

        .addCase(signOut.fulfilled, (state, action) => {
            state.data= DEFAULT_USER.data;
            state.auth=false;
        })

        .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.data={...state.data, ...action.payload};
        })

        .addCase(changeEmail.pending, (state) => {state.loading=true})
        .addCase(changeEmail.fulfilled, (state, action) => {
            state.loading=false;
            state.data={...state.data, ...action.payload};
        })
        .addCase(changeEmail.rejected, (state) => {state.loading=false})
    }
})

export const { setVerify } = userSlice.actions;
export default userSlice.reducer
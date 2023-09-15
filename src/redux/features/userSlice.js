import { createSlice } from "@reduxjs/toolkit";

const userValue=JSON.parse(localStorage.getItem('chat-app-user'))
const userToken=localStorage.getItem('chat-app-user-token')

const initialState={
    user:userValue,
    token:userToken
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload.user
            state.token=action.payload.token
            console.log(state.user)
            localStorage.setItem('chat-app-user',JSON.stringify(state.user))
            localStorage.setItem('chat-app-user-token',state.token)

        },

        deleteUser:(state,action)=>{
            state.user={}
            state.token=''
            localStorage.setItem('chat-app-user',null)
            localStorage.setItem('chat-app-user-token','')
        }
    }
})

export const {setUser,deleteUser} = userSlice.actions

export default userSlice.reducer
import {createSlice} from "@reduxjs/toolkit"

 const UserSlice=createSlice({
    name:"user",
    initialState:{value:{
        mobile:"",
        otp:"",
        fullname:"",
        country:"India",
        state:"Tamil Nadu",
        city:"Madurai",
        address:""

    }},//setting initial state
    reducers:{
        login:(state,action)=>{
            state.value=action.payload
        }
    }
})

export const{login} =UserSlice.actions
export default UserSlice.reducer


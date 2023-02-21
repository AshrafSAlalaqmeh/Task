import { createSlice } from "@reduxjs/toolkit"; 
const authSlice = createSlice({
    name:"auth",
    initialState:{
        token: null || localStorage.getItem('token'),
        isLoggedIn: false || localStorage.getItem('isLoggedIn'),
        userId :null,
        fullName:null
    },
    reducers:{
        setLogin: (state, action) => {
            state.token = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('token', action.payload)
            localStorage.setItem('isLoggedIn', true)
        
        },
        setUserId :(state , action )=>{
            state.userId = action.payload;
        },
        setFullName :(state , action )=>{
            state.fullName = action.payload;
        },
    }
})

export default authSlice.reducer;
export const { setLogin,setUserId,setFullName} = authSlice.actions;
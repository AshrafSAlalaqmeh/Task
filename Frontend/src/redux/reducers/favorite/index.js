import { createSlice } from "@reduxjs/toolkit"; 

const favoriteSlice = createSlice({
    name:"favorite",
    initialState:{
        favorite:[],
       
    },
    reducers:{
        setfavorite: (state, action) => {
            state.favorite = action.payload;       
        },
        addTofavorite: (state, action) => {
            state.favorite.push(action.payload)
        },
        deleteItemFavorite:(state , action) =>{
            state.favorite = state.favorite.filter((elem, i) => {
                return  elem.id !== action.payload 
            })
        }
        
       
    }
})
export const { setfavorite, addTofavorite ,deleteItemFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
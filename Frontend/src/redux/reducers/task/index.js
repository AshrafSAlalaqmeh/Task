import { createSlice } from "@reduxjs/toolkit"; 

const taskSlice = createSlice({
    name:"task",
    initialState:{
        task:[],
        taskId: null
    },
    reducers:{
        setTask: (state, action) => {
            state.task = action.payload;       
        },
        addToTask: (state, action) => {
            state.task.push(action.payload)
        },
        setTaskId: (state, action) => {
            state.task = action.payload;       
        },
        deleteTask:(state , action) =>{
            state.task = state.task.filter((elem, i) => {
                return  elem.id !== action.payload 
            })
        }
    }
})
export const { setTask ,addToTask, setTaskId ,deleteTask} = taskSlice.actions;
export default taskSlice.reducer;

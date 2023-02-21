import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import taskReduser from "./reducers/task"
import favoriteReducer from "./reducers/favorite"

export default configureStore({
    reducer:{
     auth:authReducer,
     task: taskReduser,
     favorite: favoriteReducer

    }
})
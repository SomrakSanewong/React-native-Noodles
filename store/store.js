import { configureStore} from "@reduxjs/toolkit";
import { reducer } from "../utils/reducers/formReducers";
import authSlice from "./authSlice";

export const store = configureStore({
    reducer:{
        auth:authSlice
    }
})
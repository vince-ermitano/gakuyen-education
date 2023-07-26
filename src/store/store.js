import { configureStore } from "@reduxjs/toolkit";
import loggedInStatusReducer from "../features/LoggedInStatusSlice";

export default configureStore({
    reducer: {
        loggedInStatus: loggedInStatusReducer
    }
});
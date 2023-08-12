import { configureStore } from "@reduxjs/toolkit";
import loggedInStatusReducer from "../features/LoggedInStatusSlice";
import sidebarReducer from "../features/SidebarSlice";

export default configureStore({
    reducer: {
        loggedInStatus: loggedInStatusReducer,
        sidebar: sidebarReducer,
    }
});
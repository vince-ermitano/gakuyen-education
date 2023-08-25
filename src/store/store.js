import { configureStore } from "@reduxjs/toolkit";
import loggedInStatusReducer from "../features/LoggedInStatusSlice";
import sidebarReducer from "../features/SidebarSlice";
import shopReducer from "../features/ShopSlice";

export default configureStore({
    reducer: {
        loggedInStatus: loggedInStatusReducer,
        sidebar: sidebarReducer,
        shop: shopReducer,
    }
});
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loggedInStatusReducer from "../features/LoggedInStatusSlice";
import sidebarReducer from "../features/SidebarSlice";
import shopReducer from "../features/ShopSlice";
import userReducer from "../features/UserSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfiguration = {
    key: "root",
    version: 1,
    whitelist: ["shop", "sidebar", "user"],   
    storage,
};

const reducer = combineReducers({
    loggedInStatus: loggedInStatusReducer,
    sidebar: sidebarReducer,
    shop: shopReducer,
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfiguration, reducer);

export default configureStore({
    reducer: persistedReducer,
});
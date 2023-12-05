import { createSlice } from "@reduxjs/toolkit";
import { checkIfPassedMainLaunchDate } from "../helpers";

const initialState = {
    purchasedItems: {},
    isPurchasedItemsLoaded: false,
    userInfo: {},
    authorized: checkIfPassedMainLaunchDate(),
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPurchasedItems: (state, action) => {
            state.purchasedItems = action.payload;
        },
        setIsPurchasedItemsLoaded: (state, action) => {
            state.isPurchasedItemsLoaded = action.payload;
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setAuthorized: (state, action) => {
            state.authorized = action.payload;
        },
    }
});

export const { setPurchasedItems, setIsPurchasedItemsLoaded, setUserInfo, setAuthorized } = userSlice.actions;
export default userSlice.reducer;
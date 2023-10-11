import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    purchasedItems: {},
    isPurchasedItemsLoaded: false,
    userInfo: {},
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
        }
    }
});

export const { setPurchasedItems, setIsPurchasedItemsLoaded, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
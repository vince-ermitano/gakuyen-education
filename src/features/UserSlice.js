import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    purchasedItems: {},
    isPurchasedItemsLoaded: false,
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
        }
    }
});

export const { setPurchasedItems, setIsPurchasedItemsLoaded } = userSlice.actions;
export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    purchasedItems: {},
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPurchasedItems: (state, action) => {
            state.purchasedItems = action.payload;
        }
    }
});

export const { setPurchasedItems } = userSlice.actions;
export default userSlice.reducer;
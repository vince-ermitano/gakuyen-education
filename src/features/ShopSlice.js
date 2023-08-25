import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: null,
};

const shopSlice = createSlice({
    name: "shop",
    initialState: initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        }
    }
});

export const { setProducts } = shopSlice.actions;
export default shopSlice.reducer;
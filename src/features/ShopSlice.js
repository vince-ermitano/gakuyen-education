import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    products: {},
};

const shopSlice = createSlice({
    name: "shop",
    initialState: initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const { setProducts, setLoading } = shopSlice.actions;
export default shopSlice.reducer;
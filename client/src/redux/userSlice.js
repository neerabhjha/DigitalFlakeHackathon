import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    categories: [],
    products: [],
  },
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },
    SetCategories: (state, action) => {
      state.categories = action.payload;
    },
    SetProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { SetUser, SetCategories, SetProducts } = userSlice.actions;
export default userSlice.reducer;

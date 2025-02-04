import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedValues: [], // This replaces the React useState([]) for `value`
};

const categorySlice = createSlice({
  name: "multiSelect",
  initialState,
  reducers: {
    setStoreValue: (state, action) => {
      state.selectedValues = action.payload;
    },
    clearValue: (state) => {
      state.selectedValues = [];
    },
  },
});

export const { setStoreValue, clearValue } = categorySlice.actions;
export default categorySlice.reducer;

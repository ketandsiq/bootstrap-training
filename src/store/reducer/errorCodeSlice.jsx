import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedErrors: [], // This replaces the React useState([]) for `value`
};

const errorCodeSlice = createSlice({
  name: "multiSelectErrors",
  initialState,
  reducers: {
    setStoreValue: (state, action) => {
      state.selectedErrors = action.payload; // Fixed typo
    },
    clearValue: (state) => {
      state.selectedErrors = []; // Fixed typo
    },
  },
});

export const { setStoreValue, clearValue } = errorCodeSlice.actions;
export default errorCodeSlice.reducer;

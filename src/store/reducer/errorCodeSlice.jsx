import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedErrors: [], // This replaces the React useState([]) for `value`
};

const errorCodeSlice = createSlice({
  name: "multiSelectErrors",
  initialState,
  reducers: {
    setStoreValue: (state, action) => {
      state.selectedErros = action.payload;
    },
    clearValue: (state) => {
      state.selectederrors = [];
    },
  },
});

export const { setStoreValue, clearValue } = errorCodeSlice.actions;
export default errorCodeSlice.reducer;

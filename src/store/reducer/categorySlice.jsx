import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedValues: [],
  expanded: [], // Added expanded state
  filter: null, // Added filter state
};

const categorySlice = createSlice({
  name: "multiSelect",
  initialState,
  reducers: {
    setStoreValue: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.selectedValues = action.payload;
      } else {
        state.selectedValues =
          action.payload.selectedValues || state.selectedValues;
        state.expanded = action.payload.expanded || state.expanded;
        state.filter =
          action.payload.filter !== undefined
            ? action.payload.filter
            : state.filter;
      }
    },
    clearValue: (state) => {
      state.selectedValues = [];
      state.expanded = [];
      state.filter = null;
    },
  },
});

export const { setStoreValue, clearValue } = categorySlice.actions;
export default categorySlice.reducer;

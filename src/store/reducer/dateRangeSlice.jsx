import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  start: null,
  end: null,
};

const dateRangeSlice = createSlice({
  name: "dateRange",
  initialState: initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.start = action.payload.start;
      state.end = action.payload.end;
    },
    clearDateRange: (state) => {
      state.start = null;
      state.end = null;
    },
  },
});


export const { setDateRange, clearDateRange } = dateRangeSlice.actions;
export default dateRangeSlice.reducer;

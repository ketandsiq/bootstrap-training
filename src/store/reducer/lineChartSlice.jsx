import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  processedData: [], // Stores the result array
};

const lineChartSlice = createSlice({
  name: "lineChart",
  initialState,
  reducers: {
    setProcessedData: (state, action) => {
      state.processedData = action.payload;
    },
  },
});

export const { setProcessedData } = lineChartSlice.actions;
export default lineChartSlice.reducer;

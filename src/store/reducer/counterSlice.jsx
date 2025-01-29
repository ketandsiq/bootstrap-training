import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  const savedCount = sessionStorage.getItem("counterValue");
  return { value: savedCount ? Number(savedCount) : 0 };
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: getInitialState(),
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;

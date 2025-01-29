import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./store/reducer/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice, 
  },
});

store.subscribe(() => {
  const state = store.getState();
  sessionStorage.setItem("counterValue", state.counter.value);
});
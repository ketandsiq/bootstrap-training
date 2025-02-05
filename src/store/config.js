import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterSlice from "./reducer/counterSlice";
import formSlice from "./reducer/formSlice";
import categoryReducer from "./reducer/categorySlice";
import errorCodeReducer from "./reducer/errorCodeSlice"
import dateRangeReducer from "./reducer/dateRangeSlice"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage to persist the state when app is closed

// Persist config
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  counter: counterSlice,
  form: formSlice,
  multiSelect: categoryReducer,
  multiSelectErrors: errorCodeReducer,
  dateRange: dateRangeReducer
});

const persistedUserReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export const persistor = persistStore(store);

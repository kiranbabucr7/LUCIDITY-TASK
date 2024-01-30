// store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // Your root reducer

const store = configureStore({
  reducer: rootReducer,
  // Additional middleware or options can be passed here
});

export default store;

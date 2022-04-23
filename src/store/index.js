import { configureStore } from "@reduxjs/toolkit";

import weatherSlice from "./weather";

const store = configureStore({
    reducer: weatherSlice.reducer
});

export const weatherActions = weatherSlice.actions;

export default store;
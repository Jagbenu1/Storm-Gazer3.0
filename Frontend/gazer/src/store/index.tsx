import { configureStore } from '@reduxjs/toolkit';

import weatherSlice from './weather';

const store = configureStore({
  reducer: weatherSlice,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

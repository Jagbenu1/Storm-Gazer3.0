import { createSlice } from '@reduxjs/toolkit';

const initialWeatherState = {
  location: null,
  weather: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState: initialWeatherState,
  reducers: {
    fetchWeatherStart(state) {
      state.loading = !state.loading;
    },
    fetchWeatherSuccess(state, action) {
      state.location = action.payload.location;
      state.weather = action.payload.weather;
      state.loading = !state.loading;
    },
    fetchWeatherFail(state, action) {
      state.loading = !state.loading;
    },
  },
});

export default weatherSlice;

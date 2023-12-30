import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface WeatherState {
  location: { city: string; state: string };
  icon: string;
  humidity: number;
  temp: number;
  loading: boolean;
}

const initialWeatherState: WeatherState = {
  location: { city: '', state: '' },
  icon: '',
  humidity: 0,
  temp: 0,
  loading: false,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState: initialWeatherState,
  reducers: {
    fetchWeatherStart(state) {
      state.loading = !state.loading;
    },
    fetchWeatherSuccess(
      state,
      action: PayloadAction<{
        location: { city: string; state: string };
        icon: string;
        humidity: number;
        temp: number;
      }>
    ) {
      state.location.city = action.payload.location.city;
      state.location.state = action.payload.location.state;
      state.icon = action.payload.icon;
      state.humidity = action.payload.humidity;
      state.temp = action.payload.temp;
      state.loading = !state.loading;
    },
    fetchWeatherFail(state) {
      state.loading = !state.loading;
    },
  },
});

export const { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFail } =
  weatherSlice.actions;

export default weatherSlice.reducer;

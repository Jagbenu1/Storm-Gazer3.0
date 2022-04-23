import { createSlice } from "@reduxjs/toolkit";

const initialWeatherState = {
    location: null,
    weather: null,
    loading: false,
    error: null
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState: initialWeatherState,
    reducers: {
        fetchWeatherStart(state) {
            state.loading = !state.loading
        },
        fetchWeatherSuccess(state, action){
            state.location = action.payload.loction;
            state.weather = action.payload.weather;
        },
        fetchWeatherFail(state, action){
            state.error = action.payload.error;
        }
    }
});

export default weatherSlice;
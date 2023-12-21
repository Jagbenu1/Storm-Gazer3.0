import React, { useEffect } from 'react';
import StormGazer from './components/StormGazer/index';

import './App.css';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    const getWeather = async () => {
      const { data } = await axios.get('/getWeatherData', {
        params: {
          zipCode: 30075,
        },
      });

      console.log(data);
    };

    getWeather();
  }, []);
  return <StormGazer />;
};

export default App;

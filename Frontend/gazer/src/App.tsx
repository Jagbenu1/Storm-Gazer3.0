import React, { useEffect } from 'react';
import StormGazer from './components/StormGazer/index';

import './App.css';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    axios.get('/getWeatherData', {});
  }, []);
  return <StormGazer />;
};

export default App;

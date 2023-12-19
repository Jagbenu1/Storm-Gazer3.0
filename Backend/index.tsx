import axios from 'axios';
import { keys } from './config/keys';

let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let { request, response } = require('express');

const PORT = process.env.PORT || 4000;

const app = express();
const weatherKey = keys.weather;
const zipKey = keys.zip;

app.use(bodyParser.json()); // enable JSON data
app.use(cors()); //enable cors

//get the location for the zipcodes.
app.get('/getWeatherData', async ({ zipCode }, response) => {
  const {
    data: { zipData },
  } = await axios.get(
    `https://app.zipcodebase.com/api/v1/search?apikey=${zipKey}&codes=${zipCode}&country=us`
  );
  const { latitude, longitude, city, state } = zipData[request.zipCode][0];

  const {
    data: { weatherData },
  } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}&units=imperial`
  );

  response.json({ weather: weatherData, location: { city, state } });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

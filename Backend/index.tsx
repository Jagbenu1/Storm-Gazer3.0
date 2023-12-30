const axios = require('axios');
const keys = require('./config/keys.tsx');

let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');

const PORT = process.env.PORT || 4000;

const app = express();
const weatherKey = keys.weather;
const zipKey = keys.zip;

app.use(bodyParser.json()); // enable JSON data
app.use(cors()); //enable cors

//get the location for the zipcodes and the weather data.
app.get('/getWeatherData', async (req, res) => {
  const {
    data: { results },
  } = await axios.get(
    `https://app.zipcodebase.com/api/v1/search?apikey=${zipKey}&codes=${req.query.zipCode}&country=us`
  );
  const { latitude, longitude, city, state } = results[req.query.zipCode][0];

  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}&units=imperial`
  );

  const { temp, humidity } = data.main;
  const { icon } = data.weather[0];
  res.json({
    temp: temp,
    humidity: humidity,
    icon: icon,
    location: { city, state },
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

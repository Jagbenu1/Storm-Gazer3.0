import { useEffect, useState } from "react";
import { keys } from "../../.keys";
import { useDispatch, useSelector } from "react-redux";
import { weatherActions } from "../../store/index";
import axios from "axios";
import classes from "./StormGazer.module.css";

import Background from "../../components/Background";
import Infoblock from "../../components/InfoBlock";
import CurrentWeather from "../../components/CurrentWeather";
import Humidity from "../../components/Humidity";
import Location from "../../components/Location";
import Temperature from "../../components/Temperature";
import Spinner from "../../shared/UI/Spinner";

const StormGazer = (props) => {
  const dispatch = useDispatch();
  const [zipCode, setZipCode] = useState("");
  const [randomImageIndex, setRandomImageIndex] = useState("");
  const [icon, setIcon] = useState("");
  const location = useSelector((state) => state.location);
  const weather = useSelector((state) => state.weather);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);

  const weatherKey = keys.weather;
  const zipKey = keys.zip;

  const ApiCall = async (zipCode) => {
    //This has now been restructured based on destructuring.
    //both api calls are no longer nested and they are able to get certain data without
    //getting all of the data
    console.log(zipCode);
    try {
      dispatch(weatherActions.fetchWeatherStart());
      const {
        data: { results },
      } = await axios.get(
        `https://app.zipcodebase.com/api/v1/search?apikey=${zipKey}&codes=${zipCode}&country=us`
      );

      const { latitude, longitude, city, state } = results[zipCode][0];

      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}`
      );
      dispatch(
        weatherActions.fetchWeatherSuccess({
          location: { city, state },
          weather: data,
        })
      );
    } catch (error) {
      dispatch(weatherActions.fetchWeatherFail());
      console.log(zipCode);
      console.log(error);
    }
  };

  useEffect(() => {
    //random number for background component is set at mounting of component
    setRandomImageIndex(Math.round(Math.random() * 4));
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    ApiCall(zipCode);
    setRandomImageIndex(Math.round(Math.random() * 4)); // set random number prop to the background component
  };


  return (
    <Background icon={icon} imageIndex={randomImageIndex}>
      <form
        onSubmit={(event) => submitHandler(event)}
        className={classes["zip-code"]}
      >
        <label htmlFor="zipCode">Zip Code</label>
        <input
          value={zipCode}
          id="zipCode"
          onChange={(e) => setZipCode(e.target.value)}
        />
        {loading && <Spinner />}
        {weather && location && (
          <Infoblock>
            <Location city={location.city} state={location.state} />
            <Temperature temp={Math.round(weather.main.temp)} />
            <CurrentWeather currentWeather={weather.weather[0].description} />
            <Humidity humidity={weather.main.humidity} />
          </Infoblock>
        )}
        <button>Zip Code</button>
      </form>
    </Background>
  );
};

export default StormGazer;

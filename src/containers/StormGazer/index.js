import { useEffect, useState } from "react";
import { keys } from "../../.keys";
import { useDispatch, useSelector } from "react-redux";
import { weatherActions } from "../../store/index";
import axios from "axios";
import classes from "./StormGazer.module.css";

import Background from "../../components/Background";
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

  useEffect(() => {
    //can only check to see if state changes are in effect in useEffect.
    //null is given anywhere else
    if (location && weather) {
      console.log(location.state);
      setIcon(weather.weather[0].icon); //sets icon prop to the icon from the weather API. sent to background
      console.log(weather);
      console.log(weather.weather[0].icon);
    }
  }, [location, weather]);

  const getData = () => {
    console.log(location);
    // setIcon(weather.name);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ApiCall(zipCode);
    setRandomImageIndex(Math.round(Math.random() * 4)); // set random number prop to the background component
    getData();
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
        {weather && location ? <p> This is here?!?!? </p> : ""}
        <button>Zip Code</button>
      </form>
    </Background>
  );
};

export default StormGazer;

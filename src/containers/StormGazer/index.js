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
          location: 10,
          weather: 15,
        })
      );

      // console.log(location);
      // console.log(weather);

      console.log(data);
      console.log(results[zipCode][0]);
    } catch (error) {
      dispatch(weatherActions.fetchWeatherFail());
      console.log(zipCode);
      console.log(error);
    }
  };

  const getData = () => {
    setIcon(weather.current.weather.icon);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ApiCall(zipCode);
    console.log(location);
    console.log(weather);
    setRandomImageIndex(Math.round(Math.random() * 4));
    // getData();
    // let icon = "",
    //   data = "";

    // if (location && weather) {
    //   console.log(icon);
    // } else {
    //   console.log(weather);
    //   console.log(location);
    //   console.log(icon);
    // }
  };

  useEffect(() => {
    setRandomImageIndex(Math.round(Math.random() * 4));
    //setIcon(weather.current.weather.icon);
  }, [weather]);

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

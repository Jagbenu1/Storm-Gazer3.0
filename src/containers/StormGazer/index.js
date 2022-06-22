import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { keys } from "../../config/keys";
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
import Button from "../../shared/UI/Button";
import Input from "../../shared/UI/Input";


const StormGazer = () => {
  const dispatch = useDispatch();
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState(false);
  const [randomImageIndex, setRandomImageIndex] = useState("");
  const location = useSelector((state) => state.location);
  const weather = useSelector((state) => state.weather);
  const loading = useSelector((state) => state.loading);

  const weatherKey = keys.weather;
  const zipKey = keys.zip;

  const ApiCall = async (zipCode) => {
    //This has now been restructured based on destructuring.
    //both api calls are no longer nested and they are able to get certain data without
    //getting all of the data
    // console.log(zipCode);
    try {
      dispatch(weatherActions.fetchWeatherStart());
      const {
        data: { results },
      } = await axios.get(
        `https://app.zipcodebase.com/api/v1/search?apikey=${zipKey}&codes=${zipCode}&country=us`
      );

      const { latitude, longitude, city, state } = results[zipCode][0];

      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}&units=imperial`
      );
      dispatch(
        weatherActions.fetchWeatherSuccess({
          location: { city, state },
          weather: data,
        })
      );
      setError(false);
    } catch (error) {
      dispatch(weatherActions.fetchWeatherFail());
      setError(true);
    }
  };

  useEffect(() => {
    //random number for background component is set at mounting of component
    setRandomImageIndex(Math.round(Math.random() * 4));
  }, [error]);

  const submitHandler = (event) => {
    event.preventDefault();
    ApiCall(zipCode);
    setRandomImageIndex(Math.round(Math.random() * 4)); // set random number prop to the background component
  };

  const setWeatherIcon = weather && location ? weather.weather[0].icon : null;

  return (
    <Background icon={setWeatherIcon} imageIndex={randomImageIndex}>
      <form
        onSubmit={(event) => submitHandler(event)}
        className={classes["zip-code"]}
      >
        <Input
          value={zipCode}
          elementType="input"
          changed={(e) => setZipCode(e.target.value)}
          placeholder="Zipcode"
        />
        <Button btnType="success">Submit</Button>
        {loading && <Spinner />}
        {!error && weather && location && !loading && (
          <Infoblock>
            <Location city={location.city} state={location.state} />
            <CurrentWeather
              currentWeather={weather.weather[0].description}
              icon={setWeatherIcon}
            />
            <Temperature temp={Math.round(weather.main.temp)} />
            <Humidity humidity={weather.main.humidity} />
          </Infoblock>
        )}
        {error && !loading && (
          <p style={{color: 'red'}}>Your zipcode seems to be unavailable. Please put in another.</p>
        )}
      </form>
    </Background>
  );
};

export default StormGazer;

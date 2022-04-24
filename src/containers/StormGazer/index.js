import { useState } from "react";
import classes from "./StormGazer.module.css";
import { keys } from "../../.keys";
import axios from "axios";
import { useDispatch } from "react-redux";
import { weatherActions } from "../../store/index";

const StormGazer = (props) => {
  const dispatch = useDispatch();
  const [zipCode, setZipCode] = useState("");

  const weatherKey = keys.weather;
  const zipKey = keys.zip;

  const ApiCall = async (zipCode) => {
    console.log(zipCode);
    try {
      dispatch(weatherActions.fetchWeatherStart());
      axios
        .get(
          `https://app.zipcodebase.com/api/v1/search?apikey=${zipKey}&codes=${zipCode}&country=us`
        )
        .then(function (res) {
          const latitude = res.data.results[zipCode][0].latitude;
          const longitude = res.data.results[zipCode][0].longitude;

          console.log(latitude + " " + longitude);

          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}`
            )
            .then(function (response) {
              console.log(response.data);
              dispatch(
                weatherActions.fetchWeatherSuccess({
                  location: res.data,
                  weather: response.data,
                })
              );
            });
        });
    } catch (error) {
      dispatch(weatherActions.fetchWeatherFail());
      console.log(zipCode);
      console.log(error);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ApiCall(zipCode);
  };

  return (
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
      <button>Zip Code</button>
    </form>
  );
};

export default StormGazer;

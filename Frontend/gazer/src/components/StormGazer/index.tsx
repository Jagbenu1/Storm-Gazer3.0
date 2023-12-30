import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFail,
} from '../../store/weather';
import { RootState } from '../../store/index';

import axios from 'axios';
import Background from '../Background';
import Infoblock from '../../components/InfoBlock';
import CurrentWeather from '../../components/CurrentWeather';
import Humidity from '../../components/Humidity';
import Location from '../../components/Location';
import Temperature from '../../components/Temperature';

interface IFormInput {
  zipCode: string;
}

const StormGazer = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [randomImageIndex, setRandomImageIndex] = useState(0);
  const location = useSelector((state: RootState) => state.location);
  const icon = useSelector((state: RootState) => state.icon);
  const humidity = useSelector((state: RootState) => state.humidity);
  const temp = useSelector((state: RootState) => state.temp);
  const loading = useSelector((state: RootState) => state.loading);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      zipCode: '',
    },
  });

  const getWeather = async (zipCode: string) => {
    try {
      dispatch(fetchWeatherStart());
      const { data } = await axios.get('/getWeatherData', {
        params: {
          zipCode: zipCode,
        },
      });

      console.log(data);

      dispatch(
        fetchWeatherSuccess({
          location: data.location,
          temp: data.temp,
          humidity: data.humidity,
          icon: data.icon,
        })
      );
      setError(false);
    } catch (error) {
      console.log(error);

      dispatch(fetchWeatherFail());
      setError(true);
    }
  };

  const setWeatherIcon = icon && location ? icon : '';
  useEffect(() => {
    // //random number for background component is set at mounting of component
    setRandomImageIndex(Math.round(Math.random() * 4));
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    getWeather(data.zipCode);
    setRandomImageIndex(Math.round(Math.random() * 4)); // set random number prop to the background component
  };

  return (
    <Background icon={setWeatherIcon} imageIndex={randomImageIndex}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="zipCode"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
      {loading && <CircularProgress />}
      {!error && icon && location && !loading && (
        <Infoblock>
          <Location city={location.city} state={location.state} />
          <Temperature temp={Math.round(temp)} />
          <Humidity humidity={humidity} />
        </Infoblock>
      )}
    </Background>
  );
};

export default StormGazer;

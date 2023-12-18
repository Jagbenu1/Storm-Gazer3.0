import './css/weather-icons.css';

const currentWeather = (props: { icon: string; currentWeather: string }) => {
  let iconImage = null;
  switch (props.icon) {
    case '01d':
      iconImage = 'wi-day-sunny';
      break;
    case '01n':
      iconImage = 'wi-night-clear';
      break;
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      iconImage = 'wi-rain';
      break;
    case '13d':
      iconImage = 'wi-sleet';
      break;
    case '50d':
    case '50n':
      iconImage = 'wi-fog';
      break;
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      iconImage = 'wi-cloudy';
      break;
    case '02d':
      iconImage = 'wi-day-cloudy-high';
      break;
    case '02n':
      iconImage = 'wi-night-alt-partly-cloudy';
      break;
    case '11d':
    case '11n':
      iconImage = 'wi-night-thunderstorm';
      break;
    default:
      iconImage = null;
      break;
  }

  return (
    <div>
      {iconImage !== null ? <i className={'wi ' + iconImage}></i> : null}
      <p>{props.currentWeather}</p>
    </div>
  );
};

export default currentWeather;

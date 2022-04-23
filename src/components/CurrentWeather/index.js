import classes from './CurrentWeather.module.css';

const currentWeather = (props) => {
    let iconImage = null;
    switch(props.icon){
        case('clear-day'):
            iconImage = "wi-day-sunny";
            break;
        case('clear-night'):
            iconImage = "wi-night-clear";
            break;
        case('rain'):
            iconImage = "wi-rain";
            break;
        case('snow'):
            iconImage = "wi-snow";
            break;
        case('sleet'):
            iconImage = "wi-sleet"
            break;
        case('wind'):
            iconImage = "wi-cloudy-gusts";
            break;
        case('fog'):
            iconImage = "wi-fog";
            break;
        case('cloudy'):
            iconImage = "wi-cloudy";
            break;
        case('partly-cloudy-day'):
            iconImage = "wi-day-cloudy-high";
            break;
        case('partly-cloudy-night'):
            iconImage = "wi-night-alt-partly-cloudy";
            break;
        default: 
            iconImage = null;
            break;
    }

    return (
        <div className={classes.CurrentWeather}>
            {iconImage !== null ? <i className={"wi " + iconImage}></i> : null}
            <p>{props.currentWeather}</p>
        </div>
    );
};

export default currentWeather;
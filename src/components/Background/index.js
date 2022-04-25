import classes from './Background.module.css';

const Background = ({ children, icon, imageIndex }) => {
    const backgroundSwitch = () => {
        let keys = null;
        let backgroundUrl = null;

        switch(icon) {
            case ('01d'):
                const clearDay = require.context('../../../public/clear-day', true, /\.jpg$/);
                keys = clearDay.keys().map(key => clearDay(key));
                backgroundUrl = 'url(' + keys[imageIndex] + ')';
                break;
            case ('01n'):
                console.log('hello');
                const clearNight = require.context('../../../public/clear-night', true, /\.jpg$/);
                keys = clearNight.keys().map(key => clearNight(key));
                backgroundUrl = 'url(' + keys[imageIndex] + ')';
                break;
            case ('03d'):
                const cloudy = require.context('../../../public/cloudy', true, /\.jpg$/);
                keys = cloudy.keys().map(key => cloudy(key));
                backgroundUrl = 'url(' + keys[imageIndex] + ')';
                break;
            case ('50d'):
                const fog = require.context('../../../public/fog', true, /\.jpg$/);
                keys = fog.keys().map(key => fog(key));
                backgroundUrl = 'url(' + keys[imageIndex] + ')';
                break;
            case ('02d'):
                const partlyCloudyDay = require.context('../../../public/partly-cloudy-day', true, /\.jpg$/);
                keys = partlyCloudyDay.keys().map(key => partlyCloudyDay(key));
                backgroundUrl = 'url(' + keys[imageIndex] + ')';
                break;
            case ('02n'):
                const partlyCloudyNight = require.context('../../../public/partly-cloudy-night', true, /\.jpg$/);
                keys = partlyCloudyNight.keys().map(key => partlyCloudyNight(key));
                backgroundUrl = 'url(' + keys[imageIndex] + ')';
                break;
            case ('09d'):
                const rain = require.context('../../../public/rain', true, /\.jpg$/);
                keys = rain.keys().map(key => rain(key));
                backgroundUrl = 'url(' + keys[imageIndex] + ')';
                break;
            case ('13d'):
                const sleet = require.context('../../../public/sleet', true, /\.jpg$/);
                keys = sleet.keys().map(key => sleet(key));
                backgroundUrl = 'url(' + keys[imageIndex] + ')';
                break;
            // case ('13d'):
            //     const snow = require.context('../../../public/snow', true, /\.jpg$/);
            //     keys = snow.keys().map(key => snow(key));
            //     backgroundUrl = 'url(' + keys[imageIndex] + ')';
            //     break;
            // case ('50d'):
            //     const wind = require.context('../../../public/wind', true, /\.jpg$/);
            //     keys = wind.keys().map(key => wind(key));
            //     backgroundUrl = 'url(' + keys[imageIndex] + ')';
            //     break;
            default:
                const defaultImage = require.context('../../../public/default', true, /\.jpg$/);
                keys = defaultImage.keys().map(key => defaultImage(key));
                backgroundUrl = 'url(' + keys[imageIndex] + ')';
                break;
        }
        return backgroundUrl;
    }

    console.log(icon);

    return (
        <div className={classes.Background} style={{backgroundImage: backgroundSwitch()}}>
            {children}
        </div>
    );
};

export default Background;
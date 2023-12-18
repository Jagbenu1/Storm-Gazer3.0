// import classes from './Background.module.css';

const Background = ({
  children,
  icon,
  imageIndex,
}: {
  children: React.ReactNode;
  icon: string;
  imageIndex: number;
}) => {
  const backgroundSwitch = () => {
    let keys = null;
    let backgroundUrl = null;

    switch (icon) {
      case '01d':
        const clearDay = require.context(
          '../../../public/clear-day',
          true,
          /\.jpg$/
        );
        keys = clearDay.keys().map((key: string) => clearDay(key));
        backgroundUrl = 'url(' + keys[imageIndex] + ')';
        break;
      case '01n':
        const clearNight = require.context(
          '../../../public/clear-night',
          true,
          /\.jpg$/
        );
        keys = clearNight.keys().map((key: string) => clearNight(key));
        backgroundUrl = 'url(' + keys[imageIndex] + ')';
        break;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        const cloudy = require.context(
          '../../../public/cloudy',
          true,
          /\.jpg$/
        );
        keys = cloudy.keys().map((key: string) => cloudy(key));
        backgroundUrl = 'url(' + keys[imageIndex] + ')';
        break;
      case '50d':
      case '50n':
        const fog = require.context('../../../public/fog', true, /\.jpg$/);
        keys = fog.keys().map((key: string) => fog(key));
        backgroundUrl = 'url(' + keys[imageIndex] + ')';
        break;
      case '02d':
        const partlyCloudyDay = require.context(
          '../../../public/partly-cloudy-day',
          true,
          /\.jpg$/
        );
        keys = partlyCloudyDay
          .keys()
          .map((key: string) => partlyCloudyDay(key));
        backgroundUrl = 'url(' + keys[imageIndex] + ')';
        break;
      case '02n':
        const partlyCloudyNight = require.context(
          '../../../public/partly-cloudy-night',
          true,
          /\.jpg$/
        );
        keys = partlyCloudyNight
          .keys()
          .map((key: string) => partlyCloudyNight(key));
        backgroundUrl = 'url(' + keys[imageIndex] + ')';
        break;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        const rain = require.context('../../../public/rain', true, /\.jpg$/);
        keys = rain.keys().map((key: string) => rain(key));
        backgroundUrl = 'url(' + keys[imageIndex] + ')';
        break;
      case '13d':
        const sleet = require.context('../../../public/sleet', true, /\.jpg$/);
        keys = sleet.keys().map((key: string) => sleet(key));
        backgroundUrl = 'url(' + keys[imageIndex] + ')';
        break;
      case '11d':
      case '11n':
        const thunder = require.context(
          '../../../public/thunderstorm',
          true,
          /\.jpg$/
        );
        keys = thunder.keys().map((key: string) => thunder(key));
        backgroundUrl = 'url(' + keys[imageIndex] + ')';
        break;
      default:
        const defaultImage = require.context(
          '../../../public/default',
          true,
          /\.jpg$/
        );
        keys = defaultImage.keys().map((key: string) => defaultImage(key));
        backgroundUrl = 'url(' + keys[imageIndex] + ')';
        break;
    }
    return backgroundUrl;
  };

  return (
    <div
      style={{
        background: `${backgroundSwitch()} no-repeat center center fixed`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: 'contain',
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  );
};

export default Background;

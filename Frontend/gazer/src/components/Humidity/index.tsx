import classes from './Humidity.module.css';

const Humidity = (props: { humidity: string }) => {
  return <p className={classes.Humidity}>Humidity: {props.humidity}&#x25;</p>;
};

export default Humidity;

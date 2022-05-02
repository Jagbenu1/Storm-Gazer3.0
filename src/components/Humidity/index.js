import classes from "./Humidity.module.css";

const Humidity = (props) => {
  

  return (
    <p className={classes.Humidity}>
      Humidity: {props.humidity}&#x25;
    </p>
  );
};

export default Humidity;
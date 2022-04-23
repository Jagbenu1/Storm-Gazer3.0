import classes from "./Humidity.module.css";

const Humidity = (props) => {
  const percentage = (num) => {
    let newNum = num * 100;
    return newNum;
  };

  return (
    <p className={classes.Humidity}>
      {" "}
      Humidity: {percentage(props.humidity)}&#x25;
    </p>
  );
};

export default Humidity;
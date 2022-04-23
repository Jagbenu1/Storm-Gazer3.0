import classes from "./Temperature.module.css";

const Temperature = (props) => {
  return <p className={classes.Temperature}>{Math.round(props.temp)}$deg;F</p>;
};

export default Temperature;

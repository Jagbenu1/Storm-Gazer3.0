import classes from "./Temperature.module.css";

const Temperature = (props) => {
  return <p className={classes.Temperature}>{Math.round(props.temp)}&#8457;</p>;
};

export default Temperature;

import classes from "./Error.module.css";

const Error = (props) => {
  return <p className={classes.Error}>{props.error}</p>;
};

export default Error;

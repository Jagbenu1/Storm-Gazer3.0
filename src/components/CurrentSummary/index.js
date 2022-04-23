import classes from "./CurrentSummary.module.css";

const CurrentSummary = (props) => {
  return (
    <div className={classes.CurrentSummary}>
      <p>{props.currentSummary}</p>
    </div>
  );
};

export default CurrentSummary;
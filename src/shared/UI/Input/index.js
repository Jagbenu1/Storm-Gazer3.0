import classes from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.InputElement}
          value={props.value}
          onChange={props.changed}
          placeholder={props.placeholder}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          value={props.value}
          onChange={props.changed}
          placeholder={props.placeholder}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          value={props.value}
          onChange={props.changed}
          placeholder={props.placeholder}
        />
      );
  }

  return <div className={classes.Input}>{inputElement}</div>;
};

export default Input;

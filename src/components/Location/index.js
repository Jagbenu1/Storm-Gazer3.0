import classes from './Location.module.css';

const Location = (props) => {
    return (<p className={classes.Location}>{props.userCity}, {props.userState}</p>);
}

export default Location;
import classes from './Location.module.css';

const Location = (props) => {
    return (<p className={classes.Location}>{props.city}, {props.state}</p>);
}

export default Location;
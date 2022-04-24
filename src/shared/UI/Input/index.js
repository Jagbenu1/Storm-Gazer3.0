import classes from './Input.module.css';

const Input = (props) => {
    let inputElement = null;

    switch(props.elementType){
        case('input'):
            inputElement = <input 
                className={classes.InputElement} 
                value={props.value} 
                onChange={props.changed}/>;
            break;
        case('textarea'):
            inputElement = <textarea
            className={classes.InputElement}
            value={props.value} 
            onChange={props.changed}/>;
            break;
        default: 
            inputElement = <input 
                className={classes.InputElement}
                value={props.value} 
                onChange={props.changed}/>;
    }

    return (
        <div className={classes.Input}>
            {inputElement}
        </div>
    );
};

export default Input;
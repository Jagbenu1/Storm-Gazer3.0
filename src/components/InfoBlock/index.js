import classes from './InfoBlock.module.css';

const InfoBlock = (props) => {
    return (
        <div className={classes.InfoBlock}>
            {props.children}
        </div>
    );
};

export default InfoBlock;
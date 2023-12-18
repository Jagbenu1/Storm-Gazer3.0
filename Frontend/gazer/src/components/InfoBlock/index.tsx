import React from 'react';
import classes from './InfoBlock.module.css';

const InfoBlock = (props: { children: React.ReactNode }) => {
  return <div className={classes.InfoBlock}>{props.children}</div>;
};

export default InfoBlock;

import React from 'react';
import classNames from 'classnames';
import styles from './IconCounter.css';

const IconCounter = ({ value }) => {
  const classes = classNames(
    styles.label,
  );
  return (
    <i className={classes}>
      {value}
    </i>
  );
};

export default IconCounter;

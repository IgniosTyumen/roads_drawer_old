import React from 'react';
import classNames from 'classnames';
import styles from './Icon.css';

const FAIcon = ({ name, className }) => {
  const classes = classNames(
    styles.icon,
    `${name}`,
    className,
  );
  return (
    <i className={classes} />
  );
};

export default FAIcon;

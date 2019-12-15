import React from 'react';
import classNames from 'classnames';
import styles from './Icon.css';

const Icon = ({ name, className }) => {
  const classes = classNames(
    styles.icon,
    `icon-${name}`,
    className,
  );
  return (
    <i className={classes} />
  );
};

export default Icon;

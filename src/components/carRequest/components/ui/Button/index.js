import React from 'react';
import classNames from 'classnames';
import styles from './Button.css';

const variants = {
  primary: 'primary',
  default: 'default',
  success: 'success',
  close: 'close',
  square: 'square',
  'toolbar-button': 'toolbar-button',
  pulse: 'pulse',
  hidden: 'hidden',
  delete: 'delete',
  'float-add': 'float-add',
  leftSquare: 'leftSquare'
};

const sizes = {
  big: 'big',
  small: 'small',
  tight: 'tight',
};

const Button = ({
  children,
  size = 'big',
  variant = 'default',
  className,
  onClick,
  disabled = false,
  type,
}) => {
  const classes = classNames(
    styles.button,
    styles[variants[variant]],
    styles[sizes[size]],
    className,
  );

  return (
    <button className={classes} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
};

export default Button;

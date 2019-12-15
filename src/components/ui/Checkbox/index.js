import React, {Fragment} from 'react';
import styles from './Checkbox.css';

const Checkbox = (props) => {
  const checkbox_id = `checkbox-${(Math.random() * (1000 - 1) + 1).toString()}`;

  return (
    <Fragment>
      <input
        type='checkbox'
        {...props}
        className={styles.input}
        id={checkbox_id}
      />
      <label
        className={styles.label}
        htmlFor={checkbox_id}
      />
    </Fragment>
  );
};

export default Checkbox;

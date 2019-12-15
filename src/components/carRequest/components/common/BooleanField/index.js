import React from 'react';

import styles from './BooleanField.css';

import Checkbox from '~/components/carRequest/components/ui/Checkbox';

const BooleanField = ({
  field,
  labelName,
}) => (
    <div className={styles.container}>
      <Checkbox
        name={field.name}
        onChange={field.onChange}
        checked={field.value}
      />
      <label className={styles.label}>{labelName}</label>
    </div>
);

export default BooleanField;

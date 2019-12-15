import React, {Component} from 'react';
import classNames from 'classnames';

import styles from './TextField.css';

class TextField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
    };
  }

  handleFocus = () => {
    this.setState({ focused: true });
  }

  handleBlur = (e) => {
    this.setState({ focused: false });
    this.props.field.onBlur(e);
  }

  render() {
    const { handleFocus, handleBlur } = this;
    const { focused } = this.state;
    const { field, form, labelName } = this.props;

    const isInvalid = form.errors[field.name];

    const labelStyles = classNames(
      styles.label,
      field.value || focused ? styles.labelActive : undefined,
      isInvalid ? styles.labelInvalide : undefined,
    );

    return (
      <div className={styles.container}>
        <label className={labelStyles}>{labelName}</label>
        <input
          type="text"
          onChange={field.onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={field.value}
          name={field.name}
          className={styles.textField}
        />
      </div>
    );
  }
}

export default TextField;

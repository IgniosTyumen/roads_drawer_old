import React, {Fragment} from 'react';
import Select from 'react-select';
import classNames from 'classnames';
import FAIcon from '~/components/carRequest/components/ui/FAIcon';

import styles from './EstimatedDuration.css';

class EstimatedDuration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  handleChange = (option) => {
    const { togglePortal } = this;
    const { field, form } = this.props;

    const value = option === null ? null : option.value;
    form.setFieldValue(field.name, value);

    togglePortal();
  }

  togglePortal = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
    const { handleChange, togglePortal } = this;
    const { isOpen } = this.state;
    const {
      field,
      form,
      labelName,
      schema,
    } = this.props;

    const config = schema.__meta.extra.widgets[field.name][1];
    const { data, displayField, idField } = config;
    const options = data.map(option => ({ label: option[displayField], value: option[idField] }));

    const getValue = (stateValue, options) => options.find(option => option.value === stateValue);

    const value = getValue(field.value, options);

    const isInvalid = form.errors[field.name];
    const labelStyles = classNames(
      styles.label,
      value ? styles.labelActive : undefined,
      isInvalid ? styles.labelInvalide : undefined,
    );

    return (
      <Fragment>
        <div className={styles.wrapper}>
          <label className={labelStyles}>{labelName}</label>
          <button
            onClick={togglePortal}
            className={styles.button}
            type='button'
          >
            {value && value.label}
          </button>
        </div>
        {isOpen
          && <div className={styles.portal}>
            <button
              className={styles.buttonBack}
              onClick={togglePortal}
            >
              <FAIcon name='fas fa-chevron-left' />
            </button>
            <Select
              id={field.name}
              name={field.name}
              onChange={handleChange}
              onBlur={field.onBlur}
              options={options}
              value={value}
              placeholder={'Выберете...'}
              openOnFocus={true}
              autoFocus={true}
              arrowRenderer={null}
              className={styles.outer}
            />
          </div>
        }
      </Fragment>
    );
  }
}

export default EstimatedDuration;

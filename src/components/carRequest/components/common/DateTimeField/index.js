import React from 'react';
import DatePicker, {registerLocale} from 'react-datepicker';
import toDate from 'date-fns/toDate';
import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';
import classNames from 'classnames';

import styles from './DateTimeField.css';

registerLocale('ru', ru);

class DateTimeField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    const { defaultDate, form, field } = this.props;
    if (defaultDate) {
      // HACK: https://github.com/jaredpalmer/formik/issues/930
      setTimeout(() => {
        form.setFieldValue(field.name, format(defaultDate, "yyyy-MM-dd'T'HH:mm:ssxxxxx"));
      }, 0);
    }
  }

  toggleCalendar = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleChange = (value) => {
    const { field, form } = this.props;
    const newValue = format(value, "yyyy-MM-dd'T'HH:mm:ssxxxxx");
    const oldValue = field.value;

    if (oldValue) {
      if (newValue.substring(11, 19) !== oldValue.substring(11, 19)) {
        this.toggleCalendar();
      }
    }

    form.setFieldValue(field.name, newValue);
  }

  handleClickOutside = () => {
    this.toggleCalendar();
  }

  render() {
    const {
      handleChange,
      toggleCalendar,
      handleClickOutside,
    } = this;


    const {
      field,
      form,
      disabled,
      labelName,
    } = this.props;

    const isInvalid = form.errors[field.name];
    const labelStyles = classNames(
      styles.label,
      field.value ? styles.labelActive : undefined,
      isInvalid ? styles.labelInvalide : undefined,
    );

    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <label className={labelStyles}>{labelName}</label>
          <button
            onClick={toggleCalendar}
            type='button'
            className={classNames(styles.button, disabled ? styles.disabled : undefined)}
            disabled={disabled}
          >
            {field.value ? format(field.value, 'yyyy-MM-dd HH:mm') : ''}
          </button>
        </div>
      {
        this.state.isOpen && (
          <DatePicker
            locale='ru'
            showMonthDropdown
            showYearDropdown
            dropdownMode='select'
            onChange={handleChange}
            dateFormat='yyyy-MM-dd HH:mm'
            className={styles.field}
            calendarClassName={styles.calendar}
            onClickOutside={handleClickOutside}
            inline
            withPortal
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            timeCaption='Время'
            isClearable={false}
            selected={
              typeof field.value === 'string'
                ? toDate(field.value)
                : field.value
            }
          />
        )
      }

      </div>
    );
  }
}

export default DateTimeField;

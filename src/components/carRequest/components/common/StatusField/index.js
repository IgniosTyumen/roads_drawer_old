import React, {Fragment} from 'react';
import Select from 'react-select';
import axios from 'axios';
import classNames from 'classnames';
import FAIcon from '~/components/carRequest/components/ui/FAIcon';

import styles from './StatusField.css';

const statusScores = {
  AFFIRMATION: [
    { value: 'AFFIRMATION', label: 'На утверждение' },
    { value: 'CANCELED', label: 'Отмена заявки' },
  ],
  CONFIRMED: [
    { value: 'CONFIRMED', label: 'Согласована' },
    { value: 'IN_PROGRESS', label: 'В работе' },
    { value: 'REJECTED', label: 'На доработку' },
    { value: 'CANCELED', label: 'Отмена заявки' },
  ],
  IN_PROGRESS: [
    { value: 'IN_PROGRESS', label: 'В работе' },
    { value: 'ASSIGNED', label: 'Назначен' },
    { value: 'REJECTED', label: 'На доработку' },
    { value: 'CANCELED', label: 'Отмена заявки' },
  ],
  ASSIGNED: [
    { value: 'ASSIGNED', label: 'Назначен' },
    { value: 'COMPLETED', label: 'Завершена' },
    { value: 'REJECTED', label: 'На доработку' },
    { value: 'CANCELED', label: 'Отмена заявки' },
  ],
  ACCEPTED: [
    { value: 'ACCEPTED', label: 'Принято' },
    { value: 'ASSIGNED', label: 'Назначен' },
    { value: 'IN_PLACE', label: 'На месте' },
  ],
  IN_PLACE: [
    { value: 'IN_PLACE', label: 'На месте' },
    { value: 'ON_THE_WAY', label: 'В пути' },
    { value: 'COMPLETED', label: 'Завершена' },
    { value: 'ASSIGNED', label: 'Назначен' },
  ],
  ON_THE_WAY: [
    { value: 'IN_PLACE', label: 'На месте' },
  ],
  COMPLETED: [
    { value: 'COMPLETED', label: 'Завершена' },
  ],
  REJECTED: [
    { value: 'REJECTED', label: 'На доработку' },
    { value: 'AFFIRMATION', label: 'На утверждение' },
    { value: 'CANCELED', label: 'Отмена заявки' },
  ],
  CANCELED: [
    { value: 'CANCELED', label: 'Отмена заявки' },
    { value: 'AFFIRMATION', label: 'На утверждение' },
  ],
};

const statusScoresBidConfirmatory = {
  AFFIRMATION: [
    { value: 'AFFIRMATION', label: 'На утверждение' },
    { value: 'CANCELED', label: 'Отмена заявки' },
    { value: 'CONFIRMED', label: 'Согласована' },
    { value: 'REJECTED', label: 'На доработку' },
  ],
  CONFIRMED: [
    { value: 'CONFIRMED', label: 'Согласована' },
    { value: 'IN_PROGRESS', label: 'В работе' },
    { value: 'REJECTED', label: 'На доработку' },
    { value: 'CANCELED', label: 'Отмена заявки' },
  ],
  IN_PROGRESS: [
    { value: 'IN_PROGRESS', label: 'В работе' },
    { value: 'ASSIGNED', label: 'Назначен' },
    { value: 'REJECTED', label: 'На доработку' },
    { value: 'CANCELED', label: 'Отмена заявки' },
    { value: 'CONFIRMED', label: 'Согласована' },
  ],
  ASSIGNED: [
    { value: 'ASSIGNED', label: 'Назначен' },
    { value: 'COMPLETED', label: 'Завершена' },
    { value: 'REJECTED', label: 'На доработку' },
    { value: 'CANCELED', label: 'Отмена заявки' },
    { value: 'CONFIRMED', label: 'Согласована' },
  ],
  ACCEPTED: [
    { value: 'ACCEPTED', label: 'Принято' },
    { value: 'ASSIGNED', label: 'Назначен' },
    { value: 'IN_PLACE', label: 'На месте' },
    { value: 'CONFIRMED', label: 'Согласована' },
    { value: 'REJECTED', label: 'На доработку' },
  ],
  IN_PLACE: [
    { value: 'IN_PLACE', label: 'На месте' },
    { value: 'ON_THE_WAY', label: 'В пути' },
    { value: 'COMPLETED', label: 'Завершена' },
    { value: 'ASSIGNED', label: 'Назначен' },
    { value: 'CONFIRMED', label: 'Согласована' },
    { value: 'REJECTED', label: 'На доработку' },
  ],
  ON_THE_WAY: [
    { value: 'IN_PLACE', label: 'На месте' },
    { value: 'CONFIRMED', label: 'Согласована' },
    { value: 'REJECTED', label: 'На доработку' },
  ],
  COMPLETED: [
    { value: 'COMPLETED', label: 'Завершена' },
    { value: 'CONFIRMED', label: 'Согласована' },
    { value: 'REJECTED', label: 'На доработку' },
  ],
  REJECTED: [
    { value: 'REJECTED', label: 'На доработку' },
    { value: 'AFFIRMATION', label: 'На утверждение' },
    { value: 'CANCELED', label: 'Отмена заявки' },
    { value: 'CONFIRMED', label: 'Согласована' },
  ],
  CANCELED: [
    { value: 'CANCELED', label: 'Отмена заявки' },
    { value: 'AFFIRMATION', label: 'На утверждение' },
    { value: 'CONFIRMED', label: 'Согласована' },
    { value: 'REJECTED', label: 'На доработку' },
  ],
};

class StatusField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstValue: '',
      user: {},
      isOpen: false,
    };
  }

  getCarRequestUser = () => {
    axios.get('https://av.admtyumen.ru/'+'/carrequest_user_params/', {
      params: {
        _dc: (new Date()).getTime(),
      },
    })
      .then((responce) => {
        this.setState({
          user: responce.data,
        });
      });
  }

  componentDidMount() {
    const { choices, defaultChoice, field } = this.props;
    const options = choices.map(choice => ({ value: choice[0], label: choice[1] }));
    const defaultValue = options.find(option => option.value === defaultChoice);

    this.setState({
      options,
      defaultValue,
      firstValue: field.value,
    });

    this.getCarRequestUser();
  }

  // getValueUser = () => {

  // }

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
    const {
      options,
      defaultValue,
      firstValue,
      user,
    } = this.state;
    const {
      field,
      form,
      labelName,
    } = this.props;

    // 'if' HELL, cure it!
    // TODO: extract getValue & getRelativeOptions
    let value = '';
    let relativeOptions;
    if (!firstValue && options) {
      value = options.find(option => option.value === defaultValue.value);
      if (field.value) {
        value = options.find(option => option.value === field.value);
      } else {
        form.setFieldValue(field.name, defaultValue.value);
      }
      if (user.is_bid_confirmatory) {
        relativeOptions = statusScoresBidConfirmatory[value.value];
      } else {
        relativeOptions = statusScores[value.value];
      }
    } else if (firstValue && options) {
      value = options.find(option => option.value === field.value);
      if (user.is_bid_confirmatory) {
        relativeOptions = statusScoresBidConfirmatory[firstValue];
      } else {
        relativeOptions = statusScores[value.value];
      }
    }

    const addOptions = (options, newOptions) => {
      let updatedOptions = [...options];
      newOptions.forEach((newOption) => {
        if (updatedOptions.filter(option => option.value !== newOption.value)) {
          updatedOptions = [...updatedOptions, newOption];
        }
      });
      return updatedOptions;
    };

    // const bidConfirmatoryOptions = [
    //   {value: "CONFIRMED", label: "Согласована"},
    //   {value: "REJECTED", label: "На доработку"}
    // ]

    // if (user.is_bid_confirmatory) {
    //   relativeOptions = addOptions(relativeOptions, bidConfirmatoryOptions);
    // }

    const isInvalid = form.errors[field.name];
    const labelStyles = classNames(
      styles.label,
      field.value ? styles.labelActive : undefined,
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
        {this.state.isOpen
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
              value={value}
              options={relativeOptions}
              openOnFocus={true}
              autoFocus={true}
              arrowRenderer={null}
              // className={styles.outer}
            />
          </div>
        }
      </Fragment>
    );
  }
}

export default StatusField;

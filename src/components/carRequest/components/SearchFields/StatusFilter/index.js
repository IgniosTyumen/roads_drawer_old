import React, {Component, Fragment} from 'react';
import {removeItem} from '~/components/carRequest/utils/helpers';
import Checkbox from '~/components/carRequest/components/ui/Checkbox';
import styles from './StatusFilter.css';

const CarRequestStatusNames = {
  NEW: 'Новая',
  IN_PROGRESS: 'В работе',
  REJECTED: 'На доработку',
  COMPLETED: 'Завершена',
  AFFIRMATION: 'На утверждение',
  ASSIGNED: 'Назначен',
  CONFIRMED: 'Согласована',
  CONFIRMED_UDP_TO: 'Согласована УДП ТО',
  CANCELED: 'Заявки отменены',
  ACCEPTED: 'Принято',
  IN_PLACE: 'На месте',
  ON_THE_WAY: 'В пути',
};

class StatusFilter extends Component {
  handleChange = (e) => {
    const { field, form } = this.props;
    const { name } = e.target;

    let value = field.value ? field.value : [];
    if (value.includes(name)) {
      value = removeItem(value, name);
    } else {
      value = [...value, name];
    }

    form.setFieldValue('status', value);
  }

  render() {
    const { field } = this.props;
    const { handleChange } = this;
    const statusKeys = Object.keys(CarRequestStatusNames);
    return (
      <div className={styles.wrapper}>
        <ul>
          {
            statusKeys.map((statusKey, i) => (
              <li key={i}>
                <StatusField value={field.value} name={statusKey} handleChange={handleChange} />
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default StatusFilter;

const StatusField = ({
  name,
  handleChange,
  value,
}) => {
  let checked = true;
  if (value && value.includes(name)) checked = false;
  return (
    <Fragment>
      <Checkbox type='checkbox' checked={checked} name={name} onChange={handleChange} />
      <label className={styles.label}>{CarRequestStatusNames[name]}</label>
    </Fragment>
  );
};

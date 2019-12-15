import React, {Component} from 'react';
import FAIcon from '~/components/carRequest/components/ui/FAIcon';

import styles from './SortControls.css';

const sortFields = [
  {name: 'status', label: 'статус'},
  {name: 'id', label: 'номер'},
  {name: 'datetime_out', label: 'Время отправления'},
  {name: 'delivery_datetime', label: 'Время поступления заявки'},
  {name: 'customer_organization__name', label: 'Организация'},
];

class SortControls extends Component {

  handleClick = (field, direction = 'asc') => () => {
    const { changeOrder } = this.props;
    changeOrder([{
      field,
      direction
    }])
  }

  render() {
    const { handleClick } = this;
    const { order_by } = this.props;
    const { field, direction } = order_by[0];
    return (
      <div className={styles.container}>
        Сортировка:
        {sortFields.map(sortField => {
          if (sortField.name === field) {
            if (direction === 'asc') {
              return (
                <button
                  key={sortField.name}
                  onClick={handleClick(sortField.name, 'desc')}
                >
                  {sortField.label}
                  <FAIcon name='fas fa-sort-up' />
                </button>
              )
            } else if (direction === 'desc') {
              return (
                <button
                  key={sortField.name}
                  onClick={handleClick(sortField.name, 'asc')}
                >
                  {sortField.label}
                  <FAIcon name='fas fa-sort-down' />
                </button>
              )
            }
          } else {
            return (
              <button
                key={sortField.name}
                onClick={handleClick(sortField.name)}
              >
                {sortField.label}
              </button>
            )
          }
        })}
      </div>
    )
  }
}

export default SortControls;

import React from 'react';

import ControlCell from '~/components/carRequest/components/Table/ControlCell';

import styles from './Row.css';

// TODO: do it in parent component
const statusColors = {
  // "Новая": '',
  'В работе': '#fff3b1',
  // "На доработку": '',
  // "Завершена": '',
  'На утверждение': '#c1fdef',
  Назначен: '#fde5ab',
  Согласована: '#ffc4c4',
  // "Согласована УДП ТО": '',
  // "Заявки отменены": '',
  Принято: '#cff5c0',
  // "На месте": '',
  // "В пути: '',
};
class Row extends React.Component {
  handleClick = () => {
    const { touchRow, rowData } = this.props;
    touchRow(rowData);
  }

  handleEdit = () => {
    const { rowData, handleEditRow } = this.props;
    handleEditRow(rowData.id);
  }

  handleDelete = () => {
    const { rowData, handleDelete } = this.props;
    handleDelete(rowData);
  }

  // Не учтено редактирование строки в подтаблице

  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.selected !== this.props.selected ||
  //       nextProps.rowData.id !== this.props.rowData.id) {
  //       return true;
  //     }
  //   return false;
  // }

  render() {
    const { handleClick, handleEdit, handleDelete } = this;

    const {
      selected,
      cells,
    } = this.props;

    const renderCell = (colName, data, key) => {
      switch (colName) {
        case 'responsible_man_fio':
        case 'Ответственный':
          return (
            <td key={key}>
              <span className={styles.mobileTitle}>{colName}</span>
              <span>{data.name}</span>
              <span>{data.email}</span>
              <span>{data.phone}</span>
            </td>
          );
        case 'select_item':
          return (
            <ControlCell
              key={key}
              handleClick={handleClick}
              handleEdit={handleEdit}
              selected={selected}
              data={data}
              handleDelete={handleDelete}
            />
          );
        case 'Статус':
          return (
            <td key={key} className={!data ? styles.emptyRow : undefined}>
              <span className={styles.mobileTitle}>{colName}</span>
              <span style={{ backgroundColor: statusColors[data] }} className={styles.status}>{data}</span>
            </td>
          );
        case 'Номер':
          return (
            <td key={key} className='hiddenMobile'>
              <span className={styles.mobileTitle}>{colName}</span>
              <span>{data}</span>
            </td>
          );
        default:
          return (
            <td key={key} className={!data ? styles.emptyRow : undefined}>
              <span className={styles.mobileTitle}>{colName}</span>
              <span>{data}</span>
            </td>
          );
      }
    };
    return (
      <tr style={{ backgroundColor: selected && '#20a8d8' }}>
        {cells.map((col, id) => {
          const { colName, data } = col;
          return renderCell(colName, data, id);
        })}
      </tr>
    );
  }
}

export default Row;

import React, {Component} from 'react';
import {connect} from 'formik';
import styles from './ChangeLogTab.css';

const tableData = {
  columns: [
    {
      label: 'Дата и время',
      name: 'datetime',
    },
    {
      label: 'Название поля',
      name: 'field_name',
    },
    {
      label: 'Старое значение',
      name: 'old_value',
    },
    {
      label: 'Новое значение',
      name: 'new_value',
    },
    {
      label: 'Пользователь',
      name: 'username',
    },
  ],
  cols: {
    datetime: {
      label: 'Дата и время',
    },
    field_name: {
      label: 'Название поля',
    },
    old_value: {
      label: 'Старое значение',
    },
    new_value: {
      label: 'Новое значение',
    },
    username: {
      label: 'Пользователь',
    },
  },
};

export class ChangeLogTab extends Component {
  getData = () => {
    const { formik } = this.props;
    if (formik.values && formik.values.extra) {
      return formik.values.extra.objects;
    }
  }

  // renderHead = () => {
  //   const { getData } = this;
  //   const tableData = getData();
  //   if (!tableData) return;
  //   const keys = Object.keys(tableData[0]);

  //   return keys.map(rowKey => <th>{tableData[0].rowKey.field_name}</th>);
  // }

  renderHead = () => <tr>{tableData.columns.map(col => <th>{col.label}</th>)}</tr>

  renderBody = () => {
    const { getData } = this;
    const rowsData = getData();
    if (!rowsData) {
      return (
        <tr className={styles.noData}>
          <td>Нет данных для отображения</td>
        </tr>
      );
    }


    return rowsData.map((rowData, i) => (
      <tr key={i}>
        {tableData.columns.map((colData, i) => (
          <td key={i}>
            <span className={styles.mobileTitle}>{colData.label}</span>
            <span className={styles.cellData}>{rowData[colData.name]}</span>
          </td>
        ))}
      </tr>
    ));
  }

  render() {
    const { renderHead, renderBody } = this;
    return (
      <table className={styles.table}>
        <thead>
          {/* {renderHead()} */}
        </thead>
        <tbody>
          {renderBody()}
        </tbody>
      </table>
    );
  }
}

export default connect(ChangeLogTab);

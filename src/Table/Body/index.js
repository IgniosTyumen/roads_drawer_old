import React from 'react';
import format from 'date-fns/format';
import _ from 'lodash';
import styles from './Body.css';
import Row from '../Row';
import {getCarRequestStatusName} from '../../../utils/common';
import {includeObjWithProp} from '../../../utils/helpers';

class Body extends React.Component {
  renderRows = () => {
    const {
      tableBody,
      schema,
      selectedRows,
      touchRow,
      handleEditRow,
      fetching,
      headers,
      handleDelete,
    } = this.props;

    const rows = getRows(tableBody, schema, selectedRows, headers);

    if (fetching) {
      return (
        <tr className={styles.noData}>
          <td colSpan='42'>
            Загрузка
          </td>
        </tr>
      );
    } if (rows && rows.length !== 0) {
      return rows.map((row, i) => <Row
          cells={row.cells}
          rowData={row.rowData}
          selected={row.selected}
          touchRow={touchRow}
          handleEditRow={handleEditRow}
          handleDelete={handleDelete}
          key={i}
        />);
    }
    return (
        <tr className={styles.noData}>
          <td colSpan='42'>
            Нет данных для отображения
          </td>
        </tr>
    );
  }

  render() {
    const { renderRows } = this;

    return (
      <table>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    );
  }
}

const getTableHeaders = (headersData) => {
  const headers = [];

  const headersKeys = Object.keys(headersData);

  headersKeys.forEach((headerKey) => {
    if (headersData[headerKey]) {
      headers.push(headerKey);
    }
  });

  return headers;
};

// const isRowSelected = (id, state) => {
//   const { selectedRows } = state.table;
//   return selectedRows.includes(id);
// }

const isRowSelected = (row, selectedRows) => includeObjWithProp(selectedRows, 'id', row.id);

function valueGetter(field_name, data) {
  const fields = field_name.split('__');


  let current_value = data;
  _.each(fields, (field) => {
    if (_.isObject(current_value)) {
      current_value = current_value[field];
    } else {
      current_value = '';
    }
  });
  return current_value;
}

// const cellValueGetter = (headerName, rowItem) => {
//   const nestedLevels = headerName.split('__');
//   let value = rowItem;
//   nestedLevels.forEach((level, i) => {
//     if (typeof value === 'object') {
//       value = rowItem[level];
//     } else {
//       value = ''
//     }
//   });
// };

const getLabel = (name, schema) => {
  if (schema.__meta.column_titles[name]) {
    return schema.__meta.column_titles[name];
  }
  return schema[name].info.verbose_name;
};

const getReadableTime = time => format(time, 'dd.MM.yyyy HH:mm');

const getRows = (tableBody, schema, selectedRows, headersData) => {
  if (!schema || !tableBody || !headersData) return null;

  const headers = getTableHeaders(headersData);

  tableBody = tableBody.filter(item => !(item.__action__ && item.__action__ === 'delete'));

  const rows = tableBody.map((item) => {
    const cells = headers.map((header) => {
      const cell = {
        colName: getLabel(header, schema),
        data: null,
      };
      if (header === 'status') {
        cell.data = getCarRequestStatusName(item[header]);
      } else if (header === 'datetime_out' || header === 'delivery_datetime') {
        cell.data = getReadableTime(item[header]);
      } else {
        cell.data = item[header];
        if (!cell.data) {
          cell.data = valueGetter(header, item);
        }
      }
      return cell;
    });

    const selectCol = {
      colName: 'select_item',
    };

    if (headers.some(header => header === 'id')) {
      selectCol.data = {
        number: item.id,
      };
    }

    const row = {
      rowData: item,
      cells: [selectCol, ...cells],
      selected: isRowSelected(item, selectedRows),
    };
    return row;
  });

  return rows;
};

export default Body;

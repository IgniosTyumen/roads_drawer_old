import React from 'react';

class Header extends React.Component {
  render() {
    const { touchTableHeaderCheckbox, selectedRowsOnPage } = this.props;
    const { schema } = this.props;
    const renderData = getRenderData(schema);
    const renderCell = (colName, title, key) => {
      switch (colName) {
        case 'select_item':
          return (
            <th key={key}>
              <input
                type='checkbox'
                onChange={touchTableHeaderCheckbox}
                checked={selectedRowsOnPage}
              />
            </th>
          );
        default:
          return (
            <th key={key}>
              {title}
            </th>
          );
      }
    };

    return (
      <table>
        <thead>
          <tr>
            {
              renderData.map((item, i) => (
                renderCell(item.colName, item.title, i)
              ))
            }
          </tr>
        </thead>
      </table>
    );
  }
}

const getLabels = (names, schema) => {
  const labels = names.map((name) => {
    if (schema.__meta.column_titles[name]) {
      return schema.__meta.column_titles[name];
    }
    if (schema[name] && schema[name].info && schema[name].info.varbose_name) {
      return schema[name].info.verbose_name;
    }
    return name
  });
  return labels;
};

const getHeaderNames = (list_display) => {
  const headerNames = list_display.map(item => (
    typeof item === 'string' ? item : item.field
  ));
  return headerNames;
};

const getRenderData = (schema) => {
  // const schema = state.schema.data;
  let list_display = [];
  if (schema) {
    list_display = schema.__meta.list_display;
  }

  const headerNames = getHeaderNames(list_display);
  const labels = getLabels(headerNames, schema);

  const columns = headerNames.map((_, i) => ({ colName: headerNames[i], title: labels[i] }));

  columns.unshift({ colName: 'select_item' });
  return columns;
};

export default Header;

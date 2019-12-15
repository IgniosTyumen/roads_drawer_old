import React from 'react';
import classNames from 'classnames';
import Button from '~/components/carRequest/components/ui/Button';
import Header from './Header';
import Body from './Body';
import styles from './Table.css';
import Pagination from './Pagination';

class Table extends React.Component {
  render() {
    const {
      schema,
      tableBody,
      selectedRows,
      totalPages,
      currentPage,
      changeTablePage,
      touchRow,
      touchTableHeaderCheckbox,
      selectedRowsOnPage,
      handleEditRow,
      fetching,
      handleToggleModal,
      headers,
      handleDelete,
    } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.tableWrapper}>
          <div
            className={styles.headerWrapper}
            style={{ paddingRight: `${window.scrollWidth}px` }}
          >
            <Header
              schema={schema}
              touchTableHeaderCheckbox={touchTableHeaderCheckbox}
              selectedRowsOnPage={selectedRowsOnPage}
            />
          </div>
          <div className={styles.bodyWrapper}>
            <Body
              tableBody={tableBody}
              schema={schema}
              selectedRows={selectedRows}
              touchRow={touchRow}
              handleEditRow={handleEditRow}
              fetching={fetching}
              headers={headers}
              handleDelete={handleDelete}
            />
          </div>
        </div>
        <Button className={classNames(styles.addButton, totalPages <= 1 && styles.withoutPagination)} variant='float-add' onClick={handleToggleModal}>
          {/* <FAIcon name='fas fa-plus' /> */}
          <div className={styles.addButtonInner}>+</div>
        </Button>
        {totalPages > 1
          && <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            changeTablePage={changeTablePage}
          />}
      </div>
    );
  }
}

export default Table;

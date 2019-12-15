import React, {Fragment} from 'react';
import axios from 'axios';
import Cookies from 'cookies-js';
import {toast} from 'react-toastify';
import {connect} from 'formik';
import {includeObjWithProp, removeObjWithProp, replaceItem} from '~/components/carRequest/utils/helpers';
import Table from '~/components/carRequest/components/Table';
import Modal from '~/components/carRequest/components/Modal';
import SearchFields from '~/components/carRequest/components/SearchFields';
import SortControls from '~/components/carRequest/components/SortControls';
import ColumnSettings from '~/components/carRequest/components/ColumnSettings';
import Button from '~/components/carRequest/components/ui/Button';
import FAIcon from '~/components/carRequest/components/ui/FAIcon';
import styles from './TablePage.css';

class TablePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,

      fetching: false,
      fetched: false,
      tableBody: {},
      currentPage: 1,
      totalPages: null,
      selectedRows: [],
      selectedRowsOnPage: false,
      selectedRowId: '',

      filters: [
        { name: 'id', op: 'eq', val: '' },
        { name: 'is_active', op: 'eq', val: true },
        { name: 'is_short_request', op: 'eq', val: true },
      ],
      order_by: [
        { field: 'status', direction: 'asc' },
      ],

      schemaId: '',
      headers: null,
    };
  }

  getTableHeaders = () => {
    const { headers } = this.state;
    const { schema, isSubTable } = this.props;

    if (headers || !schema) return;

    let headersData = {};

    const retrievedObject = localStorage.getItem('headersSettings');
    if (retrievedObject && !isSubTable) {
      headersData = JSON.parse(retrievedObject);
    } else {
      const tableHeaders = schema.__meta.list_display.map(headerData => (typeof headerData === 'string' ? headerData : headerData.field));
      tableHeaders.forEach((header) => {
        headersData[header] = true;
      });
    }

    this.setState({ headers: headersData });
  }

  changeHeaders = (headers) => {
    this.setState({ headers });
  }

  resetSelectedRows = () => {
    this.setState({ selectedRows: [] });
  }

  changeFilters = (updatedFilters) => {
    const { getTableBody, resetSelectedRows } = this;

    this.setState({
      currentPage: 1,
      filters: updatedFilters,
    }, () => {
      getTableBody(1);
    });

    resetSelectedRows();
  }

  changeOrder = (updatedOrder) => {
    const { getTableBody, resetSelectedRows } = this;

    this.setState({
      currentPage: 1,
      order_by: updatedOrder,
    }, () => {
      getTableBody(1);
    });

    resetSelectedRows();
  }

  getTableBody = (page = 1) => {
    let { filters, order_by } = this.state;
    filters = filters.filter(filter => filter.val !== '');
    const { schema } = this.props;
    if (!schema) return;
    const urlBody = schema.__meta.urls[schema.__meta.resource_type];

    this.setState({
      fetched: true,
      fetching: true,
    });

    axios.get('https://av.admtyumen.ru/'+urlBody, {
      params: {
        _dc: (new Date()).getTime(),
        page,
        q: {
          filters,
          order_by,
        },
      },
    })
      .then((res) => {
        let { page, total_pages, objects } = res.data;
        if (page === 0) {
          page = 1;
          total_pages = 1;
        }
        this.setState({
          tableBody: {
            ...this.state.tableBody,
            [page]: objects,
          },
          totalPages: total_pages,
          page,
          fetching: false,
        });
      });
  }

  getSubTableBody = () => {
    const { schema, id } = this.props;

    if (!schema) return;

    this.setState({
      fetched: true,
    });

    const urlBody = schema.__meta.urls[schema.__meta.resource_type];

    axios.get('https://av.admtyumen.ru/'+urlBody, {
      params: {
        _dc: (new Date()).getTime(),
        q: { filters: [{ op: '==', name: 'car_request_id', val: id }] },
        results_per_page: 10000,
      },
    })
      .then((res) => {
        const { objects } = res.data;

        this.setState({
          tableBody: {
            1: objects,
          },
          totalPages: 1,
          page: 1,
          fetched: true,
        });
      });
  }

  changeTablePage = (page) => {
    const { resetSelectedRows, getTableBody } = this;
    const { tableBody } = this.state;

    if (!tableBody[page]) getTableBody(page);

    this.setState({
      currentPage: page,
    });

    resetSelectedRows();
  }

  touchRow = (rowData) => {
    const { selectedRows } = this.state;

    if (includeObjWithProp(selectedRows, 'id', rowData.id)) {
      this.setState({
        selectedRows: removeObjWithProp(selectedRows, 'id', rowData.id),
      });
    } else {
      this.setState({
        selectedRows: [
          ...selectedRows,
          rowData,
        ],
      });
    }
  }

  handleEditRow = (id) => {
    const { toggleModal } = this;

    this.setState({
      selectedRowId: id,
    });

    toggleModal();
  }

  touchTableHeaderCheckbox = () => {
    const {
      currentPage,
      selectedRows,
      tableBody,
      selectedRowsOnPage,
    } = this.state;

    const bodyCurrentPage = tableBody[currentPage];
    let newSelectedRows = [...selectedRows];
    if (!selectedRowsOnPage) {
      bodyCurrentPage.forEach((row) => {
        if (!includeObjWithProp(selectedRows, 'id', row.id)) {
          newSelectedRows = [...newSelectedRows, row];
        }
      });
    } else {
      bodyCurrentPage.forEach((row) => {
        if (includeObjWithProp(selectedRows, 'id', row.id)) {
          newSelectedRows = removeObjWithProp(newSelectedRows, 'id', row.id);
        }
      });
    }

    this.setState({
      selectedRows: newSelectedRows,
      selectedRowsOnPage: !selectedRowsOnPage,
    });
  }

  updatePage = (updatedRows, pageNum = 1) => {
    const { tableBody } = this.state;
    this.setState({
      tableBody: {
        ...tableBody,
        [pageNum]: updatedRows,
      },
    });
  }

  deleteRowsInFormik = (rows) => {
    const { formik, subTableFieldName } = this.props;

    const deleteRowsIds = rows.map(row => row.id);
    const oldRows = formik.values[subTableFieldName] ? formik.values[subTableFieldName] : [];

    // const updatedRows = oldRows.filter(row => !deleteRowsIds.some(delId => row.id === delId));
    const updatedRows = oldRows.map((row) => {
      const updatedRow = row;
      if (deleteRowsIds.some(delId => row.id === delId)) {
        updatedRow.__action__ = 'delete';
      }
      return updatedRow;
    });

    formik.setFieldValue(subTableFieldName, updatedRows);
  }

  deleteRowsInState = (rows) => {
    const { updatePage } = this;
    const { tableBody } = this.state;

    const deleteRowsIds = rows.map(row => row.id);
    const oldRows = tableBody[1];

    // const updatedRows = oldRows.filter(row => !deleteRowsIds.some(delId => row.id === delId));
    const updatedRows = oldRows.map((row) => {
      const updatedRow = row;
      if (deleteRowsIds.some(delId => row.id === delId)) {
        updatedRow.__action__ = 'delete';
      }
      return updatedRow;
    });

    updatePage(updatedRows, 1);
  }

  deleteRowsInServer = (rows) => {
    const { handleRefreshPage } = this;
    const { schema } = this.props;

    const url = schema.__meta.urls[schema.__meta.resource_type];
    const csrf = Cookies.get('csrf-token');

    if (!rows && rows.length !== 0) {
      console.log(rows);
      return;
    }

    // другой синтаксис axios в связи с невозможностью определять заголовки иным способом
    axios({
      url:`https://av.admtyumen.ru/${url}`,
      method: 'delete',
      data: {
        schema,
        records: rows,
      },
      headers: { 'X-CSRFToken': csrf },
    })
      .then((response) => {
        if (response.status >= 400) {
          toast.error(`Ошибка: ${response.data.message}`);
        } else if (response.status >= 200 && response.status < 300) {
          const message = rows.length > 1 ? 'Заявки удалены' : 'Заявка удалена';
          toast.success(message);
          handleRefreshPage();
        } else {
          toast.info(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(`Ошибка: ${error.response.data.message}`);
      });
  }

  handleDelete = (row) => {
    const { deleteRowsInFormik, deleteRowsInState, deleteRowsInServer } = this;
    const { selectedRows } = this.state;
    const { isSubTable } = this.props;

    const deleteRows = row ? [row] : selectedRows;

    if (!deleteRows || deleteRows.length === 0) return;

    if (isSubTable) {
      deleteRowsInFormik(deleteRows);
      deleteRowsInState(deleteRows);
    } else {
      deleteRowsInServer(deleteRows);
    }
  }

  updateRow = (updatedColsInRow, rowIndex, pageNum) => {
    const { tableBody } = this.state;

    const oldRow = tableBody[pageNum][rowIndex];
    const updatedRow = { ...oldRow, ...updatedColsInRow };
    const updatedPage = replaceItem(tableBody[pageNum], updatedRow, rowIndex);

    this.setState({
      tableBody: {
        ...tableBody,
        [pageNum]: updatedPage,
      },
    });
  }

  addRows = (newRows, pageNum = 1) => {
    const { tableBody } = this.state;

    const oldRows = tableBody[pageNum] ? tableBody[pageNum] : [];

    this.setState({
      tableBody: {
        ...tableBody,
        [pageNum]: [
          ...oldRows,
          ...newRows,
        ],
      },
    });
  }

  getRelevantTable = () => {
    const { isSubTable, id } = this.props;
    if (isSubTable && id) {
      this.getSubTableBody();
    } else if (isSubTable && !id) {

    } else if (!isSubTable) {
      this.getTableBody();
    }
  }

  componentDidMount = () => {
    this.getRelevantTable();
    this.getTableHeaders();
  }

  componentDidUpdate(nextProps) {
    const { handleEditRow } = this;
    const { fetched } = this.state;
    const { notifyId } = this.props;

    if (!fetched) {
      this.getRelevantTable();
    }

    if (nextProps.notifyId !== notifyId) {
      handleEditRow(notifyId);
    }

    this.getTableHeaders();
  }

  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  }

  handleToggleModal = () => {
    const { schema } = this.props;
    if (schema) {
      this.setState({
        selectedRowId: '',
      }, () => { this.toggleModal(); });
    }
  }

  handleRefreshPage = () => {
    const { getTableBody } = this;
    const { page } = this.state;
    getTableBody(page);
  }

  render() {
    const {
      toggleModal,
      handleToggleModal,
      changeTablePage,
      touchRow,
      touchTableHeaderCheckbox,
      addRows,
      updatePage,
      updateRow,
      // deleteRows,
      handleEditRow,
      changeFilters,
      handleRefreshPage,
      handleDelete,
      changeHeaders,
      changeOrder,
    } = this;

    const {
      openModal,
      tableBody,
      currentPage,
      selectedRows,
      totalPages,
      selectedRowsOnPage,
      selectedRowId,
      fetching,
      headers,
      order_by,
      filters,
    } = this.state;

    const {
      schema,
      isSubTable,
      subTableFieldName,
      user,
    } = this.props;

    const showFilter = (schema && schema.__meta.search_fields.length !== 0);

    return (
      <Fragment>
        <div className={styles.header}>
          <Button
            variant='delete'
            className={styles.deleteButton}
            onClick={() => handleDelete()}
          >
            <FAIcon name='fas fa-trash' />
          </Button>
        {
          !isSubTable
          && <Button onClick={handleRefreshPage}>
            <FAIcon name='fas fa-sync-alt' />
          </Button>
        }
        {
          (!isSubTable && headers)
          && <ColumnSettings
            schema={schema}
            headers={headers}
            changeHeaders={changeHeaders}
          />
        }
        {
          showFilter
          && <SearchFields
            schema={schema}
            filters={filters}
            changeFilters={changeFilters}
          />
        }
        </div>
        {
          !isSubTable &&
          <SortControls order_by={order_by} changeOrder={changeOrder} />
        }
        <Table
          schema={schema}
          tableBody={tableBody[currentPage]}
          selectedRows={selectedRows}
          totalPages={totalPages}
          currentPage={currentPage}
          changeTablePage={changeTablePage}
          touchRow={touchRow}
          touchTableHeaderCheckbox={touchTableHeaderCheckbox}
          selectedRowsOnPage={selectedRowsOnPage}
          handleEditRow={handleEditRow}
          fetching={fetching}
          handleToggleModal={handleToggleModal}
          headers={headers}
          handleDelete={handleDelete}
        />
        {openModal
          && <Modal
            handleToggleModal={toggleModal}
            selectedRows={selectedRows}
            schema={schema}
            id={selectedRowId}
            isSubTable={isSubTable}
            subTableFieldName={subTableFieldName}
            addRows={addRows}
            updatePage={updatePage}
            updateRow={updateRow}
            user={user}
          />}
      </Fragment>
    );
  }
}

export default connect(TablePage);

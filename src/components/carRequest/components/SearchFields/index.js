import React from 'react';
import {Field, Form, Formik} from 'formik';
import Button from '~/components/carRequest/components/ui/Button';
import FAIcon from '~/components/carRequest/components/ui/FAIcon';
import Modal from '~/components/carRequest/components/ui/Modal';
import StatusFilter from './StatusFilter';
import FieldFilter from './FieldFilter';

import styles from './SearchFields.css';

class SearchFields extends React.Component {
  constructor(props) {
    super(props);

    const { schema } = props;

    this.state = {
      isOpen: false,
      filterFields: schema.__meta.search_fields,
    };
  }

  removeFilerField = () => {
    const { filterFields } = this.state;
    this.setState({
      filterFields: filterFields.slice(0, -1)
    })
  }

  addFilterField = (field) => {
    const { filterFields } = this.state;
    this.setState({
      filterFields: [...filterFields, field]
    })
  }

  handleToggleModal = () => {
    const { schema } = this.props;
    if (schema) {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  }

  handleSubmit = (values) => {
    const { getFilterParams, handleToggleModal } = this;
    const { changeFilters } = this.props;
    changeFilters(getFilterParams(values));
    handleToggleModal();
  }

  _getOp = (fldType, op, value) => {
    if (['date', 'int', 'boolean', 'bool'].includes(fldType)) {
      return 'eq';
    }
    if (fldType === 'datetime') {
      return op || 'eq';
    }
    if (fldType === 'enum') {
      return 'not_in';
    }
    if (value === '') {
      return 'neq';
    }
    return 'ilike';
  }

  _getVal = (fldType, value) => {
    if (['date', 'int', 'datetime', 'enum'].includes(fldType)) {
      return value;
    }
    if (fldType === 'boolean' || fldType === 'bool') {
      return !!value;
    }
    if (value === '') {
      return value;
    }
    return `%${value}%`;
  }

  _getRaw = (fldType, value) => {
    if (fldType === 'boolean') {
      if (value === 'true') {
        return true;
      }
      return false;
    }
    if (fldType === 'int') {
      return parseInt(value, 10);
    }
    if (fldType === 'date') {
      return value; // TODO: fix
    }
    if (fldType === 'datetime') {
      return value; // TODO: fix
    }

    return value;
  }

  getFilterParams = (filters) => {
    const { _getOp, _getVal, _getRaw } = this;
    const { schema } = this.props;

    const filterParams = [];
    const filterKeys = Object.keys(filters);

    filterKeys.forEach((filterKey) => {
      if (filters[filterKey] === '') return;

      const fldType = schema[filterKey] ? schema[filterKey].type : '';
      filterParams.push({
        name: filterKey,
        op: _getOp(fldType, null, filters[filterKey]),
        val: _getVal(fldType, filters[filterKey]),
        raw: _getRaw(fldType, filters[filterKey]),
      });
    });

    return filterParams;
  }

  getFormikState = () => {
    const { filters, schema } = this.props;

    const formikState = {};

    schema.__meta.search_fields.forEach(searchField => {
      formikState[searchField] = '';
    })

    filters.forEach((filter) => {
      formikState[filter.name] = filter.val;
    });

    return formikState;
  }

  render() {
    const {
      handleToggleModal,
      handleSubmit,
      getFormikState,
      removeFilerField,
      addFilterField
    } = this;
    const {
      isOpen,
      searchData,
      filterFields,
    } = this.state;
    const {
      schema,
      filters
    } = this.props;

    return (
      <div>

        <Button className={styles.openButton} variant='primary' onClick={handleToggleModal}>
          <FAIcon name='fas fa-filter' />
        </Button>

        <Modal isOpen={isOpen}>
          <div className={styles.title}>Настройки фильтров справочника</div>
          <Formik
            onSubmit={handleSubmit}
            initialValues={getFormikState()}
          >
            <Form>
              <FieldFilter
                schema={schema}
                searchData={searchData}
                filterFields={filterFields}
                removeFilerField={removeFilerField}
                addFilterField={addFilterField}
                filters={filters}
              />
              <div className={styles.title}>Статусы</div>
              <Field component={StatusFilter} name='status' />
              <div className={styles.footer}>
                <Button
                  variant='primary'
                  type='submit'
                >
                  Поиск
                </Button>
                <Button type='button' onClick={handleToggleModal}>
                  Отменить
                </Button>
              </div>

            </Form>
          </Formik>
        </Modal>

      </div>
    );
  }
}

export default SearchFields;

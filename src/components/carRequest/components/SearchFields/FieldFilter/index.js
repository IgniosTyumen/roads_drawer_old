import React, {Component} from 'react';
import {connect} from 'formik';

import {getLabel, renderField} from '~/components/carRequest/utils/forms';
import {replaceElement} from '~/components/carRequest/utils/helpers';

import Button from '~/components/carRequest/components/ui/Button';
import FAIcon from '~/components/carRequest/components/ui/FAIcon';
import Select from './Select';

import styles from './FieldFilter.css';

class FieldFilter extends Component {
  constructor(props) {
    super(props);

    const { schema } = props;

    this.state = {
      filterFields: schema.__meta.search_fields.filter(field => this.props.filters.some(defaultFilter => defaultFilter.name === field)),
    }
  }

  replaceFilterField = (currentFieldName, newFieldName) => {
    const { filterFields } = this.state;
    const { formik } = this.props;

    this.setState({
      filterFields: replaceElement(filterFields, currentFieldName, newFieldName)
    });

    formik.setFieldValue(currentFieldName, '');
  }

  removeFilerField = () => {
    const { filterFields } = this.state;
    const { formik } = this.props;
    formik.setFieldValue([filterFields[filterFields.length - 1]], '');
    this.setState({
      filterFields: filterFields.slice(0, -1)
    })
  }

  addFilterField = () => {
    const { filterFields } = this.state;
    const { schema } = this.props;

    // all filters
    const { search_fields } = schema.__meta;

    const field = search_fields.find(field => !filterFields.some(existFild => existFild === field));
    if (!field) return

    this.setState({
      filterFields: [...filterFields, field]
    })
  }

  getSearchData = () => {
    const { filterFields } = this.state;
    const { schema, filters } = this.props;

    const filteredFilters = filters.filter(filter => filter.name !== 'is_short_request');

    // return filteredFilters.map(filter => {
    //   console.log(filter);
    //   const obj = {
    //     renderInput: renderField(filter.name, schema),
    //     fieldName: filter.name
    //   }
    //   return obj;
    // })

    return filterFields.map(field => ({
      renderInput: renderField(field, schema),
      fieldName: field
    }));
  }

  getList = () => {
    const { filterFields } = this.state;
    const { schema } = this.props;

    // all filters
    const { search_fields } = schema.__meta;

    let list = search_fields.filter(field => !filterFields.some(existFild => existFild === field));
    list = list.map(element => ({name: element, label: getLabel(element, schema)}));
    return list;
  }

  render() {
    const {
      getSearchData,
      removeFilerField,
      addFilterField,
      getList,
      replaceFilterField
    } = this;

    const searchData = getSearchData();
    const list = getList();

    return (
      <div className={styles.container}>
        {searchData && searchData.map((item, i) => (
          <div className={styles.filterRow} key={i}>
            {item.renderInput}
            <Select
              list={list}
              fieldName={item.fieldName}
              replaceFilterField={replaceFilterField}
            />
          </div>
        ))}
        <div className={styles.buttonRow}>
          <Button
            type='button'
            onClick={addFilterField}
            disabled={searchData.length > 2}
          >
            <FAIcon name='fas fa-plus' />
          </Button>
          <Button
            type='button'
            onClick={removeFilerField}
            disabled={searchData.length < 2}
          >
            <FAIcon name='fas fa-minus' />
          </Button>
        </div>
      </div>
    )
  }
}

export default connect(FieldFilter);

import React from 'react';
import {connect, Form} from 'formik';
import axios from 'axios';
import {renderField} from '~/components/carRequest/utils/forms';
import styles from './FieldsTab.css';

class FieldsTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
    };
  }

  getItem = (id, url) => {
    const {
      formik,
      isSubTable,
      subTableFieldName,
      parentFormik,
      startFetching,
      endFetching,
    } = this.props;

    if (isSubTable) {
      const items = parentFormik.values[subTableFieldName];
      if (!items) return;
      const item = items.find(item => item.id === id);

      if (item) {
        const keys = Object.keys(item);

        keys.forEach((fieldKey) => {
          // HACK: https://github.com/jaredpalmer/formik/issues/930
          setTimeout(() => {
            formik.setFieldValue(fieldKey, item[fieldKey]);
          }, 0);
        });
      }
    } else {
      startFetching();

      axios.get(`https://av.admtyumen.ru/${url}/${id}`)
        .then((response) => {
          endFetching();

          this.setState({ item: response.data }, () => {
            const keys = Object.keys(response.data);
            keys.forEach((fieldKey) => {
              formik.setFieldValue(fieldKey, response.data[fieldKey]);
            });
          });
        });
    }
  }

  componentDidMount = () => {
    const { id, schema, formik } = this.props;
    const url = schema.__meta.urls[schema.__meta.resource_type];
    if (id) {
      this.getItem(id, url);
    }
    // this.getItem(id, url);

    formik.validateForm();
  }

  handleClickSubmitButton = () => {
    const { formik } = this.props;
    formik.submitForm();
  }

  renderFields = () => {
    const { item } = this.state;
    const {
      schema,
      formik,
      user,
    } = this.props;

    if (!schema) return;

    const { fields } = schema.__meta;
    const renderFields = [];
    const fieldNames = [];

    const getFieldName = (field, schema) => {
      if (schema[field].local_fk_field) {
        return schema[field].local_fk_field;
      }
      return field;
    };

    const renderItem = (item, schema) => {
      fieldNames.push(getFieldName(item, schema));
      const labelName = schema[item].info.verbose_name;
      // const stateName = schema[item].type === 'MANYTOONE' ? schema[item].local_fk_field : item;
      const element = (
        <div key={labelName} className={styles.fieldWrapper}>
          {renderField(item, schema, user)}
        </div>
      );
      renderFields.push(element);
    };

    fields.forEach((row) => {
      if (row === 'geodata') return;
      if (typeof row === 'object') {
        row.forEach((item) => {
          renderItem(item, schema);
        });
      } else if (typeof row === 'string') {
        renderItem(row, schema);
      }
    });

    const initialValues = {};

    // fieldNames.forEach(name => {
    //   if (selectedRows.length === 1) {
    //     initialValues[name] = selectedRows[0][name];
    //   } else {
    //     initialValues[name] = '';
    //   }
    // })

    fieldNames.forEach((name) => {
      if (item) {
        initialValues[name] = item[name];
      } else {
        initialValues[name] = '';
      }
    });

    const render = (
      <Form>
        <div className={styles.inner}>
          {renderFields}
        </div>
      </Form>
    );

    return render;
  }

  render() {
    return (
      this.renderFields()
    );
  }
}

export default connect(FieldsTab);

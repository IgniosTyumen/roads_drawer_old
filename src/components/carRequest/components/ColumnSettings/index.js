import React, {Component, Fragment} from 'react';
import {Field, Form, Formik} from 'formik';
import Button from '~/components/carRequest/components/ui/Button';
import FAIcon from '~/components/carRequest/components/ui/FAIcon';
import Checkbox from '~/components/carRequest/components/ui/Checkbox';
import Modal from '~/components/carRequest/components/ui/Modal';

import styles from './ColumnSettings.css';

class ColumnSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  getHeaders = (headersData) => {
    if (!headersData) return;
    const headers = [];

    const headersKeys = Object.keys(headersData);

    headersKeys.forEach((headerKey) => {
      headers.push(headerKey);
    });

    return headers;
  }

  handleSubmit = (values) => {
    const { toggleModal } = this;
    const { changeHeaders } = this.props;
    changeHeaders(values);
    toggleModal();

    localStorage.setItem('headersSettings', JSON.stringify(values));
  }

  render() {
    const { isOpen } = this.state;
    const { toggleModal, getHeaders, handleSubmit } = this;
    const { headers, schema } = this.props;

    const renderHeaders = getHeaders(headers);

    return (
      <div className={styles.wrapper}>
        <Button
          onClick={toggleModal}
          className={styles.button}
        >
          <FAIcon name='fas fa-sliders-h' />
        </Button>
        <Modal isOpen={isOpen}>
          <Formik
            initialValues={headers}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className={styles.title}>Настройки полей справочника</div>
              <div>
                <ul>
                  {
                    renderHeaders.map((header, i) => (
                      <li key={i}>
                        <Field component={CheckboxField} name={header} label={getLabel(header, schema)}/>
                      </li>
                    ))
                  }
                </ul>
                <div className={styles.footer}>
                  <Button type='submit' variant='primary'>
                    Сохранить
                  </Button>
                  <Button type='button' onClick={toggleModal}>
                    Отменить
                  </Button>
                </div>
              </div>
            </Form>
          </Formik>
        </Modal>
      </div>
    );
  }
}

const getLabel = (name, schema) => {
  if (schema.__meta.column_titles[name]) {
    return schema.__meta.column_titles[name];
  }
  return schema[name].info.verbose_name;
};

const CheckboxField = ({ field, form, label }) => {
  const handleChange = (e) => {
    form.setFieldValue(field.name, e.target.checked);
  };

  return (
    <Fragment>
      <Checkbox checked={field.value} onChange={handleChange}/>
      <div className={styles.label}>{label}</div>
    </Fragment>
  );
};

export default ColumnSettings;

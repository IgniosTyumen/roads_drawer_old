import React, {Component, Fragment} from 'react';
import Select from 'react-select';
import axios from 'axios';
import classNames from 'classnames';
import FAIcon from '~/components/carRequest/components/ui/FAIcon';

import styles from './ManyToOneField.css';

export class ManyToOneField extends Component {
  constructor(props) {
    super(props);

    const { schema, field } = props;

    this.state = {
      options: [],
      fieldName: schema[field.name].local_fk_field,
      isOpen: false,
    };
  }

  componentDidMount = () => {
    const { schema, field: { name }, form, user } = this.props;
    const { fieldName } = this.state;

    const listUrl = schema[name].url;

    if (name === 'customer_organization' && user && user.organization_id) {
      setTimeout(() => {
        form.setFieldValue(fieldName, user.organization_id);
      }, 0);
    }

    let params = {
      _dc: (new Date()).getTime(),
    };

    const widget = schema.__meta.extra.widgets ? schema.__meta.extra.widgets[name] : '';
    if (widget) {
      const { extraParams } = widget[1];

      if (extraParams) {
        params = {
          ...params,
          ...extraParams,
        };
      }
    }

    axios.get('https://av.admtyumen.ru/'+listUrl, { params })
      .then(
        (res) => {
          let options = res.data.objects;

          // TODO: получать асоциации из __meta.extra.widgets

          switch (name) {
            case 'license':
            case 'car':
              options = options.map(({ id, number }) => ({ value: id, label: number }));
              break;
            default:
              options = options.map(({ id, name }) => ({ value: id, label: name }));
          }

          this.setState({
            options,
          });
        },
      );
  }

  getValue = () => {
    const { fieldName, options } = this.state;
    const { form } = this.props;
    const stateValue = form.values && form.values[fieldName] ? form.values[fieldName] : '';
    return options.find(option => option.value === stateValue);
  }

  getRelativeFieldsData = (option) => {
    const { field, form } = this.props;

    if (option === null) return;

    const id = option.value;

    let url = '';
    let relativeFields = null;

    if (field.name === 'responsible_mans') {
      url = 'api/car_request/car_request_directed_by?directedby_id=';
      relativeFields = [
        { fieldName: 'responsible_man_email', responseKey: 'email' },
        { fieldName: 'responsible_man_phone', responseKey: 'phone' },
      ];
    } else if (field.name === 'contact_person') {
      url = '/api/car_request/car_request_contact_person?contact_person_id=';
      relativeFields = [
        { fieldName: 'contact_person_email', responseKey: 'email' },
        { fieldName: 'contact_person_phone', responseKey: 'phone' },
      ];
    }

    if (url && relativeFields) {
      axios.get(`https://av.admtyumen.ru/${url}${id}`)
        .then((response) => {
          relativeFields.forEach(({ fieldName, responseKey }) => {
            form.setFieldValue(fieldName, response.data.objects[0][responseKey]);
          });
        });
    }
  }

  handleChange = (option) => {
    const { togglePortal } = this;
    const { fieldName } = this.state;
    const { form } = this.props;

    this.getRelativeFieldsData(option);

    const value = option === null ? null : option.value;
    form.setFieldValue(fieldName, value);

    togglePortal();
  }

  togglePortal = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
    const { handleChange, togglePortal } = this;
    const { options, fieldName, isOpen } = this.state;
    const {
      field,
      form,
      labelName,
      schema,
    } = this.props;

    const value = this.getValue();

    const isInvalid = form.errors[schema[field.name].local_fk_field];
    const labelStyles = classNames(
      styles.label,
      value ? styles.labelActive : undefined,
      isInvalid ? styles.labelInvalide : undefined,
    );

    return (
      <Fragment>
        <div className={styles.wrapper}>
          <label className={labelStyles}>{labelName}</label>
          <button
            onClick={togglePortal}
            className={styles.button}
            type='button'
          >
            {value && value.label}
          </button>
        </div>
        {isOpen
          && <div className={styles.portal}>
            <button
              className={styles.buttonBack}
              onClick={togglePortal}
            >
              <FAIcon name='fas fa-chevron-left' />
            </button>
            <Select
              id={fieldName}
              name={fieldName}
              onChange={handleChange}
              onBlur={field.onBlur}
              options={options}
              value={value}
              placeholder={'Выберете...'}
              openOnFocus={true}
              autoFocus={true}
              arrowRenderer={null}
              // className={styles.outer}
            />
          </div>
        }
      </Fragment>
    );
  }
}

export default ManyToOneField;

import React, {Fragment} from 'react';
import DadataSuggestions from 'react-dadata-suggestions';
import axios from 'axios';
import wkt from 'wellknown';
import classNames from 'classnames';
import FAIcon from '~/components/carRequest/components/ui/FAIcon';

import styles from './DeliveryAddressField.css';

const TOKEN = '4868643d1f0114d51c64d6ead69f6649b614ba19';

class DeliveryAddressField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  handleChange = (value) => {
    const { field, form } = this.props;

    form.setFieldValue(field.name, value);
  }

  componentDidUpdate = () => {
    if (document.querySelector('.suggestions-input') !== null) {
      document.querySelector('.suggestions-input').focus();
    }
  }


  handleSelect = (value) => {
    const { field, form } = this.props;

    form.setFieldValue(field.name, value.value);
    if (!form.touched[field.name]) form.setTouched({ [field.name]: true });

    if (!value.data.geo_lon && !value.data.geo_lat) {
      axios.get('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address?5', {
        params: {
          query: value.value,
          count: 1,
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${TOKEN}`,
        },
      })
        .then((response) => {
          const suggest = response.data.suggestions[0].data;
          const { geo_lon, geo_lat } = suggest;

          const point = wkt.stringify({
            type: 'Point',
            coordinates: [geo_lon, geo_lat],
          });

          form.setFieldValue('point', point);
        });
    }
  }

  togglePortal = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
    const { handleChange, handleSelect, togglePortal } = this;
    const { isOpen } = this.state;
    const {
      field,
      form,
      labelName,
    } = this.props;

    const isInvalid = form.errors[field.name];
    const labelStyles = classNames(
      styles.label,
      true ? styles.labelActive : undefined,
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
            {field.value ? field.value : 'Тюменская обл, г Тюмень'}
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
            <DadataSuggestions
              token={TOKEN}
              query={field.value ? field.value : 'Тюменская обл, г Тюмень'}
              // onChange={handleChange}
              onSelect={handleSelect}
              hint={form.errors.point && form.touched[field.name] ? form.errors.point : ''}
            />
            <button
              className={styles.buttonAccept}
              onClick={togglePortal}
            >
              <FAIcon name='fas fa-check' />
            </button>
          </div>
        }
        {form.errors.point && form.touched[field.name] ? <div className='errorMessage'>{form.errors.point}</div> : null}
      </Fragment>
    );
  }
}

export default DeliveryAddressField;

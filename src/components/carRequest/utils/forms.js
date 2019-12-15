import React from 'react';
import {Field} from 'formik';

import FieldWrapper from '~/components/carRequest/components/common/FieldWrapper';
import ManyToOneField from '~/components/carRequest/components/common/ManyToOneField';
import DateTimeField from '~/components/carRequest/components/common/DateTimeField';
import DeliveryAddressField from '~/components/carRequest/components/common/DeliveryAddressField';
import StatusField from '~/components/carRequest/components/common/StatusField';
import EstimatedDuration from '~/components/carRequest/components/common/EstimatedDuration';
import TextField from '~/components/carRequest/components/common/TextField';
import BooleanField from '~/components/carRequest/components/common/BooleanField';

const getHelperText = (name, schema) => schema[name]
  && schema[name].info && schema[name].info.helper_text;

const shortLabels = {
  prove_of_transport_use: 'Обоснование',
  passengers_count: 'Колличество пассажиров',
  contact_person: 'Контактное лицо',
  contact_person_phone: 'Телефон контактного лица',
  contact_person_email: 'E-mail контактного лица'
}

export const getLabel = (fieldName, schema) => {
  if (schema[fieldName] && schema[fieldName].info && schema[fieldName].info.verbose_name) {
    return schema[fieldName].info.verbose_name;
  } else if (schema[fieldName] && schema[fieldName].info && schema[fieldName].info.verbose_name_mobile) {
    return schema[fieldName].info.verbose_name_mobile;
  } else {
    return schema.__meta.column_titles[fieldName];
  }
}

export const renderField = (name, schema, user) => {
  const fieldData = schema[name];
  let helperText = null;
  // const helperText = getHelperText(name, schema);

  let label = '';

  if (shortLabels[name]) {
    helperText = getLabel(name, schema);
    label = shortLabels[name];
  } else {
    label = getLabel(name, schema);
  }

  let type = 'str';
  if (fieldData) {
    type = fieldData.type;
  }
  switch (type) {
    case 'str':
    case 'int':
      switch (name) {
        case 'delivery_address':
        case 'address':
          return (
            <FieldWrapper helperText={helperText}>
              <Field
                name={name}
                component={DeliveryAddressField}
                labelName={label}
              />
            </FieldWrapper>
          );
        default:
          return (
            <FieldWrapper helperText={helperText}>
              <Field
                name={name}
                component={TextField}
                labelName={label}
              />
            </FieldWrapper>
          );
      }
    case 'enum':
      const { choices, default: defaultChoice } = fieldData;
      return (
        <FieldWrapper helperText={helperText}>
          <Field
            name={name}
            defaultChoice={defaultChoice}
            choices={choices}
            component={StatusField}
            labelName={label}
          />
        </FieldWrapper>
      );
    case 'datetime':
      switch (name) {
        case 'delivery_datetime':
          return (
            <FieldWrapper helperText={helperText}>
              <Field
                name={name}
                component={DateTimeField}
                defaultDate={new Date()}
                labelName={label}
                disabled
              />
            </FieldWrapper>
          );
        default:
          return (
            <FieldWrapper helperText={helperText}>
              <Field
                name={name}
                component={DateTimeField}
                labelName={label}
              />
            </FieldWrapper>
          );
      }
    case 'MANYTOONE':
      return (
        <FieldWrapper helperText={helperText}>
          <Field
            name={name}
            component={ManyToOneField}
            schema={schema}
            labelName={label}
            helperText={helperText}
            user={user}
          />
        </FieldWrapper>
      );
    case 'timedelta':
      return (
        <FieldWrapper helperText={helperText}>
          <Field
            name={name}
            component={EstimatedDuration}
            schema={schema}
            labelName={label}
          />
        </FieldWrapper>
      );
    case 'bool':
    case 'boolean':
      return (
        <FieldWrapper helperText={helperText}>
          <Field
            name={name}
            component={BooleanField}
            labelName={label}
          />
        </FieldWrapper>
      );
    // case 'int':
    // return (
    //   <Field
    //     name={name}
    //     type='number'
    //   />
    // )
    default:
      return null;
  }
};

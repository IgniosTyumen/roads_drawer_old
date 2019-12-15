import React, {Fragment} from 'react';
import axios from 'axios';
import {connect, Formik} from 'formik';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import Cookies from 'cookies-js';
import wkt from 'wellknown';
import {replaceItem} from '~/components/carRequest/utils/helpers';
import Tabs from './Tabs';
import TablePage from '~/components/carRequest/components/TablePage';
import FieldsTab from './FieldsTab';
import ChangeLogTab from './ChangeLogTab';
import MapTab from './MapTab';
import {MAP_CENTER, MAP_TILE, MAP_ZOOM} from '../../constants/Map';
import Button from '~/components/carRequest/components/ui/Button';
import FAIcon from '~/components/carRequest/components/ui/FAIcon';
import styles from './Modal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'form',
      sending: false,
      fetching: false,
    };
  }

  getPathDistance = (rowIndex, latSrc, longSrc, latDst, longDst) => {
    const { updateRowInFormik } = this;
    const { updateRow } = this.props;

    axios.get('https://av.admtyumen.ru/'+'/api/public/car_request_get_graph_distance', {
      params: {
        latitude_src: latSrc,
        longitude_src: longSrc,
        latitude_dst: latDst,
        longitude_dst: longDst,
      },
    })
      .then((res) => {
        const distance = res.data.response;
        const updatedDistance = { path_distance: (distance / 1000).toFixed(1) };
        updateRow(updatedDistance, rowIndex, 1);
        updateRowInFormik(updatedDistance, rowIndex);
      });
  }

  handleSubTableSubmit = (newValues) => {
    const { getPathDistance } = this;
    const {
      subTableFieldName,
      formik,
      id,
      addRows,
      updatePage,
      handleToggleModal,
    } = this.props;

    const oldObjects = formik.values[subTableFieldName] ? formik.values[subTableFieldName] : [];
    if (id) {
      // Updating
      let editingObjIndex;
      let editingObj;

      oldObjects.forEach((obj, i) => {
        if (obj.id === id) {
          editingObjIndex = i;
          editingObj = obj;
        }
      });

      editingObj = {
        ...editingObj,
        ...newValues,
        __action__: 'update',
        __loaded__: true,
      };

      if (subTableFieldName === 'delivery_address_car_items') {
        let srcPoint;

        if (editingObjIndex === 0) {
          srcPoint = formik.values.point;
        } else {
          srcPoint = formik.values.delivery_address_car_items[editingObjIndex - 1].point;
        }

        const dstPoint = newValues.point;

        const [latSrc, longSrc] = wkt.parse(srcPoint).coordinates;
        const [latDst, longDst] = wkt.parse(dstPoint).coordinates;

        getPathDistance(editingObjIndex, latSrc, longSrc, latDst, longDst);

        editingObj.path_distance = '...';
      }

      const editedObjects = [
        ...oldObjects.slice(0, editingObjIndex),
        editingObj,
        ...oldObjects.slice(editingObjIndex + 1),
      ];

      formik.setFieldValue(subTableFieldName, editedObjects);
      updatePage(editedObjects);
    } else {
      // Creating
      const newObj = {
        ...newValues,
        id: `rec_${String(Math.random()).substring(2, 4)}`,
        __action__: 'create',
        __loaded__: true,
      };

      const creatingObjIndex = oldObjects.length || 0;

      if (subTableFieldName === 'delivery_address_car_items') {
        newObj.path_distance = '...';

        let srcPoint;

        if (
          formik.values.delivery_address_car_items
            && formik.values.delivery_address_car_items.length !== 0
        ) {
          srcPoint = formik.values.delivery_address_car_items[formik.values.delivery_address_car_items.length - 1].point;
        } else if (formik.values.point) {
          srcPoint = formik.values.point;
        } else {
          toast.error('Не введен адрес подачи');
          return;
        }

        const dstPoint = newValues.point;

        const [latSrc, longSrc] = wkt.parse(srcPoint).coordinates;
        const [latDst, longDst] = wkt.parse(dstPoint).coordinates;

        getPathDistance(creatingObjIndex, latSrc, longSrc, latDst, longDst);
      }

      formik.setFieldValue(subTableFieldName, [...oldObjects, newObj]);
      addRows([newObj]);
    }
    handleToggleModal();
  }

  updateRowInFormik = (updatedColsInRow, rowIndex) => {
    const { formik, subTableFieldName } = this.props;
    const oldRows = formik.values[subTableFieldName] ? formik.values[subTableFieldName] : [];

    const oldRow = oldRows[rowIndex];
    const updatedRow = { ...oldRow, ...updatedColsInRow };
    const updatedRows = replaceItem(oldRows, updatedRow, rowIndex);

    formik.setFieldValue(subTableFieldName, updatedRows);
  }

  handleParentSubmit = (values) => {
    const { schema, id, handleToggleModal } = this.props;
    console.log(schema, values);
    const url = schema.__meta.urls[schema.__meta.resource_type];
    const csrf = Cookies.get('csrf-token');

    if (id) {
      console.log('editing');

      console.log(schema, values);
      const updatedItem = {
        ...values,
        __action__: 'update',
        __loaded__: true,
      };

      console.log(updatedItem);
      axios.put(`https://av.admtyumen.ru/${url}/${id}`, {
        schema,
        record: updatedItem,
      }, {
        headers: {
          'X-CSRFToken': csrf,
        },
      })
        .then((response) => {
          if (response.status >= 400) {
            toast.error(`Ошибка: ${response.data.message}`);
          } else if (response.status >= 200 && response.status < 300) {
            toast.success(`Заявка обновлена ${response.data.message}`);
            handleToggleModal();
          } else {
            toast.info(response.data.message);
          }
        })
        .catch((error) => {
          toast.error(`Ошибка: ${error.response.data.message}`);
        });
    } else {
      console.log('creating');

      const url = '/api/directory/carrequestforusershort';
      const updatedItem = {
        ...values,
        __action__: 'create',
        __loaded__: true,
        id: `rec_${String(Math.random()).substring(2, 4)}`,
      };

      this.setState({ sending: true });
      axios.post('https://av.admtyumen.ru/'+url, {
        record: updatedItem,
        schema,
      },
      {
        headers: {
          'X-CSRFToken': csrf,
        },
      })
        .then((response) => {
          this.setState({ sending: false });
          if (response.status >= 400) {
            toast.error(`Ошибка: ${response.data.message}`);
          } else if (response.status >= 200 && response.status < 300) {
            toast.success(`Заявка подана ${response.data.message}`);
            handleToggleModal();
          } else {
            toast.info(response.data.message);
          }
        })
        .catch((error) => {
          this.setState({ sending: false });
          toast.error(`Ошибка: ${error.response.data.message}`);
        });
    }
  }

  handleSubmit = (values) => {
    const { handleParentSubmit, handleSubTableSubmit } = this;
    const { sending } = this.state;
    const { isSubTable } = this.props;
    if (isSubTable) {
      handleSubTableSubmit(values);
    } else if (!sending) {
      handleParentSubmit(values);
    }
  }

  handleTabClick = tabName => () => {
    this.setState({
      activeTab: tabName,
    });
  }

  renderContent = () => {
    const {
      handleSubmit,
      startFetching,
      endFetching,
    } = this;
    const { activeTab } = this.state;
    const {
      id,
      schema,
      handleToggleModal,
      isSubTable,
      subTableFieldName,
      formik,
      user,
    } = this.props;

    const { inlines } = schema.__meta;

    const inlinesKeys = Object.keys(inlines);

    const mapTab = <MapTab
        center={MAP_CENTER}
        zoom={MAP_ZOOM}
        tile={MAP_TILE}
      />;
    const isMapTab = activeTab === 'geodata' ? mapTab : null;

    return (
      <Fragment>
        <div
          className={styles.windowWrapper}
          style={{ display: activeTab === 'form' ? 'flex' : 'none' }}
        >
          <FieldsTab
            schema={schema}
            id={id}
            handleSubmit={handleSubmit}
            handleToggleModal={handleToggleModal}
            isSubTable={isSubTable}
            subTableFieldName={subTableFieldName}
            parentFormik={formik}
            startFetching={startFetching}
            endFetching={endFetching}
            user={user}
          />
        </div>
        {isMapTab}
        <div
          className={styles.windowWrapper}
          style={{ display: activeTab === 'changeLog' ? 'flex' : 'none' }}
        >
          <ChangeLogTab />
        </div>
        {
          inlinesKeys.map((key, i) => (
            <div
              className={styles.windowWrapper}
              style={{ display: activeTab === key ? 'flex' : 'none' }}
              key={i}
            >
              <TablePage
                schema={inlines[key]}
                id={id}
                isSubTable
                isActive={activeTab === key}
                subTableFieldName={key}
              />
            </div>
          ))
        }
      </Fragment>
    );
  }

  getValidationSchema = () => {
    const { schema } = this.props;
    const { fields } = schema.__meta;

    const shape = {};

    const addValidation = (field) => {
      const stateName = schema[field].type === 'MANYTOONE' ? schema[field].local_fk_field : field;
      const { type, is_required } = schema[stateName];
      switch (type) {
        case 'str':
        case 'datetime':
        case 'timedelta':
          shape[stateName] = Yup.string().nullable();
          if (is_required) shape[stateName] = shape[stateName].required();
          break;
        case 'int':
          shape[stateName] = Yup.number().nullable();
          if (is_required) shape[stateName] = shape[stateName].required();
          break;
        case 'json':
          shape.point = Yup.string().nullable()
            .test(
              'geodata-is-center-city',
              'Координаты адреса не найдены, завершите поиск или укажите адрес на карте',
              (value) => {
                if (!value) return;
                const [longSrc, latSrc] = wkt.parse(value).coordinates;
                return (longSrc != '65.5344099' && latSrc != '57.1529744');
              },
            );
        default:
          break;
      }
    };

    fields.forEach((row) => {
      if (typeof row === 'object') {
        row.forEach(field => addValidation(field));
      } else if (typeof row === 'string') {
        addValidation(row);
      }
    });

    return Yup.object().shape(shape);
  }

  startFetching = () => {
    this.setState({ fetching: true });
  }

  endFetching = () => {
    this.setState({ fetching: false });
  }

  render() {
    const {
      renderContent,
      handleTabClick,
      handleSubmit,
      getValidationSchema,
    } = this;

    const { activeTab, fetching } = this.state;
    const { schema, handleToggleModal } = this.props;

    return (
      <div className={styles.modal}>
        <Formik
          validationSchema={getValidationSchema()}
          onSubmit={handleSubmit}
        >
          { props => <Fragment>
            <div className={styles.header}>
              <Button onClick={handleToggleModal} variant="close" size="tight">
                <FAIcon name='fa fa-times' />
              </Button>
              <Tabs schema={schema} handleTabClick={handleTabClick} activeTab={activeTab} />
            </div>
            { renderContent() }
            <div className={styles.footer}>
              <Button
                variant='success'
                onClick={props.handleSubmit}
                type='submit'
              >
                Сохранить
              </Button>
              <Button
                onClick={handleToggleModal}
              >
                Закрыть
              </Button>
            </div>
          </Fragment>
          }
        </Formik>
        {fetching && <div className={styles.layout}>Загрузка</div>}
      </div>
    );
  }
}

export default connect(Modal);

import React, {Fragment} from "react";
import 'antd/dist/antd.css';
import {Input, Modal, Select, Table} from 'antd';
import {calculateLengthBetweenPoints} from "../../utils/calculateLengthBetweenPoints";
import {calculatePermission} from "../../utils/calculatePermission";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";

const { confirm } = Modal;

const {Option} = Select;

function showDeleteConfirm(value) {
    confirm({
        title: 'Подтверждение удаления',
        content: 'Вы уверены, что хотите удалить маршрут?',
        okText: 'Да',
        okType: 'danger',
        cancelText: 'Нет',
        onOk() {
            waypointActions.deleteWaypoint(value.id)
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}

const TableForWaypoint = (props) => {

    function showDeleteConfirm(value) {
        confirm({
            title: 'Подтверждение удаления',
            content: 'Вы уверены, что хотите удалить маршрут?',
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Нет',
            onOk() {
                waypointActions.deleteWaypoint(value.id)
            },
            onCancel() {
                console.log('Отказ удаления записи'+value.id);
            },
        });
    }

    const {data, activeOrder, waypointActions, mapActions, userAuth} = props;

    const handleSelectWaypoint = (value) => {
        waypointActions.selectWaypoint(value, activeOrder.number, value.id)
    };

    const handleDeleteWaypoint = (value) => {
        showDeleteConfirm(value);

    }

    const columns = [

        {title: 'Название', key: 'road_name', dataIndex: 'road_name'},
        {title: 'Значение', dataIndex: 'importance', key: 'importance'},
        {title: 'Зонирование', dataIndex: 'district_name', key: 'district_name'},
        {
            title: 'Автор', key: 'author',

            render: (item) => {
                return <span>{item.user.last_name} {item.user.first_name[0]}.{item.user.middle_name ? item.user.middle_name[0] + '.' : ''}</span>
            }
        },
        {
            title: 'Действия',
            key: 'action',
            render: (item) => {
                const permissionToEdit = calculatePermission(item, userAuth);

                return (
                    <Fragment>
                        {permissionToEdit && <div>
                            <p>
                                <a onClick={() => {
                                    handleSelectWaypoint(item)
                                }}>Изменить</a>
                            </p>

                            <p>
                                <a onClick={() => {
                                    handleDeleteWaypoint(item)
                                }}>Удалить</a>
                            </p>
                        </div>}
                    </Fragment>
                )
            },
        },
    ];


    const onRowSelect = (event, record) => {
        if (record.geometry.points.length) {
            mapActions.setCenterAndZoom(record.geometry.points[0], 10)
        }
    }


    return (
        <Fragment>
        <Table
            size="small"
            columns={columns}
            dataSource={data}
            pagination={false}
            onRow={(record, rowIndex) => {
                return {
                    onMouseEnter: (event) => onRowSelect(event, record)
                }
            }}
        />

        </Fragment>
    );
}

const DrawSVG = <svg width="15" height="15" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.75002 17.85C9.53002 17.15 9.14002 15.22 8.24002 14C7.35002 12.75 6.12002 11.89 4.88002 11.06C3.99527 10.5023 3.20531 9.8069 2.54002 8.99997C2.26002 8.66997 1.69002 8.05997 2.27002 7.93997C2.86002 7.81997 3.88002 8.39997 4.40002 8.61997C5.31002 8.99997 6.21002 9.43997 7.05002 9.95997L8.06002 8.25997C6.50002 7.22997 4.50002 6.31997 2.64002 6.04997C1.58002 5.88997 0.460016 6.10997 0.100016 7.25997C-0.219984 8.24997 0.290016 9.24997 0.870016 10.03C2.24002 11.86 4.37002 12.74 5.96002 14.32C6.30002 14.65 6.71002 15.04 6.91002 15.5C7.12002 15.94 7.07002 15.97 6.60002 15.97C5.36002 15.97 3.81002 15 2.80002 14.36L1.79002 16.06C3.32002 17 5.88002 18.47 7.75002 17.85V17.85ZM18.84 2.24997C19.06 2.02997 19.06 1.66997 18.84 1.45997L17.54 0.159972C17.4353 0.0590267 17.2955 0.00262451 17.15 0.00262451C17.0046 0.00262451 16.8648 0.0590267 16.76 0.159972L15.74 1.17997L17.82 3.25997L18.84 2.24997ZM9.00002 7.91997V9.99997H11.08L17.23 3.84997L15.15 1.76997L9.00002 7.91997Z" fill="black"/>
</svg>

const OrderControlPanel = (props) => {
    const {activeOrder, waypointActions, waypointTemplate, handleSave, handleNewWaypoint, mapActions, userAuth} = props;

    const handleWaypointNameInputChange = (event) => {
        waypointActions.changeNameOfTemplate(event.target.value)
    };

    let distance = 0;
    let importance = '';
    let author = ''
    if (waypointTemplate.templateWaypoint) {
        const geoArray = [...waypointTemplate.templateWaypoint.geometry.points];
        for (let it = 1; it < geoArray.length; it++) {
            distance += calculateLengthBetweenPoints(geoArray[it - 1], geoArray[it]);
        }
        switch (waypointTemplate.templateWaypoint.importance) {
            case 'regional':
                importance = 'региональная';
                break;
            case 'Автомобильная дорога федерального значения':
                importance = 'Автомобильная дорога федерального значения';
                break;
            case 'city':
                importance = 'муниципальная';
                break;
        }
        author = waypointTemplate.templateWaypoint.author
    }

    let OptionsImportance = [];

    if (userAuth.importanceRights.federal || userAuth.importanceRights.all) OptionsImportance.push(<Option
        value="Автомобильная дорога федерального значения">Автомобильная дорога федерального значения</Option>)
    if (userAuth.importanceRights.regional || userAuth.importanceRights.all) OptionsImportance.push(<Option
        value="Автомобильная дорога регионального или межмуниципального значения">Автомобильная дорога регионального или
        межмуниципального значения</Option>)
    if (userAuth.importanceRights.municipal || userAuth.importanceRights.all) OptionsImportance.push(<Option
        value="Автомобильная дорога местного значения">Автомобильная дорога местного значения</Option>)

    const handleSelectImportanceChange = (value) => {
        waypointActions.changeImportanceOfTemplate(value);
    }

    let SelectImportance =
        <Select
            defaultValue={waypointTemplate.templateWaypoint ? waypointTemplate.templateWaypoint.importance || "Автомобильная дорога регионального или межмуниципального значения" : ''}
            style={{
                marginLeft: "20px",
                marginRight: "20px",
                width: "90%"
            }}
            onChange={handleSelectImportanceChange}>
            {OptionsImportance}
        </Select>


    let OptionsDistricts = userAuth.districtRights.map(element => <Option value={element.id}>{element.name}</Option>)

    const handleSelectDistrictChange = (value) => {
        const districtName = userAuth.districtRights.find(el => el.id === value).name;
        waypointActions.changeDistrictOfTemplate(value, districtName);
    }

    let SelectDistrict =
        <Select
            defaultValue={waypointTemplate.templateWaypoint ? waypointTemplate.templateWaypoint.district_id || userAuth.districtRights[0].id : ''}
            style={{
                marginLeft: "20px",
                marginRight: "20px",
                width: "90%"
            }}
            onChange={handleSelectDistrictChange}>
            {OptionsDistricts}
        </Select>

    return (
        <div className={'orderMainPanelContainer'}>
            <p className={'orderMainPanelContainerText'}>Номер
                заявления: {activeOrder.waypoints[0] ? activeOrder.waypoints[0].case_number : 'Не присвоен'}</p>
            <p className={'orderMainPanelContainerText'}>Статус
                заявления: {activeOrder.waypoints[0] ? activeOrder.waypoints[0].petition_status : 'Не присвоен'}</p>
            {!waypointTemplate.templateWaypoint && <div>
                <p className={'orderMainPanelContainerText'}>Направлений отработано: {activeOrder.waypoints.length}</p>


                <div onClick={handleNewWaypoint} className={'orderMainPanelContainerButton ripple'} style={{marginTop:'20px', marginBottom:'20px'}}>
                    <IconButton aria-label="Сохранить настройки слоя">
                        {DrawSVG}
                    </IconButton>
                    <span>Добавить направление</span>
                </div>

                <TableForWaypoint data={activeOrder.waypoints}
                                  waypointActions={waypointActions}
                                  activeOrder={activeOrder}
                                  mapActions={mapActions}
                                  userAuth={userAuth}
                />
            </div>}
            {waypointTemplate.templateWaypoint &&
            <div>
                <p className={'orderMainPanelContainerText'}>Название: </p>
                <div style={{width:'100%'}}>
                <Input value={waypointTemplate.templateWaypoint.road_name} onChange={handleWaypointNameInputChange}
                       style={
                           {
                               marginLeft: "20px",
                               marginRight: "20px",
                               width: "90%"
                           }
                       }/>
                </div>
                <p className={'orderMainPanelContainerText'}>Значение: </p>
                {SelectImportance}
                <p className={'orderMainPanelContainerText'}>Округ:</p>
                {SelectDistrict}
                <p className={'orderMainPanelContainerText'}>Автор: {waypointTemplate.templateWaypoint.user.last_name} {waypointTemplate.templateWaypoint.user.first_name} {waypointTemplate.templateWaypoint.user.middle_name}</p>
                {waypointTemplate.templateWaypoint.user.email ?
                    <p className={'orderMainPanelContainerText'}>
                        Адрес автора: {waypointTemplate.templateWaypoint.user.email}
                    </p>
                    : null}
                {waypointTemplate.templateWaypoint.user.phone ?
                    <p className={'orderMainPanelContainerText'}>Телефон
                        автора: {waypointTemplate.templateWaypoint.user.phone} </p> : null}
                <p className={'orderMainPanelContainerText'}>Длина участка: {(distance / 1000).toFixed(3)} км</p>
                <div onClick={handleSave} className={'orderMainPanelContainerButton ripple'}>
                    <IconButton aria-label="Сохранить настройки слоя">
                        <SaveIcon/>
                    </IconButton>
                    <span>Сохранить изменения</span>
                </div>

            </div>
            }
        </div>
    )
};

export default OrderControlPanel;

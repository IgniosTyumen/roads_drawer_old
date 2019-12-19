import React, {useEffect, useState} from "react";
import {Popup} from "react-leaflet";
import Button from "../ui/Button";
import {Icon, Spin} from 'antd';

const RoadPopup = ({road, dispatch}) => {

    const [fetching,setFetching] = useState('initial');
    const takeAllData = () => {
        setFetching('fetching');
        dispatch({
            type: 'GET_FULL_ROAD_DATA',
            payload: road.id
        });
    };

    let DetailedInfo;

    const handleLoadComplete = () => {
        if (road.roadFullInfo && fetching==='fetching') setFetching('loaded')
    };


    if (fetching==='initial'){
        DetailedInfo = <Button variant onClick={takeAllData}>
            Получить полную информацию
        </Button>
    };

    if (fetching==='fetching') {
        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        DetailedInfo = <Spin indicator={antIcon} />
    };

    if (fetching==='loaded'){
        let importance = 'Не указано';
        switch (road.roadFullInfo.importance) {
            case 'regional':
                importance='Автомобильные дороги регионального или межмуниципального значения';
                break;
        }
        DetailedInfo =
            <div>
                <p>Муниципалитет: {road.roadFullInfo.district.name}</p>
                <p>Значение: {importance}</p>
                <p>Код дороги: {road.roadFullInfo.road_code}</p>
                <p>Номер дороги: {road.roadFullInfo.road_number}</p>
                <p>Длина дороги:{road.roadFullInfo.summ_road} </p>
                <p>Собственник дороги: {road.roadFullInfo.owner_organization.full_name}</p>
            </div>
    }

    useEffect(handleLoadComplete,[road.roadFullInfo]);

    return (
        <Popup>
            <div>
                <p>Краткая информация:</p>
                <p>ID дороги: {road.id}</p>
                <p>Название дороги: {road.name}</p>
                <a href={`https://av.admtyumen.ru/#/directory/roaddirectory/inst_id=${road.id}`} target='_blank' rel="noopener noreferrer" >Открыть в справочнике</a>
            </div>
            <div>
                <p>Подробная информация:</p>
                {DetailedInfo}
            </div>
            <div>

            </div>
        </Popup>
    )
};

export default RoadPopup;

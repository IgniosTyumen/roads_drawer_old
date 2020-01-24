import React, {useState} from "react";
import {Popup} from "react-leaflet";
import {Button, Icon, Spin} from 'antd';

const RoadPopup = ({road, dispatch,markAsActiveForGeometry}) => {

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

        DetailedInfo =
            <Button type="link" size={'small'} onClick={takeAllData}>
                Получить
            </Button>

        // <RippleButton label={'Получить'} onClick={takeAllData} />
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

    // useEffect(handleLoadComplete,[road.roadFullInfo]);
    return (
        <Popup>
            <div>
                <p>Краткая информация:</p>
                <p>ID дороги: {road.id}</p>
                <p>Название дороги: {road.name}</p>
                <Button type={'link'}  size={'small'} href={`https://av.admtyumen.ru/#/directory/roaddirectory/inst_id=${road.id}`} target='_blank' rel="noopener noreferrer" >Открыть в системе</Button>

            </div>
            <div>
                <span>Подробная информация:</span>
                {DetailedInfo}
            </div>
            {road.segments_set && road.segments_set.length ?
                <Button type="link" size={'small'} onClick={markAsActiveForGeometry}>
                    Начать редактирование участков
                </Button>
                :
                <p>Внимание!! Дороге не присвоен ни один участок</p>
            }
            <div>

            </div>
        </Popup>
    )
};

export default RoadPopup;

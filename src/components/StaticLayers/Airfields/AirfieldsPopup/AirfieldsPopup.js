import React, {useState} from "react";
import {Popup} from "react-leaflet";
import {Button, Icon, Spin} from "antd";

const AirfieldsPopup = ({obj, dispatch}) => {


    const [fetching,setFetching] = useState('initial');

    const takeAllData = () => {
        setFetching('fetching');
        dispatch({
            type: 'GET_FULL_OBJECT_DATA',
            id: obj.id,
            reducer: 'airfields',
            callbackOnFinish: setFetching
        });
    };

    let DetailedInfo;


    if (fetching==='initial'){

        DetailedInfo =
            <div>
                <p>Полная информация:</p>
                <Button type="link" size={'small'} onClick={takeAllData}>
                    Загрузить
                </Button>
            </div>
    };

    if (fetching==='fetching') {
        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        DetailedInfo = <Spin indicator={antIcon} />
    };

    if (fetching==='loaded' || obj.objectFullInfo){
        DetailedInfo =
            <div>
                <p>Размеры: {obj.objectFullInfo.size  ? obj.objectFullInfo.size : "Не установлено"}</p>
            </div>
    }




    return (
        <Popup>
            <div>
                <p>Название: {obj.name}</p>
                <p>Принимаемые судна: {obj.aircraft_type}</p>
                <p>Тип покрытия: {obj.coating_type}</p>
                <p>Собственник: {obj.owner}</p>
                <p>Описание: {obj.description}</p>
                <p>Доп. информация: {obj.comment}</p>
                <a href={`https://av.admtyumen.ru/#/directory/helipads/inst_id=${obj.id}`} target='_blank' rel="noopener noreferrer" >Открыть в справочнике</a>
                {DetailedInfo}
            </div>

        </Popup>
    )
};


export default AirfieldsPopup;

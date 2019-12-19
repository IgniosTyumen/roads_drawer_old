import React from "react";
import {Button} from "@material-ui/core";

const RoadDetailObject = ({object, handleSelectDetailedObject, uploadFullRoadInfo, moveMapToObject, markAsActiveForGeometry}) => {

    return (
        <div>
            <p>ID дороги: {object.id}</p>

            <p>Название дороги: {object.name}</p>
            <p>Номер дороги: {object.road_number}</p>

            <p>Тип объекта: {object.type}</p>

            {/*<p>Прикреплена геометрия : {object.line_path}</p>*/}

            <p>Длина дороги: {object.length} км</p>

            <p>Категория дороги: {object.road_category}</p>

            <p>Принадлежность городу: {object.city ? object.city.name : 'Не указано'}</p>

            <div className={'detailedObjectPanelButtonGroup'}>
                <a href={`https://av.admtyumen.ru/#/directory/roaddirectory/inst_id=${object.id}`} target='_blank' rel="noopener noreferrer" >Открыть в справочнике</a>
                <Button type={'variant'} onClick={moveMapToObject}>Перейти</Button>
                <Button type={'variant'} onClick={uploadFullRoadInfo}>Загрузить дочерние объекты</Button>
                <Button type={'variant'} onClick={markAsActiveForGeometry}>Начать работу с участками</Button>
            </div>
            <Button className={'closeDetailedObjectPanelButton'} type={'variant'} onClick={() => handleSelectDetailedObject(null, null)}>X</Button>
        </div>
    )
};

export default RoadDetailObject;

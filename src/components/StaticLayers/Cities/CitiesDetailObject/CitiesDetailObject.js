import React from "react";
import {Button} from "@material-ui/core";
import moment from "moment";

//TODO proceed data
const CitiesDetailObject = ({object, handleSelectDetailedObject, moveMapToObject}) => {
    const start = object.date_time_start_plan ? moment(object.date_time_start_plan, ['DD-MM-YYYY'], 'ru', false).format('DD-MM-YYYY') : '';
    const end = object.date_time_start_plan ? moment(object.date_time_end_plan, ['DD-MM-YYYY'], 'ru', false).format('DD-MM-YYYY') : '';
    return (
        <div style={{marginTop:'20px'}}>

            <p>Название участка: {object.name}</p>
            <p>Подтверждено: {object.approved ? 'да' : 'нет'}</p>
            <p>Код контроля объекта: {object.control_object_code ? object.control_object_code : 'Не определено'}</p>
            <p>Планируема дата начала: {object.date_time_start_plan ? start : 'Не определено'}</p>
            <p>Планируема дата окончания: {object.date_time_end_plan ? end : 'Не определено'}</p>
            <p>Код контроля объекта: {object.control_object_code ? object.control_object_code : 'Не определено'}</p>
            <p>Тип работ: {object.roadworktype ? object.roadworktype.name : 'Не определено'}</p>
            <p>Округ: {object.district ? object.district.name : 'Не определено'}</p>
            <p>Начало участка: {object.start_road} км</p>
            <p>Конец участка: {object.end_road} км</p>
            <a href={`https://av.admtyumen.ru/#/directory/menatwork/inst_id=${object.id}`} target='_blank' rel="noopener noreferrer" >Открыть в справочнике</a>

            <div className={'detailedObjectPanelButtonGroup'}>
                <Button type={'variant'} onClick={moveMapToObject}>Перейти</Button>
            </div>
            <Button className={'closeDetailedObjectPanelButton'} type={'variant'} onClick={() => handleSelectDetailedObject(null, null)}>X</Button>
        </div>
    )
};

export default CitiesDetailObject;

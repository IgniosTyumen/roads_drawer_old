import React from "react";
import {Popup} from "react-leaflet";
import moment from "moment";

const DangerRoadPopup = ({road, dispatch}) => {


    const start = road.date_time_start_plan ? moment(road.date_time_start_plan, ['DD-MM-YYYY'], 'ru', false).format('DD-MM-YYYY') : '';
    const end = road.date_time_start_plan ? moment(road.date_time_end_plan, ['DD-MM-YYYY'], 'ru', false).format('DD-MM-YYYY') : '';
       let DetailedInfo =
            <div>
                <p>Название участка: {road.name}</p>
                <p>Подтверждено: {road.approved ? 'да' : 'нет'}</p>
                <p>Код контроля объекта: {road.control_road_code ? road.control_road_code : 'Не определено'}</p>
                <p>Планируема дата начала: {road.date_time_start_plan ? start : 'Не определено'}</p>
                <p>Планируема дата окончания: {road.date_time_end_plan ? end : 'Не определено'}</p>
                <p>Код контроля объекта: {road.control_road_code ? road.control_road_code : 'Не определено'}</p>
                <p>Тип работ: {road.roadworktype ? road.roadworktype.name : 'Не определено'}</p>
                <p>Округ: {road.district ? road.district.name : 'Не определено'}</p>
                <p>Начало участка: {road.start_road} км</p>
                <p>Конец участка: {road.end_road} км</p>
                <a href={`https://av.admtyumen.ru/#/directory/menatwork/inst_id=${road.id}`} target='_blank' rel="noopener noreferrer" >Открыть в справочнике</a>
            </div>


    return (
        <Popup>
            {DetailedInfo}
        </Popup>
    )
};

export default DangerRoadPopup;

import React, {Fragment, useState} from "react";
import {Checkbox, Radio} from 'antd';

const DrawAlgorithmPanel = ({appActions}) => {

    const [algorithm,setAlgorithm] = useState({value:'roadpath'})


    const onAlgorithmChange = (event) => {
        setAlgorithm({value:event.target.value})
        appActions.setDrawAlgorithm(event.target.value)
    }

    const options = [
        { label: 'Автомобильная дорога местного значения', value: 'municipal' },
        { label: 'Автомобильная дорога регионального или межмуниципального значения', value: 'regional' },
        { label: 'Автомобильная дорога федерального значения', value: 'federal' },
        { label: 'Неизвестное значение автодороги', value: 'unknown' },
    ];

    const onChangeRoadFilter = (checkedValues) => {
        appActions.setRoadsTypeFilter(checkedValues)
    }

    return (
        <Fragment>
            <div>
                <span>Фильтр способа построения</span>
            <Radio.Group onChange={onAlgorithmChange} value={algorithm.value} style={{display:"flex",flexDirection:"column"}}>
                <Radio value={'roadpath'}>Базовая</Radio>
                <Radio value={'segmentsOnly'}>Только сегменты</Radio>
                <Radio disabled value={'segment_agglomeration'}>Агломерации</Radio>
                <Radio disabled value={'segment_axle_load'}>Нагрузка на оси</Radio>
                <Radio disabled value={'segment_category'}>Категория</Radio>
                <Radio disabled value={'segment_class'}>Класс</Radio>
                <Radio disabled value={'segment_coating'}>Покрытие</Radio>
                <Radio disabled value={'segment_lanes_amount'}>Полосность</Radio>
                <Radio disabled value={'segment_max_speed'}>Ограничения скорости</Radio>
                <Radio disabled value={'segment_nonnormative'}>Ненормативное состояние</Radio>
                <Radio disabled value={'segment_overload'}>Перегрузка</Radio>
                <Radio disabled value={'segment_region'}>Субъекты РФ</Radio>
            </Radio.Group>


            </div>
            <div>
                <span>Фильтр по типу дорог</span>
                <Checkbox.Group options={options} defaultValue={['municipal','regional','federal', 'unknown']} onChange={onChangeRoadFilter} />
            </div>

        </Fragment>
    )
};

export  default DrawAlgorithmPanel

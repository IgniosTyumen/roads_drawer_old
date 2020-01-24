import React from "react";
import VirtualizedTable from "../../../CommonComponents/VirtualizedTable/VirtualizedTable";


const RoadControlPanel = (props) => {
    const {roads, handleSelectDetailedObject, moveMapToObject, containerCallback} = props;

    const onRowClick = (target) => {
        moveMapToObject(target);
        const findRoad = roads.roads.find(el=>el.id===target.id)
        handleSelectDetailedObject(findRoad, 'road')
    };

    const columns = [
        {
            title: 'Наименование',
            key: 'name',
            width: '20%',
            type: 'string'
        },
        {
            title: 'Округ',
            key: 'district_name',
            width: '15%',
            type: 'string'
        },
        {
            title: 'Нас.пункт',
            key: 'city_name',
            width: '15%',
            type: 'string'
        },
        {
            title: '№ дороги',
            key: 'road_number',
            width: '15%',
            type: 'string'
        },
        {
            title: 'Начало',
            key: 'start_road',
            width: '15%',
            type: 'number'
        },
        {
            title: 'Конец',
            key: 'end_road',
            width: '15%',
            type: 'number'
        },
    ];

    return (
        <div className={"mainGroupPanel"}>
            <p className={'mainGroupPanelTitle'}>Список дорог</p>
            <div>
                <VirtualizedTable
                    data={roads.roads}
                    columns={columns}
                    onRowClick={onRowClick}
                    virtualId='roads'
                    containerCallback={containerCallback}
                />
            </div>
        </div>
    )
};

export default RoadControlPanel;

import React from "react";

import VirtualizedTable from "../../../CommonComponents/VirtualizedTable/VirtualizedTable";


const AirfieldsPanel = (props) => {

    const {obj,handleSelectDetailedObject,moveMapToObject,containerCallback} = props;

    const onRowClick = (target) => {
        moveMapToObject(target);
        handleSelectDetailedObject(target, 'airfield')
    };

    const columns = [
        {
            title: 'Название',
            key: 'name',
            width: '25%',
            type: 'string'
        },
        {
            title: 'Описание',
            key: 'description',
            width: '25%',
            type: 'string'
        },
        {
            title: 'Тип судна',
            key: 'aircraft_type',
            width: '25%',
            type: 'string'
        },
        {
            title: 'Покрытие',
            key: 'coating_type',
            width: '25%',
            type: 'string'
        },
    ];

    return (
        <div className={"mainGroupPanel"}>
            <p className={'mainGroupPanelTitle'}>Список аэродромов</p>
            <div>
                <VirtualizedTable
                    data={obj.airfields}
                    columns={columns}
                    onRowClick={onRowClick}
                    virtualId='airfields'
                    containerCallback={containerCallback}
                />
            </div>
        </div>
    )
};

export default AirfieldsPanel;

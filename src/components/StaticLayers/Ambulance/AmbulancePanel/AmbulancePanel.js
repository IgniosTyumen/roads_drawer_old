import React from "react";

import VirtualizedTable from "../../../CommonComponents/VirtualizedTable/VirtualizedTable";


const AmbulancePanel = (props) => {

    const {obj,handleSelectDetailedObject,moveMapToObject,containerCallback} = props;

    const onRowClick = (target) => {
        moveMapToObject(target);
        handleSelectDetailedObject(target, 'ambulance')
    };

    const columns = [
        {
            title: 'Название',
            key: 'name',
            width: '50%',
            type: 'string'
        },
        {
            title: 'Тип',
            key: 'mo_type',
            width: '50%',
            type: 'string'
        },
        // {
        //     title: 'Тип судна',
        //     key: 'aircraft_type',
        //     width: '25%',
        //     type: 'string'
        // },
        // {
        //     title: 'Покрытие',
        //     key: 'coating_type',
        //     width: '25%',
        //     type: 'string'
        // },
    ];

    return (
        <div className={"mainGroupPanel"}>
            <p className={'mainGroupPanelTitle'}>Список станций скорой помощи</p>
            <div>
                <VirtualizedTable
                    data={obj.ambulance}
                    columns={columns}
                    onRowClick={onRowClick}
                    virtualId='ambulance'
                    containerCallback={containerCallback}
                />
            </div>
        </div>
    )
};

export default AmbulancePanel;

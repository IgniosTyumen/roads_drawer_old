import React from "react";

import VirtualizedTable from "../../../CommonComponents/VirtualizedTable/VirtualizedTable";


const DangerRoadsPanel = (props) => {

    const {dangerRoads,handleSelectDetailedObject,moveMapToObject} = props;

    const onRowClick = (target) => {
        moveMapToObject(target);
        handleSelectDetailedObject(target, 'dangers')
    };

    const columns = [
        {
            title: 'Название объекта контроля',
            key: 'name',
            width: '100%',
            type: 'string'
        },
    ];

    return (
        <div className={"mainGroupPanel"}>
            <p className={'mainGroupPanelTitle'}>Список объектов контроля</p>
            <div>
                <VirtualizedTable
                    data={dangerRoads.dangers}
                    columns={columns}
                    onRowClick={onRowClick}
                    virtualId='dangers'
                />
            </div>
        </div>
    )
};

export default DangerRoadsPanel;

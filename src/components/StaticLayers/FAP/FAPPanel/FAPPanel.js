import React from "react";

import VirtualizedTable from "../../../CommonComponents/VirtualizedTable/VirtualizedTable";


const FAPPanel = (props) => {

    const {obj,handleSelectDetailedObject,moveMapToObject,containerCallback} = props;

    const onRowClick = (target) => {
        moveMapToObject(target);
        // handleSelectDetailedObject(target, 'fap')
    };

    const columns = [
        {
            title: 'Название',
            key: 'name',
            width: '33%',
            type: 'string'
        },
        {
            title: 'Принадлежность',
            key: 'hierarchy',
            width: '33%',
            type: 'string'
        },
        {
            title: 'Прикрепленное населения',
            key: 'attached_population',
            width: '34%',
            type: 'number'
        }
    ];


    return (
        <div className={"mainGroupPanel"}>
            <p className={'mainGroupPanelTitle'}>Список фельдшерско-акушерских пунктов</p>
            <div>
                <VirtualizedTable
                    data={obj.fap}
                    columns={columns}
                    onRowClick={onRowClick}
                    virtualId='fapfap'
                    containerCallback={containerCallback}
                />
            </div>
        </div>
    )
};

export default FAPPanel;

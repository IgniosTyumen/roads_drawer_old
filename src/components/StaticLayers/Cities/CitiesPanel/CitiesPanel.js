import React from "react";
import {Tag} from 'antd';
import SaveIcon from "@material-ui/icons/Save";
import IconButton from "@material-ui/core/IconButton";
import VirtualizedTable from "../../../CommonComponents/VirtualizedTable/VirtualizedTable";

const {CheckableTag} = Tag;


class BoolTag extends React.Component {
    state = {checked: this.props.defaultChecked};

    handleChange = checked => {
        this.setState({checked});
        this.props.onChange ? this.props.onChange(this.props.changeIdData, this.props.changeFieldData, checked) : null;
    };

    render() {
        return (
            <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange}>
                {this.state.checked ? this.props.textOnTrue : this.props.textOnFalse}
            </CheckableTag>
        );
    }
}

const CitiesPanel = (props) => {

    const {cities, handleSelectDetailedObject, moveMapToObject, handleFieldChange, containerCallback, handleSaveChanges} = props;

    const onRowClick = (target) => {
        moveMapToObject(target);
        handleSelectDetailedObject(target, 'city')
    };


    const farAwayBooleanRenderer = (text, record) => {
        return (
            <BoolTag defaultChecked={record.is_faraway ? record.is_faraway : false} textOnTrue={'Да'}
                     textOnFalse={'Нет'} changeIdData={record.id} changeFieldData={'is_faraway'}
                     onChange={handleFieldChange}/>
        );
    }

    const airportsNeedsBooleanRenderer = (text, record) => {
        return (
            <BoolTag defaultChecked={record.is_need_airport ? record.is_need_airport : false} textOnTrue={'Да'}
                     textOnFalse={'Нет'} changeIdData={record.id} changeFieldData={'is_need_airport'}
                     onChange={handleFieldChange}/>
        );
    }

    const roadsNeedsBooleanRenderer = (text, record) => {
        return (
            <BoolTag defaultChecked={record.is_need_road ? record.is_need_road : false} textOnTrue={'Да'}
                     textOnFalse={'Нет'} changeIdData={record.id} changeFieldData={'is_need_road'}
                     onChange={handleFieldChange}/>
        );
    }

    const columns = [
        {
            title: 'Название',
            key: 'name',
            width: '20%',
            type: 'string'
        },
        {
            title: 'Население',
            key: 'population',
            width: '20%',
            type: 'number'
        },
        {
            title: 'Труднодоступен',
            key: 'is_faraway',
            width: '20%',
            type: 'boolean',
            customRenderer: farAwayBooleanRenderer
        },
        {
            title: 'Авиаплощадки',
            key: 'is_need_airport',
            width: '20%',
            type: 'boolean',
            customRenderer: airportsNeedsBooleanRenderer
        },
        {
            title: 'Дороги',
            key: 'is_need_road',
            width: '20%',
            type: 'boolean',
            customRenderer: roadsNeedsBooleanRenderer
        },
    ];

    return (
        <div className={"mainGroupPanel"}>
            <p className={'mainGroupPanelTitle'}>Список населенных пунктов</p>
            <div>
                <VirtualizedTable
                    data={cities.cities}
                    columns={columns}
                    onRowClick={onRowClick}
                    virtualId='cities'
                    containerCallback={containerCallback}
                    height={'69vh'}
                />
            </div>
            <div onClick={handleSaveChanges} className={'orderMainPanelContainerButton ripple'}
                 style={{marginTop: '10px'}}>
                <IconButton>
                    <SaveIcon/>
                </IconButton>
                <span>Сохранить изменения</span>
            </div>

        </div>
    )
};

export default CitiesPanel;

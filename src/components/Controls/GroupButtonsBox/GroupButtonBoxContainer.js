import React from "react";
import {connect} from "react-redux";
import GroupButtonBox from "./GroupButtonBox";
import {bindActionCreators} from "redux";
import * as userPreferencesActions from '../../../actions/ChangePreferencesActions'
import * as visibleFilters from '../../../actions/MapFilterActions';

const GroupButtonBoxContainer = (props) => {
    const {handleSetMainGroupWindow, activeOrder, waypointTemplate,handleSelectDetailedObject,mapInvisibleList,mapVisibleFiltersActions,userPreferencesActions} = props;
    return (
        <GroupButtonBox
            handleSetMainGroupWindow={handleSetMainGroupWindow}
            activeOrder = {activeOrder}
            waypointTemplate ={waypointTemplate}
            handleSelectDetailedObject={handleSelectDetailedObject}
            mapInvisibleList={mapInvisibleList}
            mapVisibleFiltersActions={mapVisibleFiltersActions}
            userPreferencesActions={userPreferencesActions}
        />
    )
};

const mapStateToProps = state => {
    return {
        activeOrder : state.activeOrder.activeOrder,
        waypointTemplate: state.waypointTemplate,
        mapInvisibleList: state.visibleFilter.invisibleList,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        mapVisibleFiltersActions: bindActionCreators(visibleFilters, dispatch),
        userPreferencesActions:bindActionCreators(userPreferencesActions,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupButtonBoxContainer)

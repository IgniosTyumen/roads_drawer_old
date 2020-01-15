import React from "react";
import {connect} from "react-redux";
import GroupButtonBox from "./GroupButtonBox";

const GroupButtonBoxContainer = (props) => {
    const {handleSetMainGroupWindow, activeOrder, waypointTemplate,handleSelectDetailedObject} = props;
    return (
        <GroupButtonBox
            handleSetMainGroupWindow={handleSetMainGroupWindow}
            activeOrder = {activeOrder}
            waypointTemplate ={waypointTemplate}
            handleSelectDetailedObject={handleSelectDetailedObject}
        />
    )
};

const mapStateToProps = state => {
    return {
        activeOrder : state.activeOrder.activeOrder,
        waypointTemplate: state.waypointTemplate
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupButtonBoxContainer)

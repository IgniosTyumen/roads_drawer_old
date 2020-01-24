import React from "react";
import {connect} from "react-redux";
import RoadPopup from "./RoadPopup";

const RoadPopupContainer = ({road,  dispatch}) => {

    const markAsActiveForGeometry = () => {
        debugger
        dispatch({
            type: 'SELECT_ROAD_TO_WORK',
            payload: road
        })
    }

    return (
    <RoadPopup
        road={road}
        dispatch={dispatch}
        markAsActiveForGeometry={markAsActiveForGeometry}
    />
    )
};

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch:dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)( RoadPopupContainer)

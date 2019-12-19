import React from "react";
import {connect} from "react-redux";
import DangerRoadPopup from "./DangerRoadPopup";

const DangerRoadPopupContainer = ({road,  dispatch}) => {
    return (
    <DangerRoadPopup
        road={road}
        dispatch={dispatch}
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

export default connect(mapStateToProps, mapDispatchToProps)( DangerRoadPopupContainer)

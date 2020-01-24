import React from "react";
import {connect} from "react-redux";
import AmbulancePopup from "./AmbulancePopup";

const AmbulancePopupContainer = ({obj,  dispatch}) => {
    return (
    <AmbulancePopup
        obj={obj}
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

export default connect(mapStateToProps, mapDispatchToProps)( AmbulancePopupContainer)

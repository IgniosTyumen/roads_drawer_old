import React from "react";
import {connect} from "react-redux";
import AirfieldsPopup from "./AirfieldsPopup";

const AirfieldsPopupContainer = ({obj,  dispatch}) => {
    return (
    <AirfieldsPopup
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

export default connect(mapStateToProps, mapDispatchToProps)( AirfieldsPopupContainer)

import React from "react";
import {connect} from "react-redux";
import FAPPopup from "./FAPPopup";

const FAPPopupContainer = ({obj,  dispatch}) => {
    return (
    <FAPPopup
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

export default connect(mapStateToProps, mapDispatchToProps)( FAPPopupContainer)

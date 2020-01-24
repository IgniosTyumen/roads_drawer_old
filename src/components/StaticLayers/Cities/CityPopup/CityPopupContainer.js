import React from "react";
import {connect} from "react-redux";
import CityPopup from "./CityPopup";
import {bindActionCreators} from "redux";
import * as objectActions from "../../../../actions/ObjectActions";

const CityPopupContainer = ({obj,  dispatch, objectActions}) => {
    const handleFieldChange = (id,field,value) => {
        objectActions.updateFieldInCity(id,field,value)
        objectActions.updateFieldInCity(id,'changed',true)
    }
    return (
    <CityPopup
        obj={obj}
        dispatch={dispatch}
        handleFieldChange={handleFieldChange}
    />
    )
};



const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch:dispatch,
        objectActions:bindActionCreators(objectActions,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)( CityPopupContainer)

import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as mapActions from "../../../../actions/MapActions";
import * as selectObjectsActions from "../../../../actions/SelectObjectsActions";
import getPointsArrayFromLinestring from "../../../../utils/getPointsArrayFromLinestring";
import FAPDetailObject from "./FAPDetailObject";

const FAPDetailObjectContainer = props => {

    const {dispatch, object, handleSelectDetailedObject, mapActions, selectObjectsActions} = props ;

    const moveMapToObject = () => {
        mapActions.setCenterAndZoom(getPointsArrayFromLinestring(object.path)[0]);
        selectObjectsActions.selectFAP(object);
    }


    return (
        <FAPDetailObject
            object={object}
            handleSelectDetailedObject={handleSelectDetailedObject}
            moveMapToObject={moveMapToObject}
        /> )

};

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch,
        mapActions: bindActionCreators(mapActions,dispatch),
        selectObjectsActions: bindActionCreators(selectObjectsActions,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FAPDetailObjectContainer)

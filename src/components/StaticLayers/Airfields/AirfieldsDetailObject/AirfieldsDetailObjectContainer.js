import React from "react";
import {connect} from "react-redux";
import AirfieldsDetailObject from "./CitiesDetailObject";
import {bindActionCreators} from "redux";
import * as mapActions from "../../../../actions/MapActions";
import * as selectObjectsActions from "../../../../actions/SelectObjectsActions";
import getPointsArrayFromLinestring from "../../../../utils/getPointsArrayFromLinestring";

const AirfieldsDetailObjectContainer = props => {

    const {dispatch, object, handleSelectDetailedObject, mapActions, selectObjectsActions} = props ;

    const moveMapToObject = () => {
        mapActions.setCenterAndZoom(getPointsArrayFromLinestring(object.path)[0]);
        selectObjectsActions.selectAirfield(object);
    }


    return (
        <AirfieldsDetailObject
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

export default connect(mapStateToProps, mapDispatchToProps)(AirfieldsDetailObjectContainer)

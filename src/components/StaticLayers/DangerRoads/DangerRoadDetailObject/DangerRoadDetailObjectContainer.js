import React from "react";
import {connect} from "react-redux";
import DangerRoadDetailObject from "./DangerRoadDetailObject";
import {bindActionCreators} from "redux";
import * as mapActions from "../../../../actions/MapActions";
import * as selectObjectsActions from "../../../../actions/SelectObjectsActions";
import getPointsArrayFromLinestring from "../../../../utils/getPointsArrayFromLinestring";

const DangerRoadDetailObjectContainer = props => {

    const {dispatch, object, handleSelectDetailedObject, mapActions, selectObjectsActions} = props ;

    const moveMapToObject = () => {
        mapActions.setCenterAndZoom(getPointsArrayFromLinestring(object.path)[0]);
        selectObjectsActions.selectDangerRoad(object);
    }


    return (
        <DangerRoadDetailObject
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

export default connect(mapStateToProps, mapDispatchToProps)(DangerRoadDetailObjectContainer)

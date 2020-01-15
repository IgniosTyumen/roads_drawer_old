import React from 'react';
import {connect} from "react-redux";
import RoadDetailObject from "./RoadDetailObject";
import {bindActionCreators} from 'redux';
import * as mapActions from "~/actions/MapActions";
import * as selectObjectsActions from "~/actions/SelectObjectsActions";
import getPointsArrayFromLinestring from "../../../../utils/getPointsArrayFromLinestring";


const RoadDetailObjectContainer = props => {
    const {dispatch, object, handleSelectDetailedObject, mapActions, selectObjectsActions} = props ;

    const uploadFullRoadInfo = () => {
        dispatch({
            type: 'GET_FULL_ROAD_DATA',
            payload: object.id
        });
    }

    const moveMapToObject = () => {
        mapActions.setCenterAndZoom(getPointsArrayFromLinestring(object.line_path)[0]);
        selectObjectsActions.selectRoad(object);
    }

    const markAsActiveForGeometry = () => {
        dispatch({
            type: 'SELECT_ROAD_TO_WORK',
            payload: object
        })
    }

    return (
        <RoadDetailObject
            uploadFullRoadInfo={uploadFullRoadInfo}
            object={object}
            handleSelectDetailedObject={handleSelectDetailedObject}
            moveMapToObject={moveMapToObject}
            markAsActiveForGeometry={markAsActiveForGeometry}
        />
    )
};

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch =>{
    return {
        dispatch: dispatch,
        mapActions: bindActionCreators(mapActions,dispatch),
        selectObjectsActions: bindActionCreators(selectObjectsActions,dispatch)
    }
};

export  default connect(mapStateToProps, mapDispatchToProps)(RoadDetailObjectContainer)

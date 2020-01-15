import React from "react";
import {connect} from "react-redux";
import DangerRoadsPanel from "./DangerRoadsPanel";
import getPointsArrayFromLinestring from "../../../../utils/getPointsArrayFromLinestring";
import {bindActionCreators} from "redux";
import * as mapActions from "~/actions/MapActions";
import * as selectObjectsActions from "~/actions/SelectObjectsActions";
import getPointsArrayFromPoint from "../../../../utils/getPointsArrayFromPoints";

const DangerRoadsPanelContainer = ({dangerRoads, handleSelectDetailedObject,mapActions,selectObjectsActions}) => {


    const moveMapToObject = (object) => {
        let pointsStr = object['path'];
        if (!pointsStr || pointsStr[0] =='P') pointsStr = object['segment']['line_path']
        if (pointsStr) {
            if (pointsStr[0].toLowerCase() === 'p') {
                let points = getPointsArrayFromPoint(pointsStr);
                mapActions.setCenterAndZoom(points);
                selectObjectsActions.selectDangerRoad(object);

            } else if (pointsStr[0].toLowerCase() === 'l'){
                mapActions.setCenterAndZoom(getPointsArrayFromLinestring(object.path)[0]);
                selectObjectsActions.selectDangerRoad(object);
            }
        }

    }


    return (
        <DangerRoadsPanel
            dangerRoads={dangerRoads}
            handleSelectDetailedObject={handleSelectDetailedObject}
            moveMapToObject={moveMapToObject}
        />
    )
};

const mapStateToProps = state => {
    return {
        dangerRoads:state.dangers,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch,
        mapActions: bindActionCreators(mapActions,dispatch),
        selectObjectsActions: bindActionCreators(selectObjectsActions,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DangerRoadsPanelContainer);

import React from "react";
import {connect} from "react-redux";
import getPointsArrayFromLinestring from "../../../../utils/getPointsArrayFromLinestring";
import {bindActionCreators} from "redux";
import * as mapActions from "../../../../actions/MapActions";
import * as selectObjectsActions from "../../../../actions/SelectObjectsActions";
import getPointsArrayFromPoint from "../../../../utils/getPointsArrayFromPoints";
import * as objectActions from "../../../../actions/ObjectActions";
import FAPPanel from "./FAPPanel";

const FAPPanelContainer = ({obj, handleSelectDetailedObject,mapActions,selectObjectsActions,objectActions}) => {



    const moveMapToObject = (object) => {
        let pointsStr = object['point'];
        if (pointsStr) {
            if (pointsStr[0].toLowerCase() === 'p') {
                let points = getPointsArrayFromPoint(pointsStr)[0];
                mapActions.setCenterAndZoom(points);
                // selectObjectsActions.selectFAP(object);

            } else if (pointsStr[0].toLowerCase() === 'l'){
                mapActions.setCenterAndZoom(getPointsArrayFromLinestring(object.path)[0]);
                // selectObjectsActions.selectFAP(object);
            }
        }

    }

    const containerCallback = (data) => {
        objectActions.addReducerValue('fap','filtered',data)
    }


    return (
        <FAPPanel
            obj={obj}
            handleSelectDetailedObject={handleSelectDetailedObject}
            moveMapToObject={moveMapToObject}
            containerCallback={containerCallback}
        />
    )
};

const mapStateToProps = state => {
    return {
        obj:state.fap,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch,
        mapActions: bindActionCreators(mapActions,dispatch),
        selectObjectsActions: bindActionCreators(selectObjectsActions,dispatch),
        objectActions: bindActionCreators(objectActions,dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FAPPanelContainer);

import React from "react";
import {connect} from "react-redux";
import RoadControlPanel from "./RoadControlPanel";
import getPointsArrayFromLinestring from "../../utils/getPointsArrayFromLinestring";
import {bindActionCreators} from "redux";
import * as mapActions from "~/actions/MapActions";
import * as selectObjectsActions from "~/actions/SelectObjectsActions";
import * as newRoadActions from "../../actions/NewRoadActions";


const RoadControlPanelContainer = ({roads, handleSelectDetailedObject, mapActions, selectObjectsActions,newRoadActions}) => {



    const moveMapToObject = (object) => {
        mapActions.setCenterAndZoom(getPointsArrayFromLinestring(object.line_path)[0]);
        selectObjectsActions.selectRoad(object);
    }


    const handleCreateNewRoadButtonClicked = () => {
        newRoadActions.openCreateDialog();
    }

    const containerCallbacks = {
        handleCreateNewRoadButtonClicked
    }

    return (
        <RoadControlPanel
            roads={roads}
            handleSelectDetailedObject={handleSelectDetailedObject}
            moveMapToObject={moveMapToObject}
            containerCallbacks={containerCallbacks}
        />
    )
};

const mapStateToProps = state => {
    return {
        roads:state.roads,

    }
};

const mapDispatchToProps = dispatch => {
    return {
        mapActions: bindActionCreators(mapActions,dispatch),
        selectObjectsActions: bindActionCreators(selectObjectsActions,dispatch),
        newRoadActions: bindActionCreators(newRoadActions,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RoadControlPanelContainer);

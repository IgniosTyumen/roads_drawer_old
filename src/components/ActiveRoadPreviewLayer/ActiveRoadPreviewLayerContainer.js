import React, {Fragment} from "react";
import {connect} from "react-redux";
import ActiveRoadPreviewLayer from "./ActiveRoadPreviewLayer";

const ActiveRoadPreviewLayerContainer = (props) => {
    const {previewRoad, visibleList, userPreferences, roads} = props;
    let masterRoad;
    if (roads && roads.roads && roads.roads.length && previewRoad){
        masterRoad =  roads.roads.find(element=>element.id==previewRoad.id)
    }


    return (
        <Fragment>
            {(previewRoad && visibleList.indexOf("roads") < 0) && <ActiveRoadPreviewLayer
                previewRoad={previewRoad}
                userPreferences={userPreferences}
                masterRoad={masterRoad}
        />}
        </Fragment>
    )
};

const mapStateToProps = state => {
    return {
        previewRoad: state.activeRoad.previewRoad,
        roads: state.roads,
        visibleList: state.visibleFilter.invisibleList,
        userPreferences: state.userPreferences
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveRoadPreviewLayerContainer)

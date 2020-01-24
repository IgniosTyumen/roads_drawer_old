import React, {Fragment} from "react";
import {connect} from "react-redux";
import RoadsLayer from "./RoadsLayer";
import * as selectedObjectActions from "../../../../actions/SelectObjectsActions";
import {bindActionCreators} from "redux";


const RoadsLayerContainer = ({roads, visibleList,userPreferences, selectedObjectActions, drawAlgorithm,roadTypeFilter,showRestrictedRoads,userAuth,zoom}) => {
    return (
        <Fragment>
            {visibleList.indexOf("roads") < 0 && <RoadsLayer
                roads={roads}
                userPreferences={userPreferences}
                selectedObjectActions={selectedObjectActions}
                drawAlgorithm={drawAlgorithm}
                roadTypeFilter={roadTypeFilter}
                showRestrictedRoads={showRestrictedRoads}
                userAuth={userAuth}
                zoom={zoom}
            />}
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        roads: state.roads,
        visibleList: state.visibleFilter.invisibleList,
        userPreferences: state.userPreferences,
        drawAlgorithm: state.map.drawAlgorithm,
        roadTypeFilter: state.map.visibleRoads,
        showRestrictedRoads: state.map.showRestrictedRoads,
        userAuth: state.userAuth,
        zoom: state.map.zoom
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectedObjectActions: bindActionCreators(selectedObjectActions,dispatch),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RoadsLayerContainer)

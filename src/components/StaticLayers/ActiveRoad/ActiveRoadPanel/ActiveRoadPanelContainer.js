import React from "react";
import {connect} from "react-redux";
import ActiveRoadPanel from "./ActiveRoadPanel";
import * as waypointActions from '../../../../actions/WaypointActions'
import * as mapActions from '../../../../actions/MapActions'
import * as selectObjectsActions from "../../../../actions/SelectObjectsActions";
import {bindActionCreators} from "redux";

const ActiveRoadPanelContainer = props => {
    const {activeRoad, waypointActions,waypointTemplate,mapActions, userAuth,selectObjectsActions} = props;

    const handleSave = () => {
        if (waypointTemplate.templateWaypoint.id === "newCheckpoint"){
            waypointActions.saveNewWaypoint(waypointTemplate,userAuth)
        } else {
            waypointActions.saveWaypoint(waypointTemplate,userAuth)
        }
    }

    const handleCloseRoad = () => {
        waypointActions.finishWorkWithRoad()
    }

    const handleNewWaypoint = () => {
        waypointActions.createWaypoint(activeRoad.number, activeRoad.waypoints.length,userAuth);
    }

    return (
        <ActiveRoadPanel
            waypointTemplate={waypointTemplate}
            activeRoad={activeRoad}
            waypointActions={waypointActions}
            handleSave={handleSave}
            handleNewWaypoint={handleNewWaypoint}
            mapActions={mapActions}
            userAuth={userAuth}
            handleCloseRoad={handleCloseRoad}
            selectObjectsActions={selectObjectsActions}
        />
    )
};

const mapStateToProps = state => {
    return {
        activeRoad: state.activeRoad.activeRoad,
        waypointTemplate: state.waypointTemplate,
        userAuth: state.userAuth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        waypointActions: bindActionCreators(waypointActions, dispatch),
        selectObjectsActions: bindActionCreators(selectObjectsActions,dispatch),
        mapActions: bindActionCreators(mapActions,dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveRoadPanelContainer)

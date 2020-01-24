import React, {Fragment} from "react";
import {connect} from "react-redux";
import RoadControlPanel from "./RoadControlPanel";
import getPointsArrayFromLinestring from "../../../../utils/getPointsArrayFromLinestring";
import {bindActionCreators} from "redux";
import * as mapActions from "../../../../actions/MapActions";
import * as selectObjectsActions from "../../../../actions/SelectObjectsActions";
import * as newRoadActions from "../../../../actions/NewRoadActions";
import ActiveRoadPanelContainer from "../../ActiveRoad/ActiveRoadPanel/ActiveRoadPanelContainer";
import * as objectActions from "../../../../actions/ObjectActions";


const RoadControlPanelContainer = ({roads, handleSelectDetailedObject, mapActions, selectObjectsActions,newRoadActions,activeRoad, userAuth,objectActions}) => {



    const moveMapToObject = (object) => {
        if (object.line_path) {
            mapActions.setCenterAndZoom(getPointsArrayFromLinestring(object.line_path)[0]);
            selectObjectsActions.selectRoad(object);
        }


    }

    const containerCallback = (data) => {
        objectActions.addReducerValue('roads','filtered',data)
    }


    const handleCreateNewRoadButtonClicked = () => {
        newRoadActions.openCreateDialog();
    }

    const containerCallbacks = {
        handleCreateNewRoadButtonClicked
    }
    return (
        <Fragment>
            {!activeRoad && <RoadControlPanel
            roads={roads}
            handleSelectDetailedObject={handleSelectDetailedObject}
            moveMapToObject={moveMapToObject}
            containerCallback={containerCallback}
            userAuth={userAuth}
        />}
            {activeRoad &&
            <ActiveRoadPanelContainer
                userAuth={userAuth}
            />
            }
        </Fragment>
    )
};

const mapStateToProps = state => {
    return {
        roads:state.roads,
        activeRoad: state.activeRoad.activeRoad,
        userAuth: state.userAuth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        mapActions: bindActionCreators(mapActions,dispatch),
        selectObjectsActions: bindActionCreators(selectObjectsActions,dispatch),
        newRoadActions: bindActionCreators(newRoadActions,dispatch),
        objectActions: bindActionCreators(objectActions,dispatch)

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RoadControlPanelContainer);

import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import DrawPanel from "./DrawPanel";
import {roadsApi} from "../../api/api";
import * as waypointActions from '~/actions/WaypointActions'
import * as appActions from '~/actions/AppActions'
import getPointsArrayFromLinestring from "../../utils/getPointsArrayFromLinestring";
import {bindActionCreators} from "redux";

const DrawPanelContainer = ({waypointsTemplateGeometry, waypointActions, editMode, pullMode, appActions, waypointTemplate,userAuth}) => {

    const [blockPanel, setBlockPanel] = useState(false);
    const [templateHistory, setTemplateHistory] = useState([]);
    const [templateHistoryID, setTemplateHistoryID] = useState();

    const handleProjectTemplate = async () => {
        setBlockPanel(true)
        if (templateHistory.length === 0) {
        const response = await roadsApi.projectArray(waypointsTemplateGeometry.geometry.points)
        if (response.data.success) {
                setTemplateHistory(waypointsTemplateGeometry.geometry.points)
                let projectedWay = response.data.wkt;
                const newArray = getPointsArrayFromLinestring(projectedWay)
                waypointActions.changeCheckpoint(newArray);
            }
        }
        setBlockPanel(false)
}


const handleReverse = () => {
    setBlockPanel(true)
    waypointActions.swapDirection();
    setBlockPanel(false)
}

const handleSwitchEditMode = async () => {
    appActions.switchAddMarkerMode()
}
const handleSwitchPullMode = () => {
    appActions.switchPullMarkerMode()
}

const handleUndo = () => {
    waypointActions.changeCheckpoint(templateHistory);
    setTemplateHistory([]);
}

const handleClean = () => {
        if (!waypointsTemplateGeometry.geometry.points.length) {
            setTemplateHistory(waypointsTemplateGeometry.geometry.points)
        }
        waypointActions.changeCheckpoint([])
}

const handleSave = () => {
    waypointActions.saveWaypoint(waypointTemplate,userAuth)
}

    useEffect(
        ()=>{
            if (templateHistoryID){
                if (templateHistoryID != waypointTemplate.orderNumber) {
                    setTemplateHistoryID(waypointTemplate.orderNumber);
                    setTemplateHistory([])
                }
            } else
            setTemplateHistoryID(waypointTemplate.orderNumber);

        }, [waypointsTemplateGeometry, templateHistory]
    )

return (
    <DrawPanel
        waypointsTemplateGeometry={waypointsTemplateGeometry}
        handleProjectTemplate={handleProjectTemplate}
        handleReverse={handleReverse}
        handleSwitchEditMode={handleSwitchEditMode}
        handleSwitchPullMode={handleSwitchPullMode}
        handleUndo={handleUndo}
        handleSave={handleSave}
        blockPanel={blockPanel}
        editMode={editMode}
        pullMode={pullMode}
        handleClean={handleClean}
        templateHistoryIsEmpty={(templateHistory.length === 0)}
    />
)
}
const mapStateToProps = state => {
    return {
        waypointsTemplateGeometry: state.waypointTemplate.templateWaypoint,
        editMode: state.map.editMode,
        pullMode: state.map.pullMode,
        waypointTemplate: state.waypointTemplate,
        userAuth: state.userAuth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        waypointActions: bindActionCreators(waypointActions, dispatch),
        appActions: bindActionCreators(appActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawPanelContainer)

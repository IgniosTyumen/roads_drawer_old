import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import DrawPanel from "./DrawPanel";
import {roadsApi} from "../../../api/api";
import * as waypointActions from '~/actions/WaypointActions'
import * as appActions from '~/actions/AppActions'
import getPointsArrayFromLinestring from "../../../utils/getPointsArrayFromLinestring";
import {bindActionCreators} from "redux";
import {cleanCoords, simplify} from "@turf/turf";
import {lineString} from "@turf/helpers";

const DrawPanelContainer =
    ({
         waypointsTemplateGeometry,
         waypointActions,
         editMode,
         pullMode,
         appActions,
         waypointTemplate,
         userAuth,
         visibleOfEditMarkers,
         visibleOfRestrictedRoads,

         tile})  => {

    const [blockPanel, setBlockPanel] = useState(false);
    const [templateHistory, setTemplateHistory] = useState([]);
    const [templateHistoryID, setTemplateHistoryID] = useState();

//     const handleProjectTemplate = async () => {
//         setBlockPanel(true)
//         if (templateHistory.length === 0) {
//         const response = await roadsApi.projectArray(waypointsTemplateGeometry.geometry.points)
//         if (response.data.success) {
//                 setTemplateHistory(waypointsTemplateGeometry.geometry.points)
//                 let projectedWay = response.data.wkt;
//                 const newArray = getPointsArrayFromLinestring(projectedWay)
//                 waypointActions.changeCheckpoint(newArray);
//             }
//         }
//         setBlockPanel(false)
// }

    const handleProjectTemplate = async () => {
        setBlockPanel(true)
        const response = await roadsApi.projectArray(waypointsTemplateGeometry.geometry.points)
        if (response.data.success) {
            templateHistory.push(waypointsTemplateGeometry.geometry.points);
            let projectedWay = response.data.wkt;
            const points = getPointsArrayFromLinestring(projectedWay);
            let projectedLinestring = lineString(points);
            projectedLinestring = cleanCoords(projectedLinestring);
            // const simplifySettings = {tolerance: 0.01, highQuality: true };
            // while (projectedLinestring.geometry.coordinates.length>75){
            //     projectedLinestring = simplify(projectedLinestring,simplifySettings);
            // }
            waypointActions.changeCheckpoint(projectedLinestring.geometry.coordinates);
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

    const handleToggleMarkers = () => {
        waypointActions.toggleEditMarkersShow()
    }

    const handleToggleRestrictedRoads = () => {
        waypointActions.toggleRestrictedRoadsShow()
    }

    const handleSimplify = () => {
        let coef = 1;
        const points = waypointsTemplateGeometry.geometry.points;
        let projectedLinestring = lineString(points);
        projectedLinestring = cleanCoords(projectedLinestring);
        const simplifySettings = {tolerance: 0.001*coef, highQuality: true };
        while (true){
            const simplifySettings = {tolerance: 0.001*coef, highQuality: true };
            projectedLinestring = simplify(projectedLinestring,simplifySettings);
            if (projectedLinestring.geometry.coordinates.length<points.length || points.length<=2) {
                break
            } else {
                coef++
            }
        }

        waypointActions.changeCheckpoint(projectedLinestring.geometry.coordinates);
        templateHistory.push(waypointsTemplateGeometry)
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
        tile={tile}
        templateHistoryIsEmpty={(templateHistory.length === 0)}
        visibleOfEditMarkers={visibleOfEditMarkers}
        handleSimplify={handleSimplify}
        handleToggleRestrictedRoads={handleToggleRestrictedRoads}
        visibleOfRestrictedRoads={visibleOfRestrictedRoads}
        handleToggleMarkers={handleToggleMarkers}
    />
)
}
const mapStateToProps = state => {
    return {
        waypointsTemplateGeometry: state.waypointTemplate.templateWaypoint,
        editMode: state.map.editMode,
        pullMode: state.map.pullMode,
        visibleOfEditMarkers : state.map.showEditMarkers,
        visibleOfRestrictedRoads: state.map.showRestrictedRoads,
        waypointTemplate: state.waypointTemplate,
        userAuth: state.userAuth,
        tile: state.map.tile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        waypointActions: bindActionCreators(waypointActions, dispatch),
        appActions: bindActionCreators(appActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawPanelContainer)

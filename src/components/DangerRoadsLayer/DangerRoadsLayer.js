import React, {Fragment} from "react";
import {CircleMarker, Polyline} from "react-leaflet";
import getPointsArrayFromLinestring from "../../utils/getPointsArrayFromLinestring";
import getPointsArrayFromPoint from "../../utils/getPointsArrayFromPoints";
import DangerRoadPopup from "../DangerRoadPopup/DangerRoadPopup";

const DangerRoadsLayer = (props) => {
    const {dangerRoads, userPreferences} = props;
    let Elements;
    if (dangerRoads && dangerRoads.dangers) {
        Elements = dangerRoads.dangers.map((road,position) => {
            let pointsStr = road['path'];
            if (!pointsStr || pointsStr[0] =='P')
                pointsStr = road['segment'] ? road['segment']['line_path'] : null
            if (pointsStr) {
                if (pointsStr[0].toLowerCase() === 'p') {
                    let points = getPointsArrayFromPoint(pointsStr);
                    return <CircleMarker center={points} radius={5} color={'#aa00cc'}>

                    </CircleMarker>
                } else {
                    let points = getPointsArrayFromLinestring(pointsStr);

                    return (
                        <Fragment>
                            <Polyline positions={points} key={'danger' + position}
                                      color={userPreferences.dangerRoadsColor1}
                                      weight={userPreferences.dangerRoadsWidth}
                                      onContextMenu={(event) => {
                                      }}>
                                <DangerRoadPopup road={road}/>
                            </Polyline>
                            <Polyline positions={points} key={'dangerdash' + position}
                                      dashArray={[`${userPreferences.dangerRoadsStrokeLength}`, `${userPreferences.dangerRoadsStrokeLength}`]}
                                      dashOffset={`${userPreferences.dangerRoadsStrokeLength}`}
                                      color={userPreferences.dangerRoadsColor2}
                                      weight={userPreferences.dangerRoadsWidth}
                                      onContextMenu={(event) => {
                                      }}>
                                <DangerRoadPopup road={road}/>
                            </Polyline>
                        </Fragment>
                    )
                }
            }
        });
    }
    return (
        <Fragment>
            {Elements}
        </Fragment>
    )
};

export default DangerRoadsLayer;

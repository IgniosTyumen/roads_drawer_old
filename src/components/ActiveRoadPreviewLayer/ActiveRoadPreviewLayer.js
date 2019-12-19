import React, {Fragment} from "react";
import {CircleMarker, Polyline} from "react-leaflet";
import getPointsArrayFromLinestring from "../../utils/getPointsArrayFromLinestring";

const ActiveRoadPreviewLayer = (props) => {
    const {previewRoad,userPreferences, masterRoad,} = props;
    let WaysList = [];
    if (previewRoad.segments_set) {
        for (let it = 0; it < previewRoad.segments_set.length; it++) {
            let color;
            switch (masterRoad.importance) {
                case "Автомобильная дорога федерального значения": {
                    color=userPreferences.colorRoadFederal
                    break;
                }
                case "Автомобильная дорога регионального или межмуниципального значения": {
                    color=userPreferences.colorRoadRegional
                    break;
                }
                case "Автомобильная дорога местного значения": {
                    color=userPreferences.colorRoadMunicipal
                    break;
                }
                default: {
                    color='#aaaaaa'
                }
            }
            if (previewRoad.segments_set[it].line_path) {
                let points=[];
                if (previewRoad.segments_set[it].geometry) {
                    points = previewRoad.segments_set[it].geometry.points
                } else {
                    points = getPointsArrayFromLinestring(previewRoad.segments_set[it].line_path);
                }
                WaysList.push(
                    <Fragment>
                        {userPreferences.endpointRouteVisible &&
                        <Fragment>
                            <CircleMarker center={points[0]} radius={userPreferences.endpointRouteWidth} color={userPreferences.segmentColor}
                                          onContextMenu={(event) => {
                                          }}/>
                            <CircleMarker center={points[points.length - 1]} radius={userPreferences.endpointRouteWidth}
                                          color={color}
                                          onContextMenu={(event) => {
                                          }}/>
                        </Fragment>}
                        <Polyline color={userPreferences.segmentColor} positions={points} weight={userPreferences.segmentWidth}
                                  onContextMenu={(event) => {
                                  }}/>
                    </Fragment>
                )
            }
        }
    }
    return (
        <Fragment>
            {WaysList}
        </Fragment>
    )
};

export default ActiveRoadPreviewLayer;

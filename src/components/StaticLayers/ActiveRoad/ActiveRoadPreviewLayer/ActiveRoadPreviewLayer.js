import React, {Fragment} from "react";
import {CircleMarker, Polyline} from "react-leaflet";
import getPointsArrayFromLinestring from "../../../../utils/getPointsArrayFromLinestring";
import styleProvider from "../../../CommonComponents/StyleProvider/styleProvider";

const ActiveRoadPreviewLayer = (props) => {
    const {previewRoad,userPreferences, masterRoad,} = props;
    let WaysList = [];
    if (previewRoad.segments_set) {
        for (let it = 0; it < previewRoad.segments_set.length; it++) {
            let color;
            switch (masterRoad.importance) {
                case "Автомобильная дорога федерального значения": {
                    color=styleProvider(userPreferences,'roads','colorRoadFederal');
                    break;
                }
                case "Автомобильная дорога регионального или межмуниципального значения": {
                    color=styleProvider(userPreferences,'roads','colorRoadRegional');
                    break;
                }
                case "Автомобильная дорога местного значения": {
                    color=styleProvider(userPreferences,'roads','colorRoadMunicipal');
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
                        {styleProvider(userPreferences,'roads','endpointsVisible', true) &&
                        <Fragment>
                            <CircleMarker center={points[0]}
                                          radius={styleProvider(userPreferences,'roads','endpointsWidth')}
                                          color={color}
                                          onContextMenu={(event) => {
                                          }}/>
                            <CircleMarker center={points[points.length - 1]}
                                          radius={styleProvider(userPreferences,'roads','endpointsWidth')}
                                          color={color}
                                          onContextMenu={(event) => {
                                          }}/>
                        </Fragment>}
                        <Polyline color={styleProvider(userPreferences,'roads','segmentsColor')}
                                  positions={points}
                                  weight={styleProvider(userPreferences,'roads','segmentsLineWidth')}
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

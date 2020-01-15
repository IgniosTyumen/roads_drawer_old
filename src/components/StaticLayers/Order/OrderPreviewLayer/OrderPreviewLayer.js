import React, {Fragment} from "react";
import {CircleMarker, Polyline} from "react-leaflet";
import styleProvider from "../../../CommonComponents/StyleProvider/styleProvider";

const OrderPreviewLayer = (props) => {
    const {previewOrder,userPreferences} = props;
    let WaysList = [];
    if (previewOrder.waypoints) {
        const opacity = styleProvider(userPreferences,'opacity', 'draw','1');
        for (let it = 0; it < previewOrder.waypoints.length; it++) {
            let color;
            switch (previewOrder.waypoints[it].importance) {
                case "Автомобильная дорога федерального значения": {
                    color=styleProvider(userPreferences,'roads','colorRoadFederal')
                    break;
                }
                case "Автомобильная дорога регионального или межмуниципального значения": {
                    color=styleProvider(userPreferences,'roads','colorRoadRegional');
                    break;
                }
                case "Автомобильная дорога местного значения": {
                    color=styleProvider(userPreferences,'roads','colorRoadMunicipal')
                    break;
                }
            }
            if (previewOrder.waypoints[it].path) {
                const points = previewOrder.waypoints[it].geometry.points
                WaysList.push(
                    <Fragment>
                        {userPreferences.endpointRouteVisible &&
                        <Fragment>
                            <CircleMarker center={points[0]} radius={userPreferences.endpointRouteWidth} color={color}
                                          opacity={opacity}
                                          onContextMenu={(event) => {
                                          }}/>
                            <CircleMarker center={points[points.length - 1]} radius={userPreferences.endpointRouteWidth}
                                          opacity={opacity}
                                          color={color}
                                          onContextMenu={(event) => {
                                          }}/>
                        </Fragment>}
                        <Polyline color={color}
                                  positions={points}
                                  opacity={opacity}
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

export default OrderPreviewLayer;

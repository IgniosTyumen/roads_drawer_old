import React, {Fragment} from "react";
import {CircleMarker, Polyline} from "react-leaflet";
import invertColor from "../../../utils/invertColor";
import getPointsArrayFromLinestring from "../../../utils/getPointsArrayFromLinestring";
import styleProvider from "../../CommonComponents/StyleProvider/styleProvider";
import getPointsArrayFromPoint from "../../../utils/getPointsArrayFromPoints";

const SelectedObject = props => {
    const {road, bridge,dangerRoad, city, airfield, userPreferences, segment} = props;
    let DrawableElement = null;

    if (road) {
        let geometry =[];
        if (road.line_path) {
            geometry = getPointsArrayFromLinestring(road.line_path);
            DrawableElement =
                <Polyline positions={geometry}
                          key={road.id}
                          color={invertColor(styleProvider(userPreferences,'roads','roadColor'))}
                          weight={styleProvider(userPreferences,'roads','roadLineWidth')*2}>
                    {/*<RoadPopupContainer road={road}/>*/}
                </Polyline>
        }
    } else
    if (segment) {
        let geometry =[];
        if (segment.line_path) {
            geometry = getPointsArrayFromLinestring(segment.line_path);
            DrawableElement =
                <Polyline positions={geometry} key={'segment-selected'+segment.id}
                          color={styleProvider(userPreferences,'roads','segmentsColor')}
                          weight={styleProvider(userPreferences,'roads','segmentsLineWidth')*2}>
                    {/*<RoadPopupContainer road={road}/>*/}
                </Polyline>
        }
    } else
    if (dangerRoad) {
        let geometry =[];
        if (dangerRoad.path){
            geometry = getPointsArrayFromLinestring(dangerRoad.path);
        } else {
            geometry = getPointsArrayFromLinestring(dangerRoad.segments.line_path);
        }

        if (geometry) {
            DrawableElement =
                <Fragment>
                    <Polyline positions={geometry} color={invertColor(styleProvider(userPreferences,'dangerRoads','colorPrimary'))}
                              weight={styleProvider(userPreferences,'dangerRoads','strokeWidth')*2}
                              onContextMenu={(event) => {
                              }}>

                    </Polyline>
                    <Polyline positions={geometry}
                              dashArray={[`${styleProvider(userPreferences,'dangerRoads','strokeLength')}`,`${styleProvider(userPreferences,'dangerRoads','strokeLength')}`]}
                              dashOffset={`${styleProvider(userPreferences,'dangerRoads','strokeLength')}`}
                              color={invertColor(styleProvider(userPreferences,'dangerRoads','colorSecondary'))}
                              weight={styleProvider(userPreferences,'dangerRoads','strokeWidth')*2}
                              onContextMenu={(event) => {
                              }}>

                    </Polyline>
                </Fragment>
        }
    } else  if (city) {
        const geometry = getPointsArrayFromPoint(city.point)[0]
        DrawableElement =   <CircleMarker center={geometry} radius={20} />
    }

    if (DrawableElement){
        return (
            <Fragment>
                {DrawableElement}
            </Fragment>
        )
    } else {
        return <Fragment>
            <CircleMarker center={[0,0]}/>
        </Fragment>
    }

};

export default SelectedObject;

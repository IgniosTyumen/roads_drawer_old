import React, {Fragment} from "react";
import {CircleMarker, Polyline} from "react-leaflet";
import getPointsArrayFromLinestring from "../../../../utils/getPointsArrayFromLinestring";
import getPointsArrayFromPoint from "../../../../utils/getPointsArrayFromPoints";
import DangerRoadPopup from "../DangerRoadPopup/DangerRoadPopup";
import styleProvider from "../../../CommonComponents/StyleProvider/styleProvider";

const DangerRoadsLayer = (props) => {
    const {dangerRoads, userPreferences} = props;
    let Elements;
    if (dangerRoads && dangerRoads.dangers) {
        const opacity = styleProvider(userPreferences, 'opacity', 'dangerRoads', '1');
        Elements = dangerRoads.dangers.map((road, position) => {
            let pointsStr = road['path'];
            if (!pointsStr || pointsStr[0] == 'P')
                pointsStr = road['segment'] ? road['segment']['line_path'] : null
            if (pointsStr) {
                if (pointsStr[0].toLowerCase() === 'p') {
                    let points = getPointsArrayFromPoint(pointsStr);
                    return <CircleMarker
                        center={points}
                        radius={5}
                        opacity={opacity}
                        color={styleProvider(userPreferences, 'dangerRoads', 'colorPrimary')}>

                    </CircleMarker>
                } else {
                    let points = getPointsArrayFromLinestring(pointsStr);

                    return (
                        <Fragment>
                            <Polyline positions={points} key={'danger' + position}
                                      color={styleProvider(userPreferences, 'dangerRoads', 'colorPrimary')}
                                      weight={styleProvider(userPreferences, 'dangerRoads', 'strokeWidth')}
                                      opacity={opacity}
                                      onContextMenu={(event) => {
                                      }}>
                                <DangerRoadPopup road={road}/>
                            </Polyline>
                            <Polyline positions={points} key={'dangerdash' + position}
                                      dashArray={[`${styleProvider(userPreferences, 'dangerRoads', 'strokeLength')}`, `${styleProvider(userPreferences, 'dangerRoads', 'strokeLength')}`]}
                                      dashOffset={`${styleProvider(userPreferences, 'dangerRoads', 'strokeLength')}`}
                                      color={styleProvider(userPreferences, 'dangerRoads', 'colorSecondary')}
                                      weight={styleProvider(userPreferences, 'dangerRoads', 'strokeWidth')}
                                      opacity={opacity}
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

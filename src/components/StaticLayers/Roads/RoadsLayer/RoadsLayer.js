import React, {Fragment} from "react";
import {CircleMarker, Polyline} from "react-leaflet";
import RoadPopupContainer from "../RoadPopup/RoadPopupContainer";
import getPointsArrayFromLinestring from "../../../../utils/getPointsArrayFromLinestring";
import styleProvider from "../../../CommonComponents/StyleProvider/styleProvider";
import {calculatePermission} from "../../../../utils/calculatePermission";


const colorSwitcher = (road, userPreferences) => {
    let result = '#a1fdc1';
    if (road) {
        switch (road.importance) {
            case 'FEDERAL': {
                result = styleProvider(userPreferences, 'roads', 'colorRoadFederal');
                break;
            }
            case 'REGIONAL': {
                result = styleProvider(userPreferences, 'roads', 'colorRoadRegional');
                break;
            }
            case 'MUNICIPAL': {
                result = styleProvider(userPreferences, 'roads', 'colorRoadMunicipal');
                break;
            }
            default: {
                result = '#d6ff67';
            }
        }
    }
    return result;
}

const widthSwitcher = (road, userPreferences) => {
    let result = 2;
    if (road) {
        switch (road.importance) {
            case 'FEDERAL': {
                result = styleProvider(userPreferences, 'roads', 'widthRoadFederal');
                break;
            }
            case 'REGIONAL': {
                result = styleProvider(userPreferences, 'roads', 'widthRoadRegional');
                break;
            }
            case 'MUNICIPAL': {
                result = styleProvider(userPreferences, 'roads', 'widthRoadMunicipal');
                break;
            }
            default: {
                result = 2;
            }
        }
    }
    return result;
}


const RoadsLayer = (props) => {


    const {roads, userPreferences, selectedObjectActions, drawAlgorithm, roadTypeFilter, showRestrictedRoads, userAuth,zoom} = props;
    let Elements;

    let iteratedList = roads.roads
    if (roads.filtered && iteratedList) {
        debugger
        let newList = [];
        for (let it = 0; it < roads.filtered.length; it++) {
            const cityToList = iteratedList.find(el => el.id === roads.filtered[it].id);
            newList.push(cityToList)
        }
        iteratedList = newList;
    }

    if (iteratedList) {
        const opacity = styleProvider(userPreferences, 'opacity', 'roads');
        Elements = iteratedList.map(road => {
                if (roadTypeFilter.length && (!road.importance && roadTypeFilter.includes('unknown')) || (road.importance && road.importance.toLowerCase && roadTypeFilter.includes(road.importance.toLowerCase()))) {
                    if (!showRestrictedRoads && !(calculatePermission(road, userAuth))) {
                        return null
                    }
                    const color = colorSwitcher(road, userPreferences);
                    const width = widthSwitcher(road, userPreferences);
                    if (road.segments_set && road.segments_set.length && road.segments_set[0].line_path) {
                        let SegmentGroup = [];
                        let start;
                        let end;

                        for (let it = 0; it < road.segments_set.length; it++) {
                            let pointsStrSegment = road.segments_set[it].line_path;
                            if (pointsStrSegment && pointsStrSegment[0] == 'L') {
                                let points = getPointsArrayFromLinestring(pointsStrSegment);
                                if (!start) {
                                    start = points[0];
                                    end = points[points.length - 1]
                                } else {
                                    end = points[points.length - 1]
                                }
                                //TODO realize
                                // let pointsToSimple = lineString(points);
                                // let tolerance = 0;
                                // if (zoom>=5 && zoom<8) tolerance = 0.0007;
                                // if (zoom>=8&& zoom<10) tolerance = 0.0003;
                                // if (zoom>=10&& zoom<13) tolerance = 0.0001;
                                // if (zoom>=13) tolerance = 0;
                                // const options = {tolerance: tolerance, highQuality: false}
                                // pointsToSimple = simplify(pointsToSimple,options)
                                // SegmentGroup.push(<Polyline positions={pointsToSimple.geometry.coordinates}
                                SegmentGroup.push(<Polyline positions={points}
                                                            key={'road' + road.id + 'segment' + road.segments_set[it].id}
                                                            color={color}
                                                            weight={width}
                                                            onClick={() => selectedObjectActions.selectRoad(road)}
                                                            opacity={opacity}
                                                            onContextMenu={(event) => {
                                                            }}
                                >
                                    <RoadPopupContainer road={road}/>
                                </Polyline>)
                            }
                        }

                        if (SegmentGroup.length) return (
                            <Fragment>
                                <Fragment>
                                    {SegmentGroup}
                                    <CircleMarker center={start}
                                                  radius={styleProvider(userPreferences, 'roads', 'endpointsWidth', 2)}
                                                  color={color}
                                                  opacity={opacity}
                                                  key={'roadCM' + road.id}
                                                  onContextMenu={(event) => {
                                                  }}/>
                                    < CircleMarker center={end}
                                                   key={'roadCMEnd' + road.id}
                                                   radius={styleProvider(userPreferences, 'roads', 'endpointsWidth', 2)}
                                                   color={color}
                                                   opacity={opacity}
                                                   onContextMenu={(event) => {
                                                   }}/>
                                </Fragment>
                            </Fragment>
                        )

                    } else if (drawAlgorithm !== 'segmentsOnly') {

                        let pointsStr = road['line_path'];
                        if (pointsStr) {
                            const pointsStrArr = pointsStr.replace('LINESTRING (', '').replace(')', '').split(',');
                            let points = [];
                            for (let it = 0; it < pointsStrArr.length; it++) {
                                const pointStr = pointsStrArr[it].trim().split(' ');
                                const point1 = Number.parseFloat(pointStr[1]).toFixed(6);
                                const point2 = Number.parseFloat(pointStr[0]).toFixed(6);
                                points.push([point1, point2]);
                            }
                            return (
                                <Fragment>
                                    <Polyline positions={points} key={road.id}
                                              color={color}
                                              weight={width}
                                              onClick={() => selectedObjectActions.selectRoad(road)}
                                              opacity={opacity}
                                              onContextMenu={(event) => {
                                              }}
                                    >
                                        <RoadPopupContainer road={road}/>
                                    </Polyline>
                                    {styleProvider(userPreferences, 'roads', 'endpointsVisible', true) &&
                                    <Fragment>
                                        <CircleMarker center={points[0]}
                                                      radius={styleProvider(userPreferences, 'roads', 'endpointsWidth', 2)}
                                                      color={color}
                                                      opacity={opacity}
                                                      onContextMenu={(event) => {
                                                      }}/>
                                        < CircleMarker center={points[points.length - 1]}
                                                       radius={styleProvider(userPreferences, 'roads', 'endpointsWidth', 2)}
                                                       color={color}
                                                       opacity={opacity}
                                                       onContextMenu={(event) => {
                                                       }}/>
                                    </Fragment>
                                    }
                                </Fragment>
                            )
                        }
                    }
                } else return null
            }
        );
    }
    return (
        <Fragment>
            {Elements}
        </Fragment>
    )
};

export default RoadsLayer;

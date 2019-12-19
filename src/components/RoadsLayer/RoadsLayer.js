import React, {Fragment} from "react";
import {CircleMarker, Polyline} from "react-leaflet";
import RoadPopupContainer from "../RoadPopup/RoadPopupContainer";
import getPointsArrayFromLinestring from "../../utils/getPointsArrayFromLinestring";

const RoadsLayer = (props) => {


    const {roads, userPreferences, selectedObjectActions, drawAlgorithm, roadTypeFilter} = props;
    let Elements;
    if (roads.roads) {
        Elements = roads.roads.map(road => {
                debugger
                if (roadTypeFilter.length && (!road.importance && roadTypeFilter.includes('unknown')) || (road.importance && road.importance.toLowerCase && roadTypeFilter.includes(road.importance.toLowerCase()))) {
                    if (road.segments_set && road.segments_set.length && road.segments_set[0].line_path) {


                        let SegmentGroup = [];
                        let start;
                        let end;
                        for (let it = 0; it < road.segments_set.length; it++) {
                            let pointsStrSegment = road.segments_set[it].line_path;
                            if (pointsStrSegment && pointsStrSegment[0] == 'L') {
                                let points = getPointsArrayFromLinestring(pointsStrSegment)
                                if (!start) {
                                    start = points[0];
                                    end = points[points.length - 1]
                                } else {
                                    end = points[points.length - 1]
                                }
                                SegmentGroup.push(<Polyline positions={points}
                                                            key={'road' + road.id + 'segment' + road.segments_set[it].id}
                                                            color={userPreferences.roadColor}
                                                            weight={userPreferences.roadWidth}
                                                            onClick={() => selectedObjectActions.selectRoad(road)}
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
                                    <CircleMarker center={start} radius={userPreferences.roadEndpointsWidth}
                                                  color={userPreferences.roadColor}
                                                  onContextMenu={(event) => {
                                                  }}/>
                                    < CircleMarker center={end}
                                                   radius={userPreferences.roadEndpointsWidth}
                                                   color={userPreferences.roadColor}
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
                                    <Polyline positions={points} key={road.id} color={userPreferences.roadColor}
                                              weight={userPreferences.roadWidth}
                                              onClick={() => selectedObjectActions.selectRoad(road)}
                                              onContextMenu={(event) => {
                                              }}
                                    >
                                        <RoadPopupContainer road={road}/>
                                    </Polyline>
                                    {userPreferences.roadEndpointsVisible &&
                                    <Fragment>
                                        <CircleMarker center={points[0]} radius={userPreferences.roadEndpointsWidth}
                                                      color={userPreferences.roadColor}
                                                      onContextMenu={(event) => {
                                                      }}/>
                                        < CircleMarker center={points[points.length - 1]}
                                                       radius={userPreferences.roadEndpointsWidth}
                                                       color={userPreferences.roadColor}
                                                       onContextMenu={(event) => {
                                                       }}/>
                                    </Fragment>
                                    }
                                </Fragment>
                            )
                        }
                    }
                }
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

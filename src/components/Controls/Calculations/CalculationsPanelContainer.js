import React, {Fragment, useState} from "react";
import {connect} from "react-redux";
import CalculationsPanel from "./CalculationsPanel";
import * as waypointActions from '../../../actions/WaypointActions'
import * as appActions from '../../../actions/AppActions'
import * as objectActions from '../../../actions/ObjectActions'
import getPointsArrayFromLinestring from "../../../utils/getPointsArrayFromLinestring";
import {bindActionCreators} from "redux";
import {length, nearestPointOnLine} from "@turf/turf";
import {lineString, point} from "@turf/helpers";
import {Button, InputNumber, Modal} from 'antd';
import getPointsArrayFromPoint from "../../../utils/getPointsArrayFromPoints";
import {calculateLengthOfPolyline} from "../../../utils/calculateLengthOfPolyline";


const checkIfAirfieldNear = (city, airfieldList, radius) => {
    if (city.point ) {
        const cityPoint = point(getPointsArrayFromPoint(city.point));
        for (let it = 0; it < airfieldList.length; it++) {
            if (airfieldList[it].point) {
                try {
                    const airfieldPoint = point(getPointsArrayFromPoint(airfieldList[it].point));
                    const line = lineString([cityPoint.geometry.coordinates, airfieldPoint.geometry.coordinates]);
                    const lengthToClosest = calculateLengthOfPolyline(line.geometry.coordinates);
                    if (lengthToClosest <= radius) {
                        return true
                    }
                } catch (e) {
                    console.log('error on field:'+airfieldList[it])
                }
            }
        }
    }
    return false
}

const findClosestAirfield = (city, airfieldList) => {
    let minLength = undefined;
    let minObj = undefined;
    let minPoint = undefined;
    if (city.point ) {
        const cityPoint = point(getPointsArrayFromPoint(city.point));
        for (let it = 0; it < airfieldList.length; it++) {
            if (airfieldList[it].point) {
                try {
                    const airfieldPoint = point(getPointsArrayFromPoint(airfieldList[it].point));
                    const line = lineString([cityPoint.geometry.coordinates, airfieldPoint.geometry.coordinates]);
                    const lengthToClosest = calculateLengthOfPolyline(line.geometry.coordinates);
                    if (lengthToClosest <= minLength || !minLength) {
                        minLength = lengthToClosest;
                        minObj = airfieldList[it];
                        minPoint = airfieldPoint;
                    }
                } catch (e) {
                    console.log('error on field:'+airfieldList[it])
                }
            }
        }
    }
    return {minObj,minLength,minPoint}
}

const checkIfRoadNear = (city, roadList, radius) => {
    if (city.point && city.is_faraway) {
        const cityPoint = point(getPointsArrayFromPoint(city.point));
        for (let it = 0; it < roadList.length; it++) {
            if (roadList[it].segments_set && roadList[it].segments_set.length) {

                try {
                    for (let segmentIterator = 0; segmentIterator < roadList[it].segments_set.length; segmentIterator++) {
                        const segment = roadList[it].segments_set[segmentIterator];
                        if (segment.line_path) {
                            const roadLinestring = lineString(getPointsArrayFromLinestring(segment.line_path))
                            const roadPoint = nearestPointOnLine(roadLinestring, cityPoint.geometry.coordinates[0]);
                            const lengthToClosest = length(lineString([[roadPoint.geometry.coordinates[1],roadPoint.geometry.coordinates[0]],[cityPoint.geometry.coordinates[0][1],cityPoint.geometry.coordinates[0][0]]]));
                            if (lengthToClosest <= radius) {
                                return true
                            }
                        }
                    }
                } catch (e) {
                    console.log(e)
                    console.log('error on field:'+roadList[it])
                }
            }
        }
    } else  if(city.point && !city.is_faraway) {
        return true
    } else
    return false
}

const findClosestRoad = (city, roadList) => {
    let minLength = undefined;
    let minPoint = undefined;
    let minObj = undefined;
    if (city.point) {
        const cityPoint = point(getPointsArrayFromPoint(city.point));
        for (let it = 0; it < roadList.length; it++) {
            if (roadList[it].segments_set && roadList[it].segments_set.length) {
                try {
                    for (let segmentIterator = 0; segmentIterator < roadList[it].segments_set.length; segmentIterator++) {
                        const segment = roadList[it].segments_set[segmentIterator];
                        if (segment.line_path) {
                            const roadLinestring = lineString(getPointsArrayFromLinestring(segment.line_path))
                            const roadPoint = nearestPointOnLine(roadLinestring, cityPoint.geometry.coordinates[0]);
                            const lengthToClosest = length(lineString([[roadPoint.geometry.coordinates[1],roadPoint.geometry.coordinates[0]],[cityPoint.geometry.coordinates[0][1],cityPoint.geometry.coordinates[0][0]]]));
                            if (lengthToClosest <= minLength || !minLength) {
                                minLength = lengthToClosest;
                                minPoint = roadPoint;
                                minObj = roadList[it];
                            }
                        }
                    }
                } catch (e) {
                    console.log(e)
                    console.log('error on field:'+roadList[it])
                }
            }
        }
    }
    return {minObj,minLength,minPoint}
}

const CalculationsPanelContainer =
    ({
         objectActions,
         appActions,
         tile,
         roads,
         cities,
         airfields,
         ambulance,
         selectedCity
     }) => {

        const [blockPanel, setBlockPanel] = useState(false);
        const [templateHistory, setTemplateHistory] = useState([]);
        const [templateHistoryID, setTemplateHistoryID] = useState();
        const [visibleOfRadiusModal, setVisibleOfRadiusModal] = useState(false)
        const [radiusForRoads, setRadiusForRoads] = useState(3)
        const [radiusForAirfields, setRadiusForAirfields] = useState(50)
        const [radiusForAmbulance, setRadiusForAmbulance] = useState(20)


        const handleCalculateRoadsAccessibilityStart = () => {
            setBlockPanel(true)
            setVisibleOfRadiusModal(true)

        }

        const handleCalculateRoadsAccessibility = () => {
            setTimeout(()=> {
                setVisibleOfRadiusModal(false)
                let newCitiesArray = [];
                for (let it = 0; it < cities.cities.length; it++) {
                    const isAirfieldNear = checkIfAirfieldNear(cities.cities[it], airfields.airfields, radiusForAirfields);
                    const isRoadNear = checkIfRoadNear(cities.cities[it], roads.roads, radiusForRoads);
                    const isAmbulanceNear = checkIfAirfieldNear(cities.cities[it], ambulance.ambulance, radiusForAirfields);
                    const cityInstance = {...cities.cities[it]};
                    newCitiesArray.push(
                        {
                            ...cityInstance,
                            hasAccessToAirfields: isAirfieldNear,
                            hasAccessToRoads: isRoadNear,
                            hasAccessAmbulance: isAmbulanceNear,

                        }
                    );
                }
                objectActions.updateCities(newCitiesArray, radiusForRoads, radiusForAirfields);
            },1);
        }

        const handleCalculateCityClosestStart = () => {
            const closestAirfield = findClosestAirfield(selectedCity,airfields.airfields);
            const closestRoad = findClosestRoad(selectedCity,roads.roads);
            const closestAmbulance = findClosestAirfield(selectedCity,ambulance.ambulance);
            const closest = {
                closestAirfield,closestRoad,closestAmbulance
            }
            objectActions.updateFieldInCity(selectedCity.id,'closest',closest)
            objectActions.saveUpdatesInCities();
        }

        return (
            <Fragment>
                <CalculationsPanel
                    blockPanel={blockPanel}
                    tile={tile}
                    handleCalculateRoadsAccessibilityStart={handleCalculateRoadsAccessibilityStart}
                    handleCalculateCityClosestStart={handleCalculateCityClosestStart}
                    selectedCity={selectedCity}
                    cities={cities}
                />
                <Modal
                    visible={visibleOfRadiusModal}
                    title="Введите радиус поиска объектов"
                    onOk={handleCalculateRoadsAccessibility}
                    onCancel={() => setVisibleOfRadiusModal(false)}
                    footer={[
                        <Button key="back" onClick={() => setVisibleOfRadiusModal(false)}>
                            Отменить
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleCalculateRoadsAccessibility}>
                            Применить
                        </Button>,
                    ]}
                >
                    <p>Радиус поиска для дорог</p>
                    <InputNumber
                        defaultValue={radiusForRoads}
                        min={0}
                        formatter={value => `${value}км`}
                        parser={value => value.replace('км', '')}
                        onChange={setRadiusForRoads}
                    />
                    <p>Радиус поиска для аэроплощадок</p>
                    <InputNumber
                        defaultValue={radiusForAirfields}
                        min={0}
                        formatter={value => `${value}км`}
                        parser={value => value.replace('км', '')}
                        onChange={setRadiusForAirfields}
                    />
                    <p>Радиус поиска пунктов базирования скорой помощи</p>
                    <InputNumber
                        defaultValue={radiusForAmbulance}
                        min={0}
                        formatter={value => `${value}км`}
                        parser={value => value.replace('км', '')}
                        onChange={setRadiusForAmbulance}
                    />
                </Modal>
            </Fragment>
        )
    }
const mapStateToProps = state => {
    return {
        tile: state.map.tile,
        cities: state.cities,
        airfields: state.airfields,
        ambulance: state.ambulance,
        roads: state.roads,
        selectedCity : state.selectedObject.selectedCity
    }
}

const mapDispatchToProps = dispatch => {
    return {
        waypointActions: bindActionCreators(waypointActions, dispatch),
        appActions: bindActionCreators(appActions, dispatch),
        objectActions: bindActionCreators(objectActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculationsPanelContainer)

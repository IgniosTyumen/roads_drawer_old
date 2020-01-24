import React, {Fragment} from "react";
import {Marker, Polyline} from "react-leaflet";
import CityPopupContainer from "../CityPopup/CityPopupContainer";
import getPointsArrayFromPoint from "../../../../utils/getPointsArrayFromPoints";
import {pure} from "recompose";

const farawayColorInitial = (roadBool, airfieldBool, farawayBool) => {
    if (roadBool === undefined || airfieldBool === undefined || farawayBool === undefined) return '#9e9c9c'
    if (farawayBool === false) return '#9e9c9c'
    if (roadBool && airfieldBool) return '#ff3eec';
    if (!roadBool && airfieldBool) return '#5dafde';
    if (roadBool && !airfieldBool) return '#f2ab31';
    if (!roadBool && !airfieldBool) return '#45ad43';
}

const CitiesLayer = (props) => {

    const {obj, tile, opacity, map, selectActions} = props;

    const isDark = tile.includes('dark');

    const iconColorify = (color, hasAccessToRoads, hasAccessAirfields, hasAccessAmbulance, lengthToRoad, lengthToAirfield, lengthToAmbulance) => {

        if (color === '#9e9c9c'){
            return (
                `
        <div style="width: fit-content">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 21V10L7.5 5L15 10V21H10V14H5V21H0ZM24 2V21H17V8.93L16 8.27V6H14V6.93L10 4.27V2H24ZM21 14H19V16H21V14ZM21 10H19V12H21V10ZM21 6H19V8H21V6Z" fill="${color}"/>
        </svg>
        </div>   
`
            )
        } else {
            return (
                `
        <div style="width: fit-content">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 21V10L7.5 5L15 10V21H10V14H5V21H0ZM24 2V21H17V8.93L16 8.27V6H14V6.93L10 4.27V2H24ZM21 14H19V16H21V14ZM21 10H19V12H21V10ZM21 6H19V8H21V6Z" fill="${color}"/>
        </svg>
        ${hasAccessToRoads && !lengthToRoad ? "<span>Д+</span>" : lengthToRoad ? `<span>Д:${lengthToRoad.toFixed(1)} км</span>` : "<span >Д-</span>" }   
        ${hasAccessAirfields && !lengthToAirfield ? "<span>A+</span>" : lengthToAirfield ? `<span >А:${lengthToAirfield.toFixed(1)} км</span>` : "<span >А-</span>" }   
        ${hasAccessAmbulance && !lengthToAmbulance ? "<span>C+</span>" : lengthToAmbulance ? `<span >C:${lengthToAmbulance.toFixed(1)} км</span>` : "<span >C-</span>" }   
        </Fragment>   
`
            )
        }

    }

    const divIcon = (color, hasAccessToRoads, hasAccessAirfields, hasAccessAmbulance, lengthToRoad, lengthToAirfield, lengthToAmbulance) => L.divIcon(
        {
            className: "trashIcon",
            html: iconColorify(color,hasAccessToRoads, hasAccessAirfields, hasAccessAmbulance, lengthToRoad, lengthToAirfield, lengthToAmbulance)
        }
    );

    let Elements;
    let iteratedList = obj.cities
    if (obj.filtered && iteratedList) {
        let newList  = [];
        for (let it = 0; it<obj.filtered.length;it++){
            const cityToList = iteratedList.find(el=> el.id===obj.filtered[it].id);
            newList.push(cityToList)
        }
        iteratedList = newList;
    }
    if (iteratedList && iteratedList.length>25 ) {
        iteratedList = iteratedList.filter(el=>{
            let point = []
            try{
                point = getPointsArrayFromPoint(el.point)[0]
            }
            catch (e){
                return false;
            }
            if (map.bounds && point) return map.bounds.contains(point)
            else return true
        })
    }
    if (iteratedList) {
        Elements = iteratedList.map(objectIterator => {
            const pointsStr = objectIterator.point;
            if (pointsStr) {
                const pointsStrArr = pointsStr.replace('POINT (', '').replace(')', '').replace('POINT(', '');
                const pointStr = pointsStrArr.trim().split(' ');
                const point1 = Number.parseFloat(pointStr[1]).toFixed(6);
                const point2 = Number.parseFloat(pointStr[0]).toFixed(6);
                const points = [point1, point2];

                let color = isDark ? '#fff' : '#000';
                let hasAccessToRoads = objectIterator['hasAccessToRoads'];
                let hasAccessAirfields = objectIterator['hasAccessToAirfields'];
                let hasAccessAmbulance = objectIterator['hasAccessAmbulance'];
                let isAwayRegion = objectIterator['is_faraway'];
                let flag = false;
                color = farawayColorInitial(objectIterator.is_need_road, objectIterator.is_need_airport, isAwayRegion)
                if (color === '#000') {
                    color = isDark ? '#fff' : '#000';
                }
                ;
                let closestRoadPoint = null;
                let closestAirfieldPoint = null;
                let closestAmbulancePoint = null;
                if (objectIterator.closest) {

                    closestRoadPoint = [points, objectIterator.closest.closestRoad.minPoint.geometry.coordinates]
                    closestAirfieldPoint = [points, objectIterator.closest.closestAirfield.minPoint.geometry.coordinates[0]]
                    closestAmbulancePoint = [points, objectIterator.closest.closestAmbulance.minPoint.geometry.coordinates[0]]
                }

                if (point1 && point2 && points) {
                    // const Polylist = objectIterator.closest && objectIterator.closest.closestRoad.allPoints.map(el=><Polyline positions={[points, el.geometry.coordinates]} key={'rrd'+objectIterator.id}
                    //                                                                                 color={'#ee1010'}
                    //                                                                                 weight={3}
                    //                                                                                 onContextMenu={(event) => {
                    //                                                                                 }}
                    // />)
                    return (
                        <Fragment>

                            <Marker position={points}
                                    opacity={opacity}
                                    key={'city' + objectIterator.id}
                                    icon={divIcon(color, hasAccessToRoads, hasAccessAirfields, hasAccessAmbulance,objectIterator.closest && objectIterator.closest.closestRoad.minLength, objectIterator.closest && objectIterator.closest.closestAirfield.minLength, objectIterator.closest && objectIterator.closest.closestAmbulance.minLength)}
                                    onClick={() => selectActions.selectCity(objectIterator)}
                                    onContextMenu={(event) => {
                                    }}>
                                <CityPopupContainer obj={objectIterator}/>
                            </Marker>

                            {/*{objectIterator.closest && objectIterator.closest.closestRoad && Polylist}*/}
                            {objectIterator.closest && objectIterator.closest.closestRoad &&
                            <Polyline positions={closestRoadPoint} key={'closestroadline'+objectIterator.id}
                                      color={'#f2ab31'}
                                      weight={3}
                                      onContextMenu={(event) => {
                                      }}
                            />
                            }
                            {objectIterator.closest && objectIterator.closest.closestAirfield &&
                            <Polyline positions={closestAirfieldPoint} key={'closestairline'+objectIterator.id}
                                      color={'#68f0f0'}
                                      weight={3}
                                      onContextMenu={(event) => {
                                      }}
                            />
                            }
                            {objectIterator.closest && objectIterator.closest.closestAmbulance &&
                            <Polyline positions={closestAmbulancePoint} key={'closestambulance'+objectIterator.id}
                                      color={'#ee1010'}
                                      weight={3}
                                      onContextMenu={(event) => {
                                      }}
                            />
                            }
                        </Fragment>
                    )
                } else debugger
            }
        });
    }
    return (
        <Fragment>
                    {Elements}
        </Fragment>
    )
};

export default pure(CitiesLayer);

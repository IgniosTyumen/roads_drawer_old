import React, {Fragment, useState} from "react";
import {Marker, Polyline} from "react-leaflet";

const WaypointTemplateLayer = props => {

    const {waypointTemplate,waypointActions,appActions,userPreferences, map} = props;

    const [routeLength,setRouteLength] = useState(0.0)

    const startPointIconDiv = `
       <div class="startPointIcon"
            style="width: ${userPreferences.startDrawMarkerSize}px; height: ${userPreferences.startDrawMarkerSize}px;"
  
            
       />

    `;

    const endPointIconDiv = `
       <div class="endPointIcon"
       style="width: ${userPreferences.endDrawMarkerSize}px; height: ${userPreferences.endDrawMarkerSize}px;"
       >
       </div>
    `;

    const middlePointIconDiv = `
       <div class="middlePointIcon"
       style="width: ${userPreferences.middleDrawMarkerSize}px; height: ${userPreferences.middleDrawMarkerSize}px;"
       >
           
       </div>
    `;

    const pseudoPointIconDiv = `
       <div class="pseudoPointIcon"
       style="width: ${userPreferences.pseudoDrawMarkerSize}px; height: ${userPreferences.pseudoDrawMarkerSize}px; border-radius: ${userPreferences.pseudoDrawMarkerSize}px;"
       >
           
       </div>
    `;

    const startPointIcon = L.divIcon(
        {
            html: startPointIconDiv
        }
    );
    const endPointIcon = L.divIcon(
        {
            html: endPointIconDiv
        }
    );
    const middlePointIcon = L.divIcon(
        {
            html: middlePointIconDiv
        }
    );
    const pseudoPointIcon = L.divIcon(
        {
            html: pseudoPointIconDiv
        }
    );

    const changeMarkerPosition = (position, event) => {
        waypointActions.moveCheckpoint([event.target._latlng.lat,event.target._latlng.lng], position);
    }

    const addMarkerOnPosition = (position,event) => {
       waypointActions.addCheckpoint([event.target._latlng.lat,event.target._latlng.lng], position+1)

    }

    const handleMarkerClickAndActivateEditMode = () => {
        appActions.switchAddMarkerMode();

    }
    const handleMarkerClickAndActivatePullEditMode = () => {
        appActions.switchPullMarkerMode();

    }

    const handleDeleteMarker = (index) => {
        if (templateWaypoint.geometry.points.length===1) {
            appActions.enableAddMarkerMode();
        }
        waypointActions.deleteCheckpoint(index);
    }

    const {templateWaypoint} = waypointTemplate;
    const geoArray = [...templateWaypoint.geometry.points];
    const MarkersArray = [];
    const SemimarkersArray = [];
    for (let it=0;it<geoArray.length;it++){
        if (it===0){
            MarkersArray.push(
                <Marker
                    position={geoArray[it]}
                    draggable={true}
                    onMoveEnd={(event)=>{changeMarkerPosition(it, event)}}
                    onClick={handleMarkerClickAndActivatePullEditMode}
                    icon={startPointIcon}
                    onContextMenu={()=>handleDeleteMarker(it)}
                />
                )
        }else
        if (it!=0 && it!=geoArray.length-1){
            MarkersArray.push(
                <Marker
                    position={geoArray[it]}
                    draggable={true}
                    onMoveEnd={(event)=>{changeMarkerPosition(it, event)}}
                    icon={middlePointIcon}
                    onContextMenu={()=>handleDeleteMarker(it)}
                />)
        } else {
            MarkersArray.push(
                <Marker
                    position={geoArray[it]}
                    draggable={true}
                    onMoveEnd={(event)=>{changeMarkerPosition(it, event)}}
                    onClick={handleMarkerClickAndActivateEditMode}
                    icon={endPointIcon}
                    onContextMenu={()=>handleDeleteMarker(it)}
                />)
        }
    }
    for (let it=0;it<geoArray.length-1;it++){
        const coords = [(geoArray[it][0]+geoArray[it+1][0])/2,(geoArray[it][1]+geoArray[it+1][1])/2];
        SemimarkersArray.push(<Marker position={coords} draggable={true} onMoveEnd={(event)=>{addMarkerOnPosition(it, event)}}  icon={pseudoPointIcon}/>)
    }
    const Poly = <Polyline positions={geoArray} color={'black'} weight={5} key={'template'} />

    return (
        <Fragment>
            {MarkersArray}
            {SemimarkersArray}
            {Poly}
        </Fragment>
    )
};

export default WaypointTemplateLayer;

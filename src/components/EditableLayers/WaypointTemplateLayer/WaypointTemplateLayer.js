import React, {Fragment, useState} from "react";
import {Marker, Polyline} from "react-leaflet";
import styleProvider from "../../CommonComponents/StyleProvider/styleProvider";

const WaypointTemplateLayer = props => {

    const {waypointTemplate,waypointActions,appActions,userPreferences, map} = props;

    const [routeLength,setRouteLength] = useState(0.0)

    const startPointIconDiv = `
       <div class="startPointIcon"
            style="width: ${styleProvider(userPreferences,'draw','startMarkerSize')}px; height: ${styleProvider(userPreferences,'draw','startMarkerSize')}px;"
  
            
       />

    `;

    const endPointIconDiv = `
       <div class="endPointIcon"
       style="width: ${styleProvider(userPreferences,'draw','endMarkerSize')}px; height: ${styleProvider(userPreferences,'draw','endMarkerSize')}px;"
       >
       </div>
    `;

    const middlePointIconDiv = `
       <div class="middlePointIcon"
       style="width: ${styleProvider(userPreferences,'draw','middleMarkerSize')}px; height: ${styleProvider(userPreferences,'draw','middleMarkerSize')}px;"
       >
           
       </div>
    `;

    const pseudoPointIconDiv = `
       <div class="pseudoPointIcon"
       style="width: ${styleProvider(userPreferences,'draw','pseudoMarkerSize')}px; height: ${styleProvider(userPreferences,'draw','pseudoMarkerSize')}px; border-radius: ${styleProvider(userPreferences,'draw',',pseudoMarkerSize')}px;"
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
        if (templateWaypoint.geometry.length===1) {
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
    let Poly = null;
    if (geoArray.length) {
     Poly = <Polyline positions={geoArray}
                      color={'black'}
                      weight={styleProvider(userPreferences,'draw','lineWidth')}
                      key={'template'}/>
    }
    return (
        <Fragment>
            {!map.showEditMarkers && MarkersArray[0]}
            {!map.showEditMarkers && MarkersArray[MarkersArray.length-1]}
            {map.showEditMarkers && MarkersArray}
            {map.showEditMarkers && SemimarkersArray}
            {Poly}
        </Fragment>
    )
};

export default WaypointTemplateLayer;

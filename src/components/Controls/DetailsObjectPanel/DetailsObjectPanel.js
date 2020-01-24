import React from "react";
import RoadDetailObjectContainer from "../../StaticLayers/Roads/RoadDetailObject/RoadDetailObjectContainer";
import DangerRoadDetailObjectContainer
    from "../../StaticLayers/DangerRoads/DangerRoadDetailObject/DangerRoadDetailObjectContainer";
import Preloader from "../../CommonComponents/Preloader/Preloader";
import CitiesDetailObjectContainer from "../../StaticLayers/Cities/CitiesDetailObject/CitiesDetailObjectContainer";

const DetailsObjectPanel = (props) => {

    const {detailedObjectType, detailedObject, handleSelectDetailedObject,fetching} = props;

    return (
        <div className={"detailsObjectPanel"}>
            {fetching && !detailedObjectType && <Preloader/>}
            {!fetching && detailedObjectType==='road' && <RoadDetailObjectContainer object={detailedObject} handleSelectDetailedObject={handleSelectDetailedObject}/>}
            {!fetching && detailedObjectType==='dangerRoad' && <DangerRoadDetailObjectContainer object={detailedObject} handleSelectDetailedObject={handleSelectDetailedObject}/>}
            {!fetching && detailedObjectType==='city' && <CitiesDetailObjectContainer object={detailedObject} handleSelectDetailedObject={handleSelectDetailedObject}/>}
        </div>
    )
};

export default DetailsObjectPanel;

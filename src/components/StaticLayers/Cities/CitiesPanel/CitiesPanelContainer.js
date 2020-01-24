import React from "react";
import {connect} from "react-redux";
import CitiesPanel from "./CitiesPanel";
import getPointsArrayFromLinestring from "../../../../utils/getPointsArrayFromLinestring";
import {bindActionCreators} from "redux";
import * as mapActions from "../../../../actions/MapActions";
import * as selectObjectsActions from "../../../../actions/SelectObjectsActions";
import * as objectActions from "../../../../actions/ObjectActions";
import getPointsArrayFromPoint from "../../../../utils/getPointsArrayFromPoints";

const CitiesPanelContainer = ({cities, handleSelectDetailedObject,mapActions,selectObjectsActions,objectActions}) => {


    const moveMapToObject = (object) => {
        let pointsStr = object['point'];
        if (pointsStr) {
            if (pointsStr[0].toLowerCase() === 'p') {
                let points = getPointsArrayFromPoint(pointsStr);
                mapActions.setCenterAndZoom(points[0]);
                selectObjectsActions.selectCity(object);

            } else if (pointsStr[0].toLowerCase() === 'l'){
                mapActions.setCenterAndZoom(getPointsArrayFromLinestring(object.path)[0]);
                selectObjectsActions.selectCity(object);
            }
        }
    }

    const handleSaveChanges = () => {
        objectActions.saveUpdatesInCities(cities.cities.filter(el=>el.changed))
    }

    const handleFieldChange = (id,field,value) => {
        objectActions.updateFieldInCity(id,field,value)
        objectActions.updateFieldInCity(id,'changed',true)
    }

    const containerCallback = (data) => {
        debugger
        objectActions.addReducerValue('city','filtered',data)
    }
    return (
        <CitiesPanel
            cities={cities}
            handleSelectDetailedObject={handleSelectDetailedObject}
            moveMapToObject={moveMapToObject}
            handleFieldChange={handleFieldChange}
            containerCallback={containerCallback}
            handleSaveChanges={handleSaveChanges}
        />
    )
};

const mapStateToProps = state => {
    return {
        cities:state.cities,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch,
        mapActions: bindActionCreators(mapActions,dispatch),
        selectObjectsActions: bindActionCreators(selectObjectsActions,dispatch),
        objectActions:bindActionCreators(objectActions,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CitiesPanelContainer);

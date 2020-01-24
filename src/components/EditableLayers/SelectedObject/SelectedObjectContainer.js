import React, {Fragment} from "react";
import {connect} from "react-redux";
import SelectedObject from "./SelectedObject";

const SelectedObjectContainer = ({road, bridge, userPreferences,dangerRoad, segment,city}) => {

    return (
        <Fragment>
        {((road && road.line_path) || bridge || (dangerRoad && dangerRoad.path) || segment || city) &&  <SelectedObject
            road={road}
            bridge={bridge}
            dangerRoad={dangerRoad}
            segment={segment}
            city={city}
            userPreferences={userPreferences}
            />}
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        road: state.selectedObject.selectedRoad,
        bridge: state.selectedObject.selectedBridge,
        dangerRoad: state.selectedObject.selectedDangerRoad,
        segment: state.selectedObject.selectedSegment,
        city: state.selectedObject.selectedCity,
        userPreferences: state.userPreferences
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedObjectContainer)

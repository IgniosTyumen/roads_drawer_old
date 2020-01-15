import React, {Fragment} from "react";
import {connect} from "react-redux";
import DangerRoadsLayer from "./DangerRoadsLayer";

const DangerRoadsLayerContainer = ({dangerRoads, visibleList, userPreferences}) => {
    return (
        <Fragment>
            {visibleList.indexOf("dangers") < 0 && <DangerRoadsLayer dangerRoads={dangerRoads} userPreferences={userPreferences}/>}
        </Fragment>
    )
};

const mapStateToProps = state => {
    return {
        dangerRoads: state.dangers,
        visibleList: state.visibleFilter.invisibleList,
        userPreferences: state.userPreferences
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DangerRoadsLayerContainer)

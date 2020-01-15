import React from "react";
import {connect} from "react-redux";
import MainControlPanel from "./MainControlPanel";


const MainControlPanelContainer = (props) => {
    return (
        <MainControlPanel
            dispatch={props.dispatch}
            activeRoad={props.activeRoad}
        />
    )
};

const mapStateToProps = (state) => {
    return {
        activeRoad:state.activeRoad.activeRoad
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    dispatch:dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainControlPanelContainer);

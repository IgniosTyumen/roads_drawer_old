import React from "react";
import {connect} from "react-redux";
import Preloader from "./Preloader";

const PreloaderContainer = (props) => {
    return (
        <Preloader
            initial={props.initial}
            dispatch={props.dispatch}
        />
    )
};

const mapStateToProps = state => {
    return {
        initial: state.initial
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PreloaderContainer)

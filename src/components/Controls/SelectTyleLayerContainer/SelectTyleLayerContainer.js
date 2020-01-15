import React from "react";
import {connect} from "react-redux";
import SelectTyleLayer from "./SelectTyleLayer";
import {bindActionCreators} from "redux";
import * as mapActions from '../../../actions/MapActions'

const SelectTyleLayerContainer = ({mapActions,zoom}) => {

    const handleSelectTyleLayer = (url) => {
        mapActions.selectTileLayer(url)
    };

    return (
        <SelectTyleLayer
            handleSelectTyleLayer={handleSelectTyleLayer}
            zoom={zoom}
        />

    )
};

const mapStateToProps = state => {
    return {
        zoom: state.map.zoom
    }
}

const mapDispatchToProps = dispatch => {
    return {
        mapActions : bindActionCreators(mapActions, dispatch)
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)( SelectTyleLayerContainer)

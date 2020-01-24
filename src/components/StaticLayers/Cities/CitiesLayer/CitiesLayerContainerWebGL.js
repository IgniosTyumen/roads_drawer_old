import React from "react";
import {connect} from "react-redux";
import * as selectActions from '../../../../actions/SelectObjectsActions'
import {bindActionCreators} from "redux";
import CitiesLayerWebGL from "./CitiesLayerWebGL";


const CitiesLayerContainerWebGL = ({obj,visibleList,tile,map,selectActions}) => {



    return (
            visibleList.indexOf("cities") < 0 ? <CitiesLayerWebGL obj={obj} tile={tile} map={map} selectActions={selectActions}/> : null
    )
};

const mapStateToProps = (state) => {
    return {
        obj: state.cities,
        visibleList: state.visibleFilter.invisibleList,
        tile: state.map.tile,
        map: state.map
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectActions : bindActionCreators(selectActions,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CitiesLayerContainerWebGL);

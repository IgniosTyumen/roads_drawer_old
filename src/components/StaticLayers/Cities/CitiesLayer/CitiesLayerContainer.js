import React, {Fragment} from "react";
import {connect} from "react-redux";
import CitiesLayer from "./CitiesLayer";
import * as selectActions from '../../../../actions/SelectObjectsActions'
import {bindActionCreators} from "redux";


const CitiesLayerContainer = ({obj,visibleList,tile,map,selectActions}) => {



    return (
        <Fragment>
            {visibleList.indexOf("cities") < 0 && <CitiesLayer obj={obj} tile={tile} map={map} selectActions={selectActions}/>}
        </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(CitiesLayerContainer);

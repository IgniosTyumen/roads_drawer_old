import React, {Fragment} from "react";
import {connect} from "react-redux";
import AmbulanceLayer from "./AmbulanceLayer";


const AmbulanceLayerContainer = ({obj,visibleList,tile}) => {



    return (
        <Fragment>
            {visibleList.indexOf("ambulance") < 0 && <AmbulanceLayer obj={obj} tile={tile} />}
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        obj: state.ambulance,
        visibleList: state.visibleFilter.invisibleList,
        tile: state.map.tile,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AmbulanceLayerContainer);

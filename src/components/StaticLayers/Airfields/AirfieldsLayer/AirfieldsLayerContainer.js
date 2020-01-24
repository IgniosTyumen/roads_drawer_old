import React, {Fragment} from "react";
import {connect} from "react-redux";
import AirfieldsLayer from "./AirfieldsLayer";


const AirfieldsLayerContainer = ({obj,visibleList,tile}) => {



    return (
        <Fragment>
            {visibleList.indexOf("airfields") < 0 && <AirfieldsLayer obj={obj} tile={tile} />}
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        obj: state.airfields,
        visibleList: state.visibleFilter.invisibleList,
        tile: state.map.tile,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AirfieldsLayerContainer);

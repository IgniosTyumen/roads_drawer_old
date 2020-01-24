import React, {Fragment} from "react";
import {connect} from "react-redux";
import FAPLayer from "./FAPLayer";


const FAPLayerContainer = ({obj,visibleList,tile}) => {



    return (
        <Fragment>
            {visibleList.indexOf("fap") < 0 && <FAPLayer obj={obj} tile={tile} />}
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        obj: state.fap,
        visibleList: state.visibleFilter.invisibleList,
        tile: state.map.tile,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FAPLayerContainer);

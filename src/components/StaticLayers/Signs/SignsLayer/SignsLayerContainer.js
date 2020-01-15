import React, {Fragment} from "react";
import {connect} from "react-redux";
import SignsLayer from "./SignsLayer";

const SignsLayerContainer = ({roadsigns,visibleList,userPreferences}) => {

    return (
        <Fragment>
            {visibleList.indexOf("signs") < 0 && <SignsLayer roadsigns={roadsigns}
                                                             userPreferences={userPreferences}/>}
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        roadsigns: state.roadsigns,
        visibleList: state.visibleFilter.invisibleList,
        userPreferences:state.userPreferences.signs,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignsLayerContainer);

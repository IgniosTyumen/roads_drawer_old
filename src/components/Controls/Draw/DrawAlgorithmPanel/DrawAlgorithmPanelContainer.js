import React from "react";
import {connect} from "react-redux";
import DrawAlgorithmPanel from "./DrawAlgorithmPanel";
import {bindActionCreators} from "redux";
import * as appActions from '../../../../actions/AppActions'

const DrawAlgorithmPanelContainer = ({appActions}) => {
    return (
        <DrawAlgorithmPanel
            appActions={appActions}
        />
    )
};

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(DrawAlgorithmPanelContainer)

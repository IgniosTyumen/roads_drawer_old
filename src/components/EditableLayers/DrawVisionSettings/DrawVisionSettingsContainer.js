import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as preferencesActions from '~/actions/ChangePreferencesActions'
import DrawVisionSettings from "./DrawVisionSettings";

const DrawVisionSettingsContainer = ({userPreferencesActions, userPreferences})  => {

    return (
        <DrawVisionSettings
            userPreferencesActions={userPreferencesActions}
            userPreferences={userPreferences}

        />
    )
};

const mapStateToProps = state => {
    return {
        userPreferences: state.userPreferences,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userPreferencesActions: bindActionCreators(preferencesActions, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawVisionSettingsContainer);

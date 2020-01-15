import React from "react";
import {connect} from "react-redux";
import RoadVisionSettings from "./RoadVisionSettings";
import {bindActionCreators} from "redux";
import * as preferencesActions from '~/actions/ChangePreferencesActions'

const RoadVisionSettingsContainer = ({userPreferencesActions, userPreferences})  => {

    return (
        <RoadVisionSettings
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

export default connect(mapStateToProps, mapDispatchToProps)(RoadVisionSettingsContainer);

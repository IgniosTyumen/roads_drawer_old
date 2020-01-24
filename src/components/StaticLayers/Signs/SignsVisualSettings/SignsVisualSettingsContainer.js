import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as preferencesActions from '../../../../actions/ChangePreferencesActions'
import SignsVisualSettings from "./SignsVisualSettings";

const SignsVisualSettingsContainer = ({userPreferencesActions, userPreferences})  => {

    return (
        <SignsVisualSettings
            userPreferencesActions={userPreferencesActions}
            userPreferences={userPreferences}

        />
    )
};

const mapStateToProps = state => {
    return {
        userPreferences: state.userPreferences.signs,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userPreferencesActions: bindActionCreators(preferencesActions, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignsVisualSettingsContainer);

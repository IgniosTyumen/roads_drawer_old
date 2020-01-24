import React from "react";
import {connect} from "react-redux";
import * as preferencesActions from '../../../../actions/ChangePreferencesActions'
import {bindActionCreators} from "redux";
import SignsVisionFilterF from "./SignsVisionFilterF";

const SignsVisionFilterContainer = props => {
    return (
        <SignsVisionFilterF
            userPreferencesActions={props.userPreferencesActions}
            userPreferences={props.userPreferences}
        />
    )
};

const mapStateToProps = state => {
    return {
        userPreferences: state.userPreferences.signs
    }
};

const mapDispatchToProps = dispatch => {
    return {
        userPreferencesActions: bindActionCreators(preferencesActions, dispatch),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(SignsVisionFilterContainer)

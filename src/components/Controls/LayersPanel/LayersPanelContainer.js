import React from "react";
import {connect} from "react-redux";
import LayersPanel from "./LayersPanel";
import {bindActionCreators} from "redux";
import * as visibleFilters from '~/actions/MapFilterActions';
import * as preferencesActions from '~/actions/ChangePreferencesActions'

const LayersPanelContainer = ({mapVisibleFiltersActions, mapInvisibleList, userPreferencesActions,userPreferences}) => {
    return (
        <LayersPanel
            mapVisibleFiltersActions={mapVisibleFiltersActions}
            mapInvisibleList={mapInvisibleList}
            userPreferencesActions={userPreferencesActions}
            userPreferences={userPreferences}
        />
    )
};

const mapStateToProps = state => {
    return {
        userPreferences: state.userPreferences,
        mapInvisibleList: state.visibleFilter.invisibleList,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        mapVisibleFiltersActions: bindActionCreators(visibleFilters, dispatch),
        userPreferencesActions: bindActionCreators(preferencesActions, dispatch),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(LayersPanelContainer)

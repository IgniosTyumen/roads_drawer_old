import React, {Fragment} from "react";
import {connect} from "react-redux";
import WaypointTemplateLayer from "./WaypointTemplateLayer";
import * as waypointActions from '~/actions/WaypointActions'
import * as appActions from '~/actions/AppActions'
import {bindActionCreators} from "redux";

const WaypointTemplateLayerContainer = ({waypointTemplate, waypointActions, appActions,visibleList, userPreferences,map}) => {


    return (
        <Fragment>
            {(waypointTemplate.templateWaypoint && visibleList.indexOf("roads") < 0) && <WaypointTemplateLayer
                waypointTemplate={waypointTemplate}
                waypointActions={waypointActions}
                appActions={appActions}
                userPreferences={userPreferences}
                map={map}
            />}
        </Fragment>
    )
};

const mapStateToProps = state => {
    return {
        waypointTemplate: state.waypointTemplate,
        visibleList: state.visibleFilter.invisibleList,
        userPreferences: state.userPreferences,
        map: state.map,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        waypointActions: bindActionCreators(waypointActions, dispatch),
        appActions: bindActionCreators(appActions, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WaypointTemplateLayerContainer)

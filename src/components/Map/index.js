import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mapActions from "~/actions/MapActions";
import * as waypointActions from "~/actions/WaypointActions";
import * as appActions from "~/actions/AppActions";
import {LayersControl, Map as LeafletMap, TileLayer, withLeaflet} from 'react-leaflet';
import RoadsLayerContainer from "../RoadsLayer/RoadsLayerContainer";
import BridgesLayerContainer from "../BridgesLayer/BridgesLayerContainer";
import SignsLayerContainer from "../SignsLayer/SignsLayerContainer";
import DangerRoadsLayerContainer from "../DangerRoadsLayer/DangerRoadsLayerContainer";
import SelectedObjectContainer from "../SelectedObject/SelectedObjectContainer";
import PrintControlDefault from 'react-leaflet-easyprint';
import WaypointTemplateLayerContainer from "../WaypointTemplateLayer/WaypointTemplateLayerContainer";
import ActiveRoadPreviewLayerContainer from "../ActiveRoadPreviewLayer/ActiveRoadPreviewLayerContainer";


class Map extends React.Component {
    componentDidMount() {

    }

    handleViewportChange(value) {
        this.props.mapActions.setCenterAndZoomChange(value.center, value.zoom)
    }

    handleZoomChange(value) {
        mapActions.setZoom(value)
    }

    addNewTemplateMarkers(event) {
        if (this.props.map.editMode) {
            this.props.waypointActions.pushCheckpoint([event.latlng.lat, event.latlng.lng])
        }
        if (this.props.map.pullMode) {
            this.props.waypointActions.pushCheckpointToStart([event.latlng.lat, event.latlng.lng])
        }
    }

    render() {
        const {center, zoom} = this.props.map;
        const {userPreferences} = this.props;
        const PrintControl = withLeaflet(PrintControlDefault);
        const {BaseLayer, Overlay} = LayersControl;
        return (
            <LeafletMap
                ref={(ref) => {
                    this.map = ref
                }}
                zoomControl={false}
                viewport={{center, zoom}}
                preferCanvas={true}
                draggable={false}
                onViewportChanged={this.handleViewportChange.bind(this)}
                disableDoubleClickZoom={true}
                onContextMenu={(event) => {

                    this.addNewTemplateMarkers(event)
                    event.stopPropagation()
                }}

            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />

                <RoadsLayerContainer/>
                <BridgesLayerContainer/>
                {(zoom>=userPreferences.zoomMinSignsRender && zoom<=userPreferences.zoomMaxSignsRender)  && <SignsLayerContainer/>}
                <DangerRoadsLayerContainer/>
                <SelectedObjectContainer/>
                {/*<OrderPreviewLayerContainer/>*/}
                <ActiveRoadPreviewLayerContainer/>

                <WaypointTemplateLayerContainer/>

                <PrintControl ref={(ref) => {
                    this.printControl = ref;
                }} position="topright" sizeModes={['Current', 'A4Portrait', 'A4Landscape']}
                              hideControlContainer={false}/>
                <PrintControl position="topright" sizeModes={['Current', 'A4Portrait', 'A4Landscape']}
                              hideControlContainer={false} title="Export as PNG" exportOnly/>


            </LeafletMap>
        );
    }
}

const mapStateToProps = state => {
    return {
        map: state.map,
        templateWaypoints: state.waypointTemplate,
        userPreferences:state.userPreferences,
    }
};
const mapDispatchToProps = dispatch => ({
    mapActions: bindActionCreators(mapActions, dispatch),
    waypointActions: bindActionCreators(waypointActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch)

});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

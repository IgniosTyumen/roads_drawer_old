import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mapActions from "../../actions/MapActions";
import * as waypointActions from "../../actions/WaypointActions";
import * as appActions from "../../actions/AppActions";
import {LayersControl, Map as LeafletMap, TileLayer, withLeaflet} from 'react-leaflet';
import RoadsLayerContainer from "../StaticLayers/Roads/RoadsLayer/RoadsLayerContainer";
import DangerRoadsLayerContainer from "../StaticLayers/DangerRoads/DangerRoadsLayer/DangerRoadsLayerContainer";
import SelectedObjectContainer from "../EditableLayers/SelectedObject/SelectedObjectContainer";
import PrintControlDefault from 'react-leaflet-easyprint';
import WaypointTemplateLayerContainer from "../EditableLayers/WaypointTemplateLayer/WaypointTemplateLayerContainer";
import ActiveRoadPreviewLayerContainer
    from "../StaticLayers/ActiveRoad/ActiveRoadPreviewLayer/ActiveRoadPreviewLayerContainer";
import AirfieldsLayerContainer from "../StaticLayers/Airfields/AirfieldsLayer/AirfieldsLayerContainer";
import CitiesLayerContainer from "../StaticLayers/Cities/CitiesLayer/CitiesLayerContainer";
import FAPLayerContainer from "../StaticLayers/FAP/FAPLayer/FAPLayerContainer";
import AmbulanceLayerContainer from "../StaticLayers/Ambulance/AmbulanceLayer/AmbulanceLayerContainer";


class Map extends React.Component {
    componentDidMount() {

    }

    handleViewportChange(value) {

        const map = this.map && this.map.leafletElement ? this.map.leafletElement : null;
        const bounds = map ? map.getBounds() : null
        if (bounds){
            this.props.mapActions.setCenterAndZoomChange(value.center, value.zoom,bounds)
        }
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
        const {center, zoom,tile} = this.props.map;
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
                maxZoom={20}
                onViewportChanged={this.handleViewportChange.bind(this)}
                disableDoubleClickZoom={true}
                onContextMenu={(event) => {

                    this.addNewTemplateMarkers(event)
                    event.stopPropagation()
                }}

            >
                <TileLayer
                    url={tile}
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />

                <RoadsLayerContainer/>
                {/*{(zoom>=styleProvider(userPreferences,'signs','signsZoomFrom') && zoom<=styleProvider(userPreferences,'signs','signsZoomTo'))  && <SignsLayerContainer/>}*/}
                <DangerRoadsLayerContainer/>
                <SelectedObjectContainer/>
                <ActiveRoadPreviewLayerContainer/>
                <AirfieldsLayerContainer/>
                <CitiesLayerContainer/>
                <WaypointTemplateLayerContainer/>
                <FAPLayerContainer/>
                <AmbulanceLayerContainer/>

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

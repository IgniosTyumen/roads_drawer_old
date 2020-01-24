import React, {PureComponent} from 'react';
import MapGL, {Marker} from 'react-map-gl';
import CitiesLayerContainerWebGL from "../StaticLayers/Cities/CitiesLayer/CitiesLayerContainerWebGL";
import 'mapbox-gl/dist/mapbox-gl.css';

// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoiaWduaW9zdHl1bWVuIiwiYSI6ImNrNXJxYmcxejA1dXQzbXFzZGp6bHU3MXQifQ.4LbAc12EWgTiDXUMZ76sfQ'; // eslint-disable-line

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz

class Markers extends PureComponent {
    render() {
        const data = this.props.children;
        debugger
        if (data && data.length) {
            return data.map(
                child => <Marker>{child}</Marker>
            )
        } else {
            return null
        }
    }
}

class MapOnGl extends PureComponent {
    state = {
        viewport: {
            width: "100%",
            height: "100vh",
            latitude: 0,
            longitude: 0,
            zoom: 2
        }
    };

    _onClick(info) {
        if (info.object) {
            // eslint-disable-next-line
            alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
        }
    }


    render() {
        return (
            <MapGL {...this.state.viewport} onViewportChange={viewport => this.setState({viewport})}
                   mapboxApiAccessToken={MAPBOX_TOKEN} mapStyle={"mapbox://styles/mapbox/dark-v8"}>
                <Markers children={()=>CitiesLayerContainerWebGL()}></Markers>
            </MapGL>

        );
    }
}

export default MapOnGl

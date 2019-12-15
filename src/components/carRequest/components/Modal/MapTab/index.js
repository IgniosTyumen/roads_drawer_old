import React from 'react';
import {Map as LeafletMap, Marker, TileLayer,} from 'react-leaflet';
import {connect} from 'formik';
import wkt from 'wellknown';

const MapTab = ({
  center,
  zoom,
  tile,
  formik,
}) => {
  const updatePosition = (event) => {
    const newPosition = event.target.getLatLng();
    const { lat, lng } = newPosition;
    const point = `POINT(${lng} ${lat})`;

    formik.setFieldValue('point', point);
  };

  const position = formik.values.point ? wkt.parse(formik.values.point).coordinates.reverse() : center;

  return (
    <LeafletMap
      zoomControl={true}
      viewport={{ center: position, zoom }}
      preferCanvas={true}
      style={{ height: 'calc(100vh - 90px)' }}
    >
      <TileLayer
        url={tile}
      />
      <Marker
        position={position}
        draggable={true}
        onDragend={updatePosition}
      >
        {/* <Popup>Адрес</Popup> */}
      </Marker>
    </LeafletMap>
  );
};

export default connect(MapTab);

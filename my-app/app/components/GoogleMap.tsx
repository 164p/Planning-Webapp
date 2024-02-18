import React from 'react'
import { GoogleMap, useJsApiLoader,LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

export default function GoogleMaps() {

  const [map, setMap] = React.useState(null)

  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   map.fitBounds(bounds);

  //   setMap(map)
  // }, [])

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null)
  // }, [])

  return (
    <div>
    <LoadScript
    googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY ?? ''}>     
      <GoogleMap
    mapContainerStyle={containerStyle}
    center={center}
    zoom={10}
    // onLoad={onLoad}
    // onUnmount={onUnmount}
  >
    { /* Child components, such as markers, info windows, etc. */ }
    <></>
  </GoogleMap>
    </LoadScript>
    </div>



  )
}




import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import './mapViewStyles.css';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const MapView = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'], // Add 'places' library if you plan to use it
  });

  console.log('Google Maps API Key:', process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  return (
    <div className="map-view-container">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */ }
        </GoogleMap>
      ) : (
        <div>Loading Map...</div>
      )}
    </div>
  );
};

export default MapView;

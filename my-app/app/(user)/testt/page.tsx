'use client'

import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Marker } from '@googlemaps/react-wrapper';


function Map() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = React.useRef(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY ?? '',
        version: 'weekly',
      });

      const { Map } = await loader.importLibrary('maps');
      const { PlaceDetailsService } = await loader.importLibrary('places');

      const initOptions = {
        center: { lat: 43.642493, lng: -79.3871189 },
        zoom: 17,
        mapId: 'MY_NEXTJS_MAPID',
      };

      const map = new Map(mapRef.current, initOptions);
      const placesService = new PlaceDetailsService(map);

      // Add markers with clickable event listeners
      const myMarkers = [
        // ...marker data including location and other properties
      ];

      myMarkers.forEach((markerData) => {
        const marker = new Marker({
          ...markerData,
          map,
        });

        marker.addListener('click', () => {
          const request = {
            placeId: markerData.placeId, // Assuming you have placeId for each marker
          };

          placesService.getDetails(request, (placeResult, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setSelectedPlace(placeResult); // Store Place Details
            } else {
              console.error('Place details request failed:', status);
            }
          });
        });
      });
    };

    initMap();
  }, []);

  return (
    <div style={{ height: '600px' }} ref={mapRef}>
      {selectedPlace && (
        <div>
          <h2>{selectedPlace.name}</h2>
          {/* Display other desired Place Details (address, website, reviews, etc.) */}
        </div>
      )}
    </div>
  );
}
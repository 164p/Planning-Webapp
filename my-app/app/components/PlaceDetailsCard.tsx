import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { styled } from 'styled-components';

interface PlaceCardProps {
  placeId: string;
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

const CardTitle = styled.h3`
  margin-bottom: 8px;
`;

const CardDetails = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const CardDetailItem = styled.li`
  margin-bottom: 4px;
`;

const PlaceCard: React.FC<PlaceCardProps> = ({ placeId }) => {
  const [place, setPlace] = useState<Place | null>(null);
  const [mapContainerStyle, setMapContainerStyle] = useState({
    width: '100%',
    height: '200px',
  });

  useEffect(() => {
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.getDetails({ placeId: placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setPlace(place);
      } else {
        console.error('Error fetching place details:', status);
      }
    });
  }, [placeId]);

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  return (
    <CardContainer>
      {place && (
        <>
          <CardTitle>{place.name}</CardTitle>
          <CardDetails>
            <CardDetailItem>
              <strong>Rating:</strong> {place.rating}
            </CardDetailItem>
            <CardDetailItem>
              <strong>Website:</strong> {place.website || 'N/A'}
            </CardDetailItem>
            <CardDetailItem>
              <strong>Address:</strong> {place.formatted_address}
            </CardDetailItem>
          </CardDetails>
          <LoadScript libraries={['places']} googleMapsApiKey={process.env.GOOGLE_API_KEY}>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={place.geometry.location}>
              <Marker position={place.geometry.location} />
            </GoogleMap>
          </LoadScript>
        </>
      )}
    </CardContainer>
  );
};

export default PlaceCard;

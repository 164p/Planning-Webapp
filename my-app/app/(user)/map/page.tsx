'use client'

import React, { useState, useEffect } from 'react';
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from '@vis.gl/react-google-maps'

export default function Maps(){
  const position = { lat: 13.6626, lng: 100.4375};
  const apikey = 'AIzaSyB5kjqj-I8H1VN5FsJXRBco_84TGWSLspM'
  return(
    <div className=''>
          <div style={{height: "100vh",width: '50%'}} className='z-10'>
      <APIProvider apiKey={apikey}>
        <Map 
        center={position}
        zoom={16}
        mapId={process.env.NEXT_PUBLIC_MAP_ID}
        fullscreenControl={false}
        >
          <Directions />
        </Map>
      </APIProvider>
    </div>
    </div>


  );
}

function Directions(){
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionService, setDirectionService] = useState<google.maps.DirectionsService>();
  const [directionRenderer, setDirectionRenderer] = useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];


  useEffect(() => {
    if(!routesLibrary || !map) return;
    setDirectionService(new routesLibrary.DirectionsService());
    setDirectionRenderer(new routesLibrary.DirectionsRenderer({map}));
  }
  ,[routesLibrary,map]);

  useEffect(() => {
    if(!directionService || !directionRenderer) return;
    directionService.route({
      origin: 'Central rama2',
      destination: 'KMUTT',
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    }).then(response => {directionRenderer.setDirections(response);
      setRoutes(response.routes)
    });
  }
  ,[directionService,directionRenderer]);

  console.log(selected?.summary);

  if (!leg) return null;

  return(
    <div className='absolute'>
      <h2>{selected.summary}</h2>
      <h1>test</h1>
    </div>
  );
}
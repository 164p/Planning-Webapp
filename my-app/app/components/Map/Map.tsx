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
      <div style={{height: "80vh",width: '100%'}} className='border-2 border-solid border-yellow-950'>
      <APIProvider apiKey={apikey}>
        <Map 
        defaultCenter={position}
        defaultZoom={16}
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
  const [datas, setDatas] = useState<any[]>();
  const [search, setSearcPlace] = useState("");
  const [originVisible, setoriginVisible] = useState(true); // Initial visibility set to true
  const [destinationVisible, setdestinationVisible] = useState(true); // Initial visibility set to true
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionService, setDirectionService] = useState<google.maps.DirectionsService>();
  const [directionRenderer, setDirectionRenderer] = useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];
  type resDataType = {
    statusCode: number;
    data?: {
        predictions: any[];
    };
};


  async function originSearch(e: any){
    setoriginVisible(true)
    setOrigin(e.target.value)

    const resAutocomplete = await fetch(
        `/api/autocomplete/detail?query=${encodeURIComponent(e.target.value as string)}`
    );
    if (resAutocomplete.ok) {
        const resData: resDataType = await resAutocomplete.json();
        setDatas(resData.data?.predictions);
    }
}
  async function destinationSearch(e: any){
    setdestinationVisible(true)
    setDestination(e.target.value)
    
    const resAutocomplete = await fetch(
        `/api/autocomplete/detail?query=${encodeURIComponent(e.target.value as string)}`
    );
    if (resAutocomplete.ok) {
        const resData: resDataType = await resAutocomplete.json();
        setDatas(resData.data?.predictions);
    }
  }

  const handleOriginClick = (place:any) => {
    setOrigin(place.structured_formatting.main_text);
    setoriginVisible(false); // Hide the div on click
  };
  
  const handleDestinationClick = (place:any) => {
    setDestination(place.structured_formatting.main_text);
    setdestinationVisible(false); // Hide the div on click
  };


  useEffect(() => {
    if(!routesLibrary || !map) return;
    setDirectionService(new routesLibrary.DirectionsService());
    setDirectionRenderer(new routesLibrary.DirectionsRenderer({map}));
  }
  ,[routesLibrary,map]);

  useEffect(() => {
    if(!directionService || !directionRenderer) return;
    directionService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    }).then(response => {directionRenderer.setDirections(response);
      setRoutes(response.routes)
    });
  }
  ,[directionService,directionRenderer,origin,destination]);

  console.log(selected);

  return(
    <div className='absolute right-0 bg-[#E4D7C1] w-60 px-3 py-3 text-sm rounded-md mt-2 mr-2'>
      <div className='input-group'>
        <label htmlFor="search" className='flex justify-center'>Origin Place</label>
        <input type='text' id='search' name='search'
            className='w-full py-1.5 px-3 text-sm rounded-md bg-white focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400'
            placeholder='Search place'
            onChange={originSearch}
            value={origin}
        />
    </div>
    <div className='overflow-auto max-h-52'>
        {
            originVisible && origin && datas && datas.map((place, index) => (
                <button 
                    onClick={() => handleOriginClick(place)}
                    key={index} className='block w-full px-5 py-3 mb-2 rounded-md border border-[#876A0F] first:mt-3 last:mb-0 text-start'>
                    <p className='font-bold'>{place.structured_formatting.main_text}</p>
                    <p>{place.structured_formatting.secondary_text}</p>
                </button>
            ))
        }
    </div>
    <div className='input-group mt-3'>
        <label htmlFor="search" className='flex justify-center'>Destination Place</label>
        <input type='text' id='search' name='search'
            className='w-full py-1.5 px-3 text-sm rounded-md bg-white focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400'
            placeholder='Search place'
            onChange={destinationSearch}
            value={destination}
        />
    </div>
    <div className='overflow-auto max-h-52'>
        {
           destinationVisible && destination && datas && datas.map((place, index) => (
                <button 
                    onClick={() => handleDestinationClick(place)}
                    key={index} className='block w-full px-5 py-3 mb-2 rounded-md border border-[#876A0F] first:mt-3 last:mb-0 text-start'>
                    <p className='font-bold'>{place.structured_formatting.main_text}</p>
                    <p>{place.structured_formatting.secondary_text}</p>
                </button>
            ))
        }
    </div>
    <strong className='flex justify-center mt-3'>Distance {leg?.distance?.text}</strong>
    <strong className='flex justify-center'>{leg?.duration?.text}</strong>
    </div>
  );
}
// import { Loader } from "@googlemaps/js-api-loader"

// export default function Home(){

//     const loader = new Loader({
//         apiKey: "AIzaSyC6LYgvdJqZ0QLoJXA7XKLHuaqPPzLY1Ac",
//         version: "weekly",
//       });

//       let map: google.maps.Map;
      
//       loader.load().then(async () => {
//         const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
//         map = new Map(document.getElementById("map") as HTMLElement, {
//           center: { lat: -34.397, lng: 150.644 },
//           zoom: 8,
//         });
//       });

// return(
//     <div ref={map}/>
// )
// }
'use client'

import React,{useEffect} from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function Map(){
// Initialize and add the map
let map;
async function initMap() {
    const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY ?? "",
    version: 'weekly'
});
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };

  // Request needed libraries.
  //@ts-ignore
const {Map} = await loader.importLibrary('maps');
const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary;

  // The map, centered at Uluru
  map = new Map(
    document.getElementById('map') as HTMLDivElement,
    {
      zoom: 4,
      center: position,
      mapId: 'DEMO_MAP_ID',
    }
  );

  // The marker, positioned at Uluru
  const marker = new Marker({
    map: map,
    position: position,
    title: 'Uluru'
  });
}

initMap();

    return(
        <main>
        <div style={{height: '600px'}} ref={map}></div>
        </main>
    )
}

// const loader = new Loader({
//     apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY ?? "",
//     version: 'weekly'
// });

// const {Map} = await loader.importLibrary('maps');
// const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary;
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
    const mapRef = React.useRef(null);

    useEffect(() =>{
        const initMap = async () =>{
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY ?? "",
                version: 'weekly'
            });

            const {Map} = await loader.importLibrary('maps');

            const position = {
                lat: 43.642493,
                lng: -79.3871189
            }

            const mapOptions: google.maps.MapOptions={
                center: position,
                zoom: 17,
                mapId: 'MY_NEXTJS_MAPID'
            }

            const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
        }

        initMap();

    },[]);
    return(
        <div style={{height: '600px'}} ref={mapRef}></div>
    )
}
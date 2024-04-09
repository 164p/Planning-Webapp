'use client'
import React, { useEffect,useRef, useState } from 'react'
import {Loader} from '@googlemaps/js-api-loader'
import LocationCard from './LocationCard';

export default function Maps() {
    const [place_id, setPlace_id] = useState('')
    const mapRef = React.useRef<HTMLDivElement>(null);
    const origin = {
        lat:13.8167962,
        lng:100.5616667
    }

    useEffect(() =>{
        const initMap = async () => {
            const loader = new Loader({
                apiKey: "AIzaSyC6LYgvdJqZ0QLoJXA7XKLHuaqPPzLY1Ac",
                version:'weekly',
                libraries:['places']
            }) 
            const {Map} = await loader.importLibrary('maps')
            
            const mapOptions =  {
                center: origin,
                zoom: 15,
            }
            const map = new Map(mapRef.current as HTMLDivElement,mapOptions)
            const clickHandler = new ClickEventHandler(map,origin)
        }

        function isIconMouseEvent(
        e: google.maps.MapMouseEvent | google.maps.IconMouseEvent
      ): e is google.maps.IconMouseEvent {
        return "placeId" in e;
      }
      
    class ClickEventHandler {
        origin: google.maps.LatLngLiteral;
        map: google.maps.Map;
        placesService: google.maps.places.PlacesService;
        infowindow: google.maps.InfoWindow;
        infowindowContent: HTMLElement;
        constructor(map: google.maps.Map, origin: google.maps.LatLngLiteral) {
          this.origin = origin;
          this.map = map;
          this.placesService = new google.maps.places.PlacesService(map);
          this.infowindow = new google.maps.InfoWindow();
          this.infowindowContent = document.getElementById(
            "infowindow-content"
          ) as HTMLElement;
          this.infowindow.setContent(this.infowindowContent);
      
          // Listen for clicks on the map.
          this.map.addListener("click", this.handleClick.bind(this));
        }

        handleClick(event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {
            console.log("You clicked on: " + event.latLng);
            if (isIconMouseEvent(event)) {
                console.log("You clicked on place:" + event.placeId);event.stop();
                
                if (event.placeId) {
                    setPlace_id(event.placeId)
                }
              }
            }

            
    }
        initMap();
    }, [])

    
   
    
  return (
    <div>
        {place_id}
        <div style={{height:'600px'}} ref={mapRef}></div>
    </div>
  )
}

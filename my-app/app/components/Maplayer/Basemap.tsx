import React from "react";
import data from "@/app/components/Data/province.json"
import { LayersControl, TileLayer } from "react-leaflet";
import 'leaflet-boundary-canvas'


var latLngGeom = data; //Define real geometry here
var map:any = map('map').setView([55.7, 38], 7),
    osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    osmAttribution = 'Map data &copy; 2012 OpenStreetMap contributors';
 
var osm = TileLayer.BoundaryCanvas(osmUrl, {
    boundary: latLngGeom, 
    attribution: osmAttribution
}).addTo(map);

const Basemap = () => {
    return(
        <LayersControl position="bottomleft">
            <LayersControl.BaseLayer name="test">
                <map/>
            </LayersControl.BaseLayer>
        </LayersControl>
    )
}

export default Basemap
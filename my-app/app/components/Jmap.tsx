import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Province from "./Maplayer/Province";


export default function Map() {

  return (
<MapContainer center={[14, 100]} zoom={6} scrollWheelZoom={true} style={{width: '800px', height: '100vh',alignContent: 'center'}}>
      <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
      <Province/>
    </MapContainer>
  );
}

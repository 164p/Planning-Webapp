import React, { useState } from "react";
import data from "@/app/components/Data/province.json"
import 'leaflet-boundary-canvas'
import L from 'leaflet'



const Basemap = () => {

    return(
        <LayersControl position="bottomleft">
            <LayersControl.BaseLayer name="test">
            </LayersControl.BaseLayer>
        </LayersControl>
    )
}

export default Basemap
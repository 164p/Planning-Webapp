import React from "react";
import data from "@/app/components/Data/province.json"
import {GeoJSON} from 'react-leaflet'

const Province = () => {
    return data && <GeoJSON data={data} style={{weight: 1,color: 'black',fillColor: "D9D9D9"}}/>
}

export default Province
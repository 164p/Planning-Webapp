import React from "react";
import data from "@/app/components/Data/province.json"
import {GeoJSON} from 'react-leaflet'

const Province = () => {
    const geoStyle = (feature:any) => {
        if (feature.isTooltipOpen()	){
            return{
                weight: 1,
                    color: 'brown',
                        fillcolor: 'green',
                            fillOpacity: 0.3
            }
        }
            
    }

    const handleFeature = (feature:any, layer:any) => {
        layer.bindTooltip(feature.properties.ADM1_TH)
        
    }

    return data && <GeoJSON data={data} 
    style={{geoStyle}}
    onEachFeature={handleFeature}
    />
}

export default Province
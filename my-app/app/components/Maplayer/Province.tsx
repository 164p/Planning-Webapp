import React from "react";
import data from "@/app/components/Data/province.json"
import {GeoJSON} from 'react-leaflet'

const visited = ['กรุงเทพมหานคร','เชียงใหม่']
const willVisted = ['เชียงราย']

const Province = () => {
    const geoStyle = (feature:any) => {
        const test = feature.properties.ADM1_TH
        if (visited.includes(test)	){
            return{
                weight: 1,
                    color: 'brown',
                        fillcolor: 'green',
                            fillOpacity: 0.3
            }
        }else if( test in willVisted){
            return{
                weight: 1,
                    color: 'black',
                        fillcolor: 'green',
                            fillOpacity: 0.3
            }
        }else{
            return{
                weight: 1,
                    color: 'blue',
                        fillcolor: 'green',
                            fillOpacity: 0.3
            }
        }
            
    }

    const handleClickFeature = (event:any) => {
        const layer = event.target

        visited.push(layer.feature.properties.ADM1_TH)
        console.log(layer.feature.properties.ADM1_TH)
        console.log(visited)

    }

    const handleFeature = (feature:any, layer:any) => {
        layer.bindTooltip(feature.properties.ADM1_TH)
        layer.on({
            'click':handleClickFeature
        })
        
    }

    return data && <GeoJSON data={data} 
    style={geoStyle}
    onEachFeature={handleFeature}
    />
}

export default Province
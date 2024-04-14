"use client";
import { useState, useEffect, useRef, useCallback } from "react";

import VectorMap, {
  Layer,
  Export,
  Title,
  Label,
  ILayerProps,
  Size,
} from "devextreme-react/vector-map";
import * as mapsData from "./province.json";

export default function Journey() {
  const [province, setProvince] = useState('');
  interface MapsData {
    features?: {};
    // Define other properties if necessary
  }

  const projection = {
    to: ([l, lt]: [number, number]) => [l / 100, lt / 100],
    from: ([x, y]: [number, number]) => [x * 100, y * 100],
  };

  const customizeLayer: ILayerProps["customize"] = (elements) => {
    elements.forEach((element) => {
      const country = mapsData.features[element.index];
      if (country)
        element.applySettings({
          color: "#CF482B",
          hoveredColor: "#e0e000",
          selectedColor: "#008f00",
        });
    });
  };

  const clickHandler = ({ target }) => {
    if (target && mapsData.features[target.index]) {
      target.selected(!target.selected());
      console.log(mapsData.features[target.index].properties.ADM1_EN);
      setProvince(mapsData.features[target.index].properties.ADM1_EN)
    }
  };
  return (
    <div>
      <h1 className="text-[#674F04] text-6xl pt-60 p-10 text-center font-medium">
        Diary's Journey
      </h1>
      <div className="flex justify-center items-center">
        <div className="flex w-full p-0.5 mt-10 mb-20 lg:w-2/3 bg-[#674F04] " />
      </div>
      <div className="container mx-auto py-8 bg-[#F5F0E8]">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="">
            <VectorMap
              id="vector-map"
              maxZoomFactor={12}
              projection={projection}
              zoomFactor={12}
              center={[100.523186, 13.736717]}
              onClick={clickHandler}
            >
              <Size height={800} width={600} />
              <Export enabled={true}></Export>
              <Title text="Map of Thailand"></Title>
              <Layer dataSource={mapsData} customize={customizeLayer}>
                <Label enabled={true}></Label>
              </Layer>
            </VectorMap>
          </div>
          <div className="bg-[#674F04] lg:size-full w-full h-96" >
            <div>
            {province}

            </div>
        </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef, useCallback } from "react";

import VectorMap, {
  Layer,
  Export,
  Title,
  Label,
  ILayerProps,
  Size,
} from "devextreme-react/vector-map";
import { pangaeaBorders } from "./province";
import * as mapsData from "./province.json";

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
    element.applySettings({
      color: "#CF482B",
      hoveredColor: "#e0e000",
      selectedColor: "#008f00",
    });
  });
};

const clickHandler = ({target}) => {
  if (typeof(target.index) === "number") {
  target.selected(!target.selected());
  console.log(mapsData.features[target.index])
  }
};

export default function Map() {
  return (
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
  );
}

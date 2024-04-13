import { useState, useEffect, useRef, useCallback } from "react";


import VectorMap, {
  Layer,
  Export,
  Title,
  Label, 
  ILayerProps,
  Size
} from 'devextreme-react/vector-map';
import { pangaeaBorders } from './data1';

const projection = {
  to: ([l, lt]: [number, number]) => [l / 100, lt / 100],
  from: ([x, y]: [number, number]) => [x * 100, y * 100],
};

const customizeLayer: ILayerProps['customize'] = (elements: any[]) => {
  elements.forEach((element: { applySettings: (arg0: { color: any; }) => void; attribute: (arg0: string) => any; }) => {
    element.applySettings({
      color: element.attribute('color'),
    });
  });
};

export default function Map() {
  return (
      <VectorMap
        id="vector-map"
        maxZoomFactor={12}
        projection={projection}
        zoomFactor={12}
        center={[100.523186, 13.736717]}
      >
        <Size
          height={800}
          width={600}
        />
        <Export enabled={true}></Export>
        <Title text="Map of Thailand"></Title>
        <Layer
          dataSource={pangaeaBorders}
          hoverEnabled={false}
          name="Thailand"
          color="#bb7862">
        </Layer>
        <Layer
          dataSource={pangaeaBorders}
          customize={customizeLayer}>
          <Label enabled={true}></Label>
        </Layer>
      </VectorMap>
  );
}
"use client";
import Jmap from "@/app/components/Jmap";
import React from "react";
import VectorMap, {
  Layer,
  Export,
  Title,
  Label,
  ILayerProps,
} from "devextreme-react/vector-map";
export default function Journey() {
  return (
    <div>
      <h1 className="text-[#674F04] text-6xl pt-60 p-10 text-center font-medium">
        Diary's Journey
      </h1>
      <div className="flex justify-center items-center">
        <div className="flex w-full p-0.5 mt-10 mb-20 lg:w-2/3 bg-[#674F04] " />
      </div>
      <div className="container mx-auto py-8">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="">
            <Jmap />
          </div>

          <div className="bg-[#674F04] lg:size-full w-full h-96" />
        </div>
      </div>
    </div>
  );
}

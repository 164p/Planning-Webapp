"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import themes from "devextreme/ui/themes";
import VectorMap, {
  Layer,
  Export,
  Title,
  Label,
  ILayerProps,
  Size,
  VectorMapTypes,
  ILegendProps,
  ITooltipProps,
  Legend,
  Source,
  Tooltip,
  Annotation,
  Border,
  Font,
} from "devextreme-react/vector-map";

import InputEmoji from 'react-input-emoji'
import * as mapsData from "./province.json";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function Journey() {
  const [provinceEn, setProvinceEn] = useState("Bangkok");
  const [provinceTh, setProvinceTh] = useState("กรุงเทพมหานคร");
  const [zoomFactor, setZoomFactor] = useState("12");
  const [provinceHover, setProvinceHover] = useState("");
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
      element.attribute(
        "province",
        mapsData.features[element.index].properties.ADM1_EN
      );
      const province = mapsData.features[element.index];
      if (province) {
        element.applySettings({
          color: "#CF482B",
          hoveredColor: "#e0e000",
          selectedColor: "#008f00",
        });
      }
    });
  };

  const clickHandler = ({ target }) => {
    if (target && mapsData.features[target.index]) {
      target.selected(!target.selected());
      console.log(mapsData.features[target.index].properties.ADM1_EN);
      setProvinceEn(mapsData.features[target.index].properties.ADM1_EN);
      console.log(mapsData.features[target.index].properties.ADM1_TH);
      setProvinceTh(mapsData.features[target.index].properties.ADM1_TH);
      console.log(zoomFactor);
    }
  };

  const zoomFactorChanged = useCallback(
    (e: VectorMapTypes.ZoomFactorChangedEvent) => {
      setZoomFactor(e.zoomFactor.toFixed(12));
    },
    [setZoomFactor]
  );

  const customizeTooltip: ITooltipProps["customizeTooltip"] = (arg) => {
    if (arg.attribute("province")) {
      console.log(arg.attribute("province"));
      setProvinceHover(arg.attribute("province"));
      return { text: `${arg.attribute("province")}` };
    }
    return null;
  };

  const provincehover = `You are in \n "<strong>${provinceHover}</strong>"`;
  const [opened, { open, close }] = useDisclosure(false);

  const [ text, setText ] = useState('')
  
  function handleOnEnter (text: any) {
    console.log('enter', text)
  }

  return (
    <div className="dx-viewport">
      <h1 className="text-[#674F04] text-6xl pt-60 p-10 text-center font-medium">
        Memoirs
      </h1>

      <div className="flex justify-center items-center">
        <div className="flex w-full p-0.5 mt-10 mb-20 lg:w-2/3 bg-[#674F04] " />
      </div>
      <div className="container mx-auto py-8 bg-[#F5F0E8]">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="">
            <VectorMap
              id="vector-map"
              center={[100.523186, 13.736717]}
              zoomFactor={25}
              onZoomFactorChanged={zoomFactorChanged}
              onClick={clickHandler}
            >
              <Size height={800} width={600} />
              <Export enabled={true}></Export>
              <Title text={provincehover}></Title>
              <Layer dataSource={mapsData} customize={customizeLayer}></Layer>
              <Tooltip
                enabled={true}
                customizeTooltip={customizeTooltip}
              ></Tooltip>
            </VectorMap>
          </div>
          <div className="bg-[#674F04] lg:size-full w-full h-96">
            <Modal
              opened={opened}
              onClose={close}
              title="Memory Note"
              centered
              styles={{
                title: {fontSize: 30},
                header: {backgroundColor: 'rgba(245, 240, 232 )'},
                body: {backgroundColor: 'rgba(245, 240, 232 )'}

              }}
            >
              <>
                <hr className="border-[#674F04] border-1 rounded-full" />
                <div>
                  <div className="py-5">
                    <p className="font-bold">How about this trip?</p>
                    <div className="flex inline-block">
                    <InputEmoji
                        value={text}
                        onChange={setText}
                        cleanOnEnter
                        onEnter={handleOnEnter}
                        placeholder="Type a message" shouldReturn={false} shouldConvertEmojiToImage={false}/>
                    </div>
                  </div>
                  <div className="pb-7">
                    <p className="font-bold">Name Your Trip</p>
                    <input
                      className="ml-2 pl-2 p-2 pr-36 rounded-full "
                      placeholder="name"
                    ></input>
                  </div>
                  <div className="pb-10">
                    <p className="font-bold">Tip note</p>
                    <input
                      className="ml-2 pl-2 p-2 pr-36 rounded-full "
                      placeholder="note!"
                    ></input>
                  </div>
                  <div className="flex justify-center items-center">
                    <button className="bg-[#674F04] text-[#F5F0E8] p-2 px-3 rounded-full">
                      Save
                    </button>
                  </div>
                </div>
              </>
            </Modal>
            <div dir="rtl">
              <div className="z-10 absolute px-2 py-2 mt-14 mr-10 font-bold inline-flex">
                <Button
                  onClick={open}
                  variant="filled"
                  color="rgba(245, 240, 232 )"
                  radius="lg"
                >
                  <p className="text-[#674F04]">vvvvvv</p>
                </Button>
              </div>
            </div>
            <div className=" m-10">
              <div className="text-white text-4xl">{provinceEn}</div>
              <div className="text-white">{provinceTh}</div>
            </div>
            <hr className="text-[#F5F0E8] m-7 border-2 rounded-full" />
            <div>
              <div className="border-box bg-[#F5F0E8] px-2 py-16 mx-10 rounded-2xl "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// div dir="rtl">
//                 <div className="z-10 absolute bg-[#F5F0E8] rounded-full px-2 py-2 mt-14 mr-10 font-bold inline-flex bg-blend-overlay">
//                   <button className="text-[#674F04]">
//                     vvvvvv
//                   </button>
//                 </div>
//             </div>

// {isOpen && (
//   <>
//   <div className="popup fixed z-50">
//     <div className="place-items-center h-screen">
//       <div className="text-[#674F04] bg-[#F5F0E8] p-5 z-10 rounded-2x">
//         <div className="flex justify-between">
//           <div className="text-2xl font-bold">Your Trip</div>
//           <div dir="rtl" className="pl-32">
//             <button onClick={handleClick}>
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="text-[#674F04] w-5 h-5 mt-2" fill="currentcolor">
//               <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
//             </svg>
//             </button>
//           </div>
//         </div>
//         <hr className="border-[#674F04] mx-2 my-3 border-1 rounded-full"/>
//         <div className="pb-5">
//           <p className="font-bold">How about this trip?</p>
//           <input className="ml-2 pl-2 rounded-2xl" placeholder="name"></input>
//         </div>
//         <div className="pb-5">
//           <p className="font-bold">Name Your Trip</p>
//           <input className="ml-2 pl-2 rounded-2xl" placeholder="name"></input>
//         </div>
//         <div className="pb-5">
//           <p className="font-bold">Tip note</p>
//           <input className="ml-2 pl-2 rounded-2xl" placeholder="note!"></input>
//         </div>
//         <div className="flex justify-center items-center">
//           <button onClick={handleClick} className="bg-[#674F04] text-[#F5F0E8] p-2 rounded-2xl">Save</button>
//         </div>
//       </div>
//       </div>
//   </div>
//   <div className="overlay fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 z-40">
//     {/* Optional content for the overlay (e.g., a loading indicator) */}
//   </div>
//   </>
// )}

"use client";
import { useState, useCallback, FormEvent, useEffect } from "react";
import Swal from "sweetalert2";
import VectorMap, {
  Layer,
  Export,
  Title,
  ILayerProps,
  Size,
  VectorMapTypes,
  ITooltipProps,
  Tooltip,
  LoadingIndicator,
} from "devextreme-react/vector-map";
import InputEmoji from "react-input-emoji";
import * as mapsData from "./province.json";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useSWR, { mutate } from "swr";
import dxVectorMap from "devextreme/viz/vector_map";
import { stringify } from "querystring";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Journey() {
  type visitedProvincedData = {
    id: String;
    emoji?: String;
    province: String;
    name: String;
    description?: String;
    ownerId: String;
  };
  const FormDataInput = {
    province: "",
    emoji: "",
    name: "",
    description: "",
  };

  const [opened, { open, close }] = useDisclosure(false);
  const [text, setText] = useState("");
  const [visitedProvinceData, setVisitedProvinceData] = useState(FormDataInput);
  const { data, error, isLoading } = useSWR("/api/journey", fetcher);
  const [provinceEn, setProvinceEn] = useState("Bangkok");
  const [provinceTh, setProvinceTh] = useState("กรุงเทพมหานคร");
  const [zoomFactor, setZoomFactor] = useState("12");
  const [provinceHover, setProvinceHover] = useState("Bangkok");
  const [visitedProvinceArray, setVisitedProvinceArray] = useState<string[]>(
    []
  );
  const [mapCondition, setMapCondition] = useState(1);
  const provincehover = `You are in \n "<strong>${provinceHover}</strong>"`;

  useEffect(() => {
    if (data) {
      const newVisitedProvinces = data.data.map(
        (visitedProvince: visitedProvincedData) => visitedProvince.province
      );
      const uniqueProvinces: Set<string> = new Set(newVisitedProvinces);
      const arrayOfStrings: string[] = Array.from(uniqueProvinces);
      setVisitedProvinceArray(arrayOfStrings);
      setMapCondition(0);
    }
  }, [data]);

  useEffect(() => {
    if (mapCondition == 1) {
      if (data) {
        const newVisitedProvinces = data?.data.map(
          (visitedProvince: visitedProvincedData) => visitedProvince.province
        );
        const uniqueProvinces: Set<string> = new Set(newVisitedProvinces);
        const arrayOfStrings: string[] = Array.from(uniqueProvinces);
        setVisitedProvinceArray(arrayOfStrings);
        setMapCondition(0);
      }
    }
  }, [mapCondition, visitedProvinceArray]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisitedProvinceData({
      ...visitedProvinceData,
      [e.target.name]: e.target.value,
    });
  };
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    visitedProvinceData.province = provinceEn;
    visitedProvinceData.emoji = text;

    if (visitedProvinceData.province == "" || visitedProvinceData.name == "") {
      Swal.fire({
        title: "เพิ่มข้อมูลไม่สำเร็จ",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
        icon: "error",
        confirmButtonText: "ปิด",
      });
    } else {
      try {
        Swal.fire({
          title: "กำลังบันทึกข้อมูล",
          icon: "warning",
          confirmButtonText: "ปิด",
          allowOutsideClick: false,
        });

        const response = await fetch("/api/journey/add", {
          method: "POST",
          body: JSON.stringify(visitedProvinceData),
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "บันทึกข้อมูลสำเร็จ",
            confirmButtonText: "ปิด",
            timer: 1500,
            timerProgressBar: true,
          });
        } else {
          const responseData = await response.json();

          Swal.fire({
            icon: "error",
            title: "บันทึกข้อมูลไม่สำเร็จ",
            text: responseData.message,
            confirmButtonText: "ปิด",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "บันทึกข้อมูลไม่สำเร็จ",
          text: "เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้งในภายหลัง",
          confirmButtonText: "ปิด",
        });
      }
    }
    setText("");
    await mutate("/api/journey");
    setVisitedProvinceArray([]);
    setMapCondition(1);
  }
  async function onDelete(event: any) {
    event.preventDefault;
    try {
      Swal.fire({
        title: "กำลังลบข้อมูล",
        icon: "warning",
        confirmButtonText: "ปิด",
        allowOutsideClick: false,
      });
      const response = await fetch("/api/journey/delete", {
        method: "DELETE",
        body: JSON.stringify(event),
      });
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "ลบข้อมูลสำเร็จ",
          confirmButtonText: "ปิด",
          timer: 1500,
          timerProgressBar: true,
        });
      } else {
        const responseData = await response.json();

        Swal.fire({
          icon: "error",
          title: "ลบข้อมูลไม่สำเร็จ",
          text: responseData.message,
          confirmButtonText: "ปิด",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ลบข้อมูลไม่สำเร็จ",
        text: "เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้งในภายหลัง",
        confirmButtonText: "ปิด",
      });
    }
    setText("");
    await mutate("/api/journey");
    setVisitedProvinceArray([]);
    setMapCondition(1);
  }

  const clickHandler = ({ target }:any) => {
    if (target && (mapsData as { features: any[] }).features[target.index]) {
      target.selected(!target.selected());
      setProvinceEn(
        (mapsData as { features: any[] }).features[target.index].properties
          .ADM1_EN
      );
      setProvinceTh(
        (mapsData as { features: any[] }).features[target.index].properties
          .ADM1_TH
      );
    }
  };

  const customizeLayer: ILayerProps["customize"] = useCallback(
    (elements: any) => {
      elements.forEach((element: any) => {
        element.attribute(
          "province",
          (mapsData as { features: any[] }).features[element.index].properties.ADM1_EN
        );
        const province = (mapsData as { features: any[] }).features[element.index].properties.ADM1_EN;
        if (visitedProvinceArray.includes(province)) {
          element.applySettings({
            color: "#B89130",
            hoveredColor: "#DCCAAE",
            selectedColor: "#FFCE85",
            borderColor: "F5F0E8",
          });
        } else {
          element.applySettings({
            color: "#D9D9D9",
            hoveredColor: "#DCCAAE",
            selectedColor: "#FFCE85",
          });
        }
      });
    },
    [visitedProvinceArray, mapCondition]
  );

  const zoomFactorChanged = useCallback(
    (e: VectorMapTypes.ZoomFactorChangedEvent) => {
      setZoomFactor(e.zoomFactor.toFixed(12));
    },
    [setZoomFactor]
  );

  const customizeTooltip: ITooltipProps["customizeTooltip"] = (arg) => {
    if (arg.attribute("province")) {
      setProvinceHover(arg.attribute("province"));
      return { text: `${arg.attribute("province")}` };
    }
    return {text};
  };

  const [mapSize, setMapSize] = useState({ width: 600, height: 800 });

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 400) {
        setMapSize({ width: 350, height: 450 });
      } else {
        setMapSize({ width: 600, height: 800 });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            <div>Thailand progress {visitedProvinceArray.length}/77</div>
            {mapCondition == 0 ? (
              <VectorMap
                id="vector-map"
                center={[100.523186, 13.736717]}
                zoomFactor={25}
                onZoomFactorChanged={zoomFactorChanged}
                onClick={clickHandler}
                width={mapSize.width}
                height={mapSize.height}
              >
                <LoadingIndicator enabled={true}></LoadingIndicator>
                {/* <Size height={800} width={600} /> */}
                <Export enabled={true}></Export>
                <Title text={provincehover}></Title>
                <Layer dataSource={mapsData} customize={customizeLayer}></Layer>
                <Tooltip
                  enabled={true}
                  customizeTooltip={customizeTooltip}
                ></Tooltip>
              </VectorMap>
            ) : (
              <p className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-spin inline-block mr-2"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                    <path
                      fill="currentColor"
                      d="M12 4.5a7.5 7.5 0 1 0 0 15a7.5 7.5 0 0 0 0-15ZM1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12S17.799 22.5 12 22.5S1.5 17.799 1.5 12Z"
                      opacity=".1"
                    />
                    <path
                      fill="currentColor"
                      d="M12 4.5a7.458 7.458 0 0 0-5.187 2.083a1.5 1.5 0 0 1-2.075-2.166A10.458 10.458 0 0 1 12 1.5a1.5 1.5 0 0 1 0 3Z"
                    />
                  </g>
                </svg>
                Loading...
              </p>
            )}
          </div>
          <div className="">
            <div className="bg-[#674F04] lg:size-full w-full h-96 rounded-xl">
              <Modal
                opened={opened}
                onClose={close}
                title="Memory Note"
                centered
                styles={{
                  title: { fontSize: 30 },
                  header: { backgroundColor: "rgba(245, 240, 232 )" },
                  body: { backgroundColor: "rgba(245, 240, 232 )" },
                }}
              >
                <div>
                  <hr className="border-[#674F04] border-1 rounded-full" />
                  <form onSubmit={onSubmit}>
                    <div className="py-5">
                      <p className="font-bold">How about this trip?</p>
                      <div className="flex inline-block">
                        <InputEmoji
                          value={text}
                          onChange={setText}
                          cleanOnEnter
                          placeholder="Select Emoji ->"
                          shouldReturn={false}
                          shouldConvertEmojiToImage={false}
                        />
                      </div>
                    </div>
                    <div className="pb-7">
                      <p className="font-bold">Trip name</p>
                      <input
                        className="ml-2 pl-2 p-2 pr-36 rounded-full "
                        placeholder="name"
                        name="name"
                        id="name"
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="pb-10">
                      <p className="font-bold">Trip note</p>
                      <input
                        className="ml-2 pl-2 p-2 pr-36 rounded-full "
                        placeholder="note!"
                        name="description"
                        id="description"
                        onChange={handleChange}
                        type="text"
                      ></input>
                    </div>
                    <div className="flex justify-center items-center">
                      <button className="bg-[#674F04] text-[#F5F0E8] p-2 px-3 rounded-full">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </Modal>
              <div className="m-10 absolute">
                <div className="text-white text-4xl">{provinceEn}</div>
                <div className="text-white">{provinceTh}</div>
              </div>
              <div dir="rtl">
                <div className="z-10 px-2 py-2 mt-10 mr-10 font-bold inline-flex">
                  <Button
                    onClick={open}
                    variant="filled"
                    color="rgba(245, 240, 232 )"
                    radius="lg"
                  >
                    <p className="text-[#674F04]">Note</p>
                  </Button>
                </div>
              </div>
              <hr className="text-[#F5F0E8]  m-7 border-2 rounded-full" />
              {isLoading ? (
                <p className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="animate-spin inline-block mr-2"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                      <path
                        fill="currentColor"
                        d="M12 4.5a7.5 7.5 0 1 0 0 15a7.5 7.5 0 0 0 0-15ZM1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12S17.799 22.5 12 22.5S1.5 17.799 1.5 12Z"
                        opacity=".1"
                      />
                      <path
                        fill="currentColor"
                        d="M12 4.5a7.458 7.458 0 0 0-5.187 2.083a1.5 1.5 0 0 1-2.075-2.166A10.458 10.458 0 0 1 12 1.5a1.5 1.5 0 0 1 0 3Z"
                      />
                    </g>
                  </svg>
                  Loading...
                </p>
              ) : (
                data?.data &&
                (data?.data.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 flex justify-center align-center gap-2">
                    {data?.data.map(
                      (
                        visitedProvince: visitedProvincedData,
                        index: number
                      ) => {
                        if (visitedProvince.province === provinceEn) {
                          return (
                            <div key={index} className="mx-10">
                              <div
                                className={
                                  "card rounded-md bg-[#E4D7C1] overflow-hidden relative hover:shadow-md p-5"
                                }
                              >
                                <div className="grid grid-cols-3 gap-5 items-center">
                                  <div className="card-col">
                                    <p className="text-5xl font-extrabold ">
                                      {visitedProvince.emoji}
                                    </p>
                                  </div>
                                  <div className="card-col">
                                    <p className="font-bold text-xl mt-3">
                                      {visitedProvince.name}
                                    </p>
                                    <p className=" mt-3">
                                      {visitedProvince.description}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <div className="px-2 py-2 mb-20 font-bold inline-flex absolute top-3 end-2.5 ms-auto justify-center items-center">
                                    <button
                                      onClick={() => onDelete(visitedProvince)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        className="text-[#674F04] w-5 h-5 mt-2"
                                        fill="currentcolor"
                                      >
                                        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      }
                    )}
                  </div>
                ) : (
                  <p className="text-center">ไม่พบข้อมูลแพลนของคุณ</p>
                ))
              )}
            </div>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}
function forceUpdate() {
  throw new Error("Function not implemented.");
}

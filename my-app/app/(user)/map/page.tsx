"use client";

import React from "react";
import { useState } from "react";
import {
  Autocomplete,
  AutocompleteProps,
  Avatar,
  Combobox,
  Group,
  Input,
  InputBase,
  useCombobox,
  Text,
} from "@mantine/core";
import "@mantine/core/styles.css";

const locationType = [
  "Hotel",
  "Point of interest",
  "Spa",
  "Cafe",
  "Aquarium",
  "Art gallery",
  "Zoo",
  "Museum",
  "Church",
  "Shopping Mall",
  "Train Station",
  "Restaurant",
];

export default function page() {
  type resDataType = {
    statusCode: number;
    data?: {
      predictions: any[];
    };
  };

  type resDataTypeGeo = {
    statusCode: number;
    data?: {
      html_attributions: [];
      result: {
        geometry: {
          location: {
            lat: any;
            lng: any;
          };
        };
      };
    };
  };

  type resDataNearby = {
    statusCode: number;
    data?: {
      html_attributions: [];
      results: any;
    };
  };

  const [text, setText] = useState("");
  const [datas, setDatas] = useState<any[]>();
  const [datas1, setDatas1] = useState<any[]>();
  const [location, setLocation] = useState<any[]>(["central world"]);
  const [geo, setGeo] = useState<any[]>();
  const [geoString, setGeoString] = useState("");
  const [nearby, setNearby] = useState<any[]>();
  const [type, setType] = useState("cafe");

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string>("");

  const options = locationType.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  const googleMapAPI = `https://www.google.com/maps/embed/v1/search?key=AIzaSyC6LYgvdJqZ0QLoJXA7XKLHuaqPPzLY1Ac&q=${encodeURIComponent(
    location
  )}+${type}`;
  const googleNeabyLocationAPI =
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&key=AIzaSyC6LYgvdJqZ0QLoJXA7XKLHuaqPPzLY1Ac";

  async function handleChange(e: any) {
    setText(e);
    const resAutocomplete = await fetch(
      `/api/autocomplete/detail?query=${encodeURIComponent(e as string)}`
    );
    if (resAutocomplete.ok) {
      const resData: resDataType = await resAutocomplete.json();
      setDatas(resData.data?.predictions);
      setDatas1(resData.data?.predictions);
      const geoString = geo?.join("%2C");
      if (geoString !== undefined) {
        setGeoString(geoString);
      }
    }
  }
  const newArray = datas?.map((subArray) => subArray.description);
  const nearby_name = nearby?.map((subArray) => subArray.business_status);
  const nearby_status = nearby?.map((subArray) => subArray.name);
  const newArray1 = datas1?.map((subArray) => subArray.place_id)?.[0];

  function locationSet(e: any) {
    setLocation(e);
  }

  async function locationAdd(e: any) {
    setLocation(e);
    const resGeo = await fetch(
      `/api/explore/location-geo?place_id=${encodeURIComponent(
        newArray1 as string
      )}`
    );
    if (resGeo.ok) {
      const resData1: resDataTypeGeo = await resGeo.json();
      setGeo([
        resData1.data?.result.geometry.location.lat,
        resData1.data?.result.geometry.location.lng,
      ]);
    }

    const resNearby = await fetch(
      `/api/explore/nearbysearch?location=${encodeURIComponent(
        geoString as string
      )}&type=${encodeURIComponent(type as string)}`
    );
    if (resNearby.ok) {
      const resData2: resDataNearby = await resNearby.json();
      setNearby(resData2.data?.results);
    }
    console.log(e);
  }
  console.log(datas);
  console.log(newArray);
  console.log(nearby);
  console.log(location);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <div className="bg-[#674F04] w-3/4 h-56 mt-32 mx-32">
            <div className="flex justify-center items-center mt-12">
              <div className="relative max-w-[640px] w-full px-4 mb-10 mt-12">
                <Autocomplete
                  data={newArray}
                  onChange={handleChange}
                  onOptionSubmit={locationAdd}
                />
              </div>
            </div>
            <Combobox
              store={combobox}
              withinPortal={false}
              onOptionSubmit={(val) => {
                setValue(val);
                setType(val.toLowerCase());
                combobox.closeDropdown();
              }}
            >
              <Combobox.Target>
                <InputBase
                  component="button"
                  type="button"
                  pointer
                  rightSection={<Combobox.Chevron />}
                  onClick={() => combobox.toggleDropdown()}
                  rightSectionPointerEvents="none"
                >
                  {value || <Input.Placeholder>Pick value</Input.Placeholder>}
                </InputBase>
              </Combobox.Target>

              <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>
          </div>
          <div>
            <div className="bg-[#9D864F] w-3/4 h-96 my-8 mx-32">
              {nearby && (
                <div className="card bg-[#F5F0E8] py-10">
                  <div className="grid grid-cols-1 ">
                    {nearby.map((datas: any, index: any) => (
                      <div
                        key={index}
                        className="card-top rounded-2xl shadow-md text-[#674F04] bg-[#F5F5F5] pb-5"
                      >
                        <div>{datas.business_status}</div>
                        <div
                          onClick={(val) => {
                            setLocation(datas.name);
                          }}
                        >
                          {datas.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container my-32 mx-auto text-black">
          <iframe
            width="600"
            height="600"
            frameBorder="0"
            src={googleMapAPI}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

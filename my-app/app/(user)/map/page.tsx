
'use client';

import React from 'react'
import { useState } from 'react'
import {Autocomplete, AutocompleteProps, Avatar, Combobox, Group, Input, InputBase, useCombobox, Text} from '@mantine/core';
import '@mantine/core/styles.css';

const locationType = [
  'Hotel',
  'Point of interest',
  'Spa',
  'Cafe',
  'Aquarium',
  'Art gallery',
  'Zoo',
  'Museum',
  'Church',
  'Shopping Mall',
  'Train Station',
  'Restaurant'

];

export default function page() {
  type resDataType = {
    statusCode: number,
    data?:{
      predictions: any[]
    }
  }

  type resDataTypeGeo = {
    statusCode: number,
    data?:{
      html_attributions: [],
      result: any[]
      }
    
  }

  const [text,setText] = useState('')
  const [datas,setDatas] = useState<any[]>()
  const [datas1,setDatas1] = useState<any[]>()
  const [location,setLocation] = useState<any[]>(['central world'])
  const [geo,setGeo] = useState<any[]>()
  const [placeID,setPlaceID] = useState<any[]>()

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string>('');

  const options = locationType.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));


  const googleMapAPI = `https://www.google.com/maps/embed/v1/search?key=AIzaSyC6LYgvdJqZ0QLoJXA7XKLHuaqPPzLY1Ac&q=${location}`
  const googleNeabyLocationAPI = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&key=AIzaSyC6LYgvdJqZ0QLoJXA7XKLHuaqPPzLY1Ac'

  async function handleChange(e: any) {
    setText(e);
    const resAutocomplete = await fetch(`/api/autocomplete/detail?query=${encodeURIComponent((e) as string)}`)
    if (resAutocomplete.ok){
      const resData:resDataType = await resAutocomplete.json()
      setDatas(resData.data?.predictions)
    }
    
  }
  const newArray = datas?.map(subArray => subArray.description);
  const newArray1 = datas1?.map(subArray => subArray.place_id)?.[0];
  console.log(placeID)

  async function locationAdd (e:any) {
    setLocation(e)
    const resAutocomplete = await fetch(`/api/autocomplete/detail?query=${encodeURIComponent((e) as string)}`)
    const resPlaceID = await fetch(`/api/explore/location-geo?place_id=${encodeURIComponent((newArray1) as string)}`)
    if (resAutocomplete.ok){
      const resData:resDataType = await resAutocomplete.json()
      setDatas1(resData.data?.predictions)
    }
    if (resPlaceID.ok){
      const resData1:resDataTypeGeo = await resPlaceID.json()
      setPlaceID(resData1.data?.result)
    }
  }
  // const newArray12 = placeID?.map(subArray => subArray.geometry);
  console.log(datas)
  console.log(newArray)
  console.log(placeID)
  // console.log(newArray12)
  return (
<div>
<div className='grid grid-cols-1 lg:grid-cols-2'>
  <div>
    <div  className='bg-[#674F04] w-3/4 h-56 mt-32 mx-32'>
      <div className='flex justify-center items-center mt-12'>
        <div className='relative max-w-[640px] w-full px-4 mb-10 mt-12'>
          <Autocomplete data={newArray} onChange={handleChange} onOptionSubmit={locationAdd}/>
        </div>
      </div>
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
          setValue(val);
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
      <div  className='bg-[#9D864F] w-3/4 h-96 my-8 mx-32'>
        test
      </div>
    </div>
  </div>
        <div className='container my-32 mx-auto text-black'>
          <iframe
            width="600"
            height="600"
            frameBorder="0"
            src={googleMapAPI}
            >
          </iframe>
        </div>
      </div>
    </div>

  )
}




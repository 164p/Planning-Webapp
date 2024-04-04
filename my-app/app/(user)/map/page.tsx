'use client';

import React from 'react'
import { useState } from 'react'
import {Autocomplete, Combobox, Input, InputBase, useCombobox} from '@mantine/core';
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

  type resDataType1 = {
    statusCode: number,
    data?:{
      results: any[]
    }
  }

  type resDataType2 = {
    statusCode: number,
    data?:{
      results:{
        geometry:{
          location: any[]
        }
      }
    }
  }
  const [text,setText] = useState('')
  const [datas,setDatas] = useState<any[]>()
  const [nearby,setNearby] = useState<any[]>()
  const [location,setLocation] = useState<any[]>(['central world'])
  const [placeGeo,setPlaceGeo] = useState<any[]>()

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string>('');

  const options = locationType.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  const locationAdd = (e:any) => {
    setLocation(e)
  }

  const googleMapAPI = `https://www.google.com/maps/embed/v1/search?key=AIzaSyC6LYgvdJqZ0QLoJXA7XKLHuaqPPzLY1Ac&q=${location}`

  const googleNeabyLocationAPI = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&key=AIzaSyC6LYgvdJqZ0QLoJXA7XKLHuaqPPzLY1Ac'
  async function handleChange(e: any) {
    setText(e);
    const resAutocomplete = await fetch(`/api/autocomplete/detail?query=${encodeURIComponent((e) as string)}`)
    const resNearby = await fetch(`/api/explore/location?query=${encodeURIComponent((e) as string)}?types=${value.replace(/\s+/g, '_').toLowerCase()}`)
    const resGeo = await fetch(`/api/explore/location-geo?query=${encodeURIComponent((e) as string)}`)
    if (resAutocomplete.ok){
      const resData:resDataType = await resAutocomplete.json()
      setDatas(resData.data?.predictions)
      const resGeoData:resDataType2 = await resGeo.json()
      setPlaceGeo(resGeoData.data?.results.geometry.location)
      const resNearbyData:resDataType1 = await resNearby.json()
      setNearby(resNearbyData.data?.results)
    }
    
  }
  const newArray = datas?.map(subArray => subArray.structured_formatting.main_text);
  return (
<div>
<div className='grid grid-cols-1 lg:grid-cols-2'>
  <div>
    <div  className='bg-[#674F04] w-3/4 h-56 mt-32 mx-32'>
      <div className='flex justify-center items-center mt-12'>
        <div className='relative max-w-[640px] w-full px-4 mb-10 mt-12'>
          <Autocomplete data={newArray} value={text} onChange={handleChange} onOptionSubmit={locationAdd}/>
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



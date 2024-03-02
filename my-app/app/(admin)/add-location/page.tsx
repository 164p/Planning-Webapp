'use client'
import { useState, Fragment } from 'react'
import { Combobox } from '@headlessui/react'
import useSWR from 'swr'

const fetcher = (url : string) => fetch(url).then(r => r.json())

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
]

export default function MyCombobox() {

  const { data, error, isLoading } = useSWR('/api/autocomplete', fetcher)
  const [selectedPerson, setSelectedPerson] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? data.data.predictions
      : data.data.predictions.filter((place:any) => {
          return place.description.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <div className='text-[#674F04] text-6xl pt-60 p-10 text-center font-medium'>
            <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Input
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(place:any) => place.description}
      />
      <Combobox.Options>
        {filteredPeople.map((place:any) => (
          /* Use the `active` state to conditionally style the active option. */
          /* Use the `selected` state to conditionally style the selected option. */
          <Combobox.Option  value={place} as={Fragment}>
            {({ active, selected }) => (
              <li
                className={`${
                  active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                }`}
              >
                {place.description}
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
    </div>

  )
}

// import useSWR from 'swr'

// import React, { useState, useEffect } from 'react';

// const fetcher = (url : string) => fetch(url).then(r => r.json())

// export default function Page() {
//   const { data, error, isLoading } = useSWR('/api/placedetail', fetcher)
//   if (error) return <div>failed to load</div>
//   if (isLoading) return <div>loading...</div>
//   return (
//     <div className={`font-nunito bg-gray-100`}>
//       <div className='w-11/12 m-auto mt-40 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 md:gap-0'>
//       </div>
//       <div className={`font-nunito bg-gray-100`}>
//         hello {data.data.result.name}
//       </div>
// </div>
// );
// }

import { useState, Fragment } from 'react'
import { Combobox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'

const provincetag = [
  { name: 'กทม' },
  { name: 'เชียงใหม่' },
  { name: 'ฮ่องกง' },
  { name: 'ชลบุรี' },
  { name: 'ตาก' },
]

export default function Provincefilter() {
  const [selectedPerson, setSelectedPerson] = useState(provincetag[0])
  const [query, setQuery] = useState('')

  const filteredprovincetag =
    query === ''
      ? provincetag
      : provincetag.filter((pvtag) => {
          return pvtag.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Input className='w-full h-12 shadow p-4 rounded-full text-black'
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(pvtag:any) => pvtag.name}
      />
      <Combobox.Options>
        {filteredprovincetag.map((pvtag) => (
          /* Use the `active` state to conditionally style the active option. */
          /* Use the `selected` state to conditionally style the selected option. */
          <Combobox.Option key={pvtag.name} value={pvtag} as={Fragment}>
            {({ active, selected }) => (
              <li
                className={`${
                  active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                }`}
              >
                {selected}
                {pvtag.name}
              </li>
            )}
          </Combobox.Option> 
        ))}
      </Combobox.Options>
    </Combobox>
  )
}
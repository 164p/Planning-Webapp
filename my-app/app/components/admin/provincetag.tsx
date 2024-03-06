import { Combobox } from "@headlessui/react";
import { useState } from "react";

export default function MyCombobox() {
   
    const data = ['One', 'Two', 'Three', 'Four', 'Five']; 
    const [selectedPerson, setSelectedPerson] = useState('')
    const [query, setQuery] = useState('')
    
      return (
        <div className='text-[#674F04] text-6xl pt-60 p-10 text-center font-medium'>
            <Combobox value={selectedPerson} onChange={setSelectedPerson}>
                <Combobox.Input
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(place:any) => place.description}
                />
            <Combobox.Options>
                {data.map((place:any) => (
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
    
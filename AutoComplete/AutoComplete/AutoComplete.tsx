"use client";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useRef, useState } from "react";

const people = [
  { id: 1, label: "Leslie Alexander" },
  { id: 2, label: "Hunter McCarthy" },
  { id: 3, label: "Test name 3" },
  { id: 4, label: "test name 2" },
  { id: 5, label: "Test name 1" },
  // More users...
];


const styles = {
  input: {
    className: "",
  },
};
const placeholder = "Placeholder text";
const AutoComplete = () => {



  const handleOpenChange = () => {
    setIsOpen(!isOpen)
  }
  
  const [isOpen, setIsOpen] = useState(false)



  return (
    // Wrapper for the outer container
    <div
      style={{ width: "600px", height: "600px" }}
      className="flex justify-center bg-gray-100 p-8"
    >
      {/* content wrapper for the whole content */}
      <div className="flex flex-col">
        {/* Label above the input for the combo box */}
        <label className="block text-sm/6 font-medium text-gray-900 text-left">
          Label text here
        </label>
        
        {/* Wrapper for the input and down button */}
        <div className="relative mt-2" style={{whiteSpace : 'nowrap'}} onClick={() => handleOpenChange()}>

        {/* Text input to act as combo box */}
        <input
          type="text"
          aria-placeholder="Placeholder"
          className="block w-full rounded-md bg-red py-1.5 text-base text-gray-900 border border-solid border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          ></input>
{/* Chevron down icon */}
<button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden" style={{width: '35px', visibility: isOpen ? 'hidden' : 'visible'}}>
    <ChevronDownIcon />
</button>

<button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden" style={{width: '35px', visibility: isOpen ? 'visible' : 'hidden'}}>
    <ChevronUpIcon />
</button>

          </div>

          <div style={{visibility : isOpen ? 'visible' : 'hidden'}}>
            VISIBLE
          </div>


      </div>
    </div>
  );
}

export default AutoComplete
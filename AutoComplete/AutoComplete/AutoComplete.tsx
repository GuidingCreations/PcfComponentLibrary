"use client";

import { ClassNames } from "@emotion/react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import React, {  useState, useRef, useEffect } from "react";

// Test data



// Interface for props

export interface AutoCompleteProps {
  DarkMode: boolean;
  height: number;
  width: number;
  options: any[];
  labelText: string;
  AllowMultipleSelect: boolean;
}



const placeholder = "Placeholder text";
const AutoComplete = (props: AutoCompleteProps) => {

  const people : any[] = [
    { id: 1, label: "Leslie Alexander", classNames: '' },
    { id: 2, label: "Hunter McCarthy", classNames: '' },
    { id: 3, label: "Test name 3", classNames: '' },
    { id: 4, label: "test name 2", classNames: '' },
    { id: 5, label: "Test name 1", classNames: '' },
    // More users...
  ];

  const [optionsList, setOptionsList] = useState<any[]>(people);
  const [selectedValues, setSelectedValues] = useState<any[]>([])


  //Handle when an option is selected

  const handleOptionSelect = (e : any) => {

    const target = e.target as HTMLElement;
    const targetValue = target.dataset.value

    if (props.AllowMultipleSelect) {
      if (selectedValues.includes(targetValue)) {
        console.log("ALREADY THERE")
        setSelectedValues(selectedValues.filter((value) => value != targetValue))
      } else {
        console.log("NOT INCLUDED")
        setSelectedValues([...selectedValues, targetValue])
      }
    }
    console.log("NEW SELECTED VALUES", selectedValues)

  }

  //Filters options list when text input changes

  const changeFilterText = (e : any) => {
    console.log(
      "EVENT", e.target.value
    )
    setOptionsList( people.filter( (person : any) => person.label.toLowerCase().includes(e.target.value.toLowerCase()) ))
  }


  //Styling

  const classes = {
    input: {
      className: `pl-1 ${props.DarkMode ? "block w-full rounded-md py-1.5 text-base text-white bg-gray-900 border border-solid border-white" : 'block w-full rounded-md py-1.5 text-base text-gray-900 border border-solid border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 bg-white'}`
    },
    label: {
      ClassNames: props.DarkMode ? 'block text-sm/6 font-medium text-white text-left' : "block text-sm/6 font-medium text-gray-900 text-left"
    },
    icon: {
      classNames: props.DarkMode? 'fill-white' : "fill-black"
    },
    optionsWrapper: {
      classNames: props.DarkMode ? 'bg-black mt-1 max-h-60 w-full flex flex-col overflow-auto rounded-md py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden sm:text-sm' : 'mt-1 max-h-60 w-full flex flex-col overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden sm:text-sm'
    },
    
  };

  const generateItemStyles = () => {
      optionsList.map( (option) => {
        
        if (selectedValues.includes(option.label)) {

          option.classNames = `py-2 pr-9 pl-3 text-left hover:text-bold ${props.DarkMode ? "bg-black hover:bg-white text-white hover:text-black hover:text-semibold": `text-white bg-blue-700`}`
        } else {
          option.classNames = `py-2 pr-9 pl-3 text-left hover:text-bold ${props.DarkMode ? "bg-black hover:bg-white text-white hover:text-black hover:text-semibold": `hover:bg-blue-700 hover:text-white`}`
        }
        
      })
  }

  generateItemStyles()

  useEffect(() => {
    generateItemStyles();
    console.log("GENERATED")
  }, [selectedValues])


  const handleOpenChange = () => {
    setIsOpen(!isOpen)
  }
  
  const [isOpen, setIsOpen] = useState(false)
  const listRef : any = useRef(null);
  const inputRef : any= useRef(null);
  const iconRef : any = useRef(null);
  const buttonRef : any = useRef(null);

  //Use ref to establish event listener to hide options list when user clicks away

  useEffect(() => {
    const handleClickOutside = (event : any) => {
      if (
        listRef.current && 
        !listRef.current.contains(event.target) && 
        !inputRef.current.contains(event.target) &&
        !iconRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    // Wrapper for the outer container
    <div
      style={{ width: "600px", height: "600px" }}
      className={`flex justify-center ${props.DarkMode ? 'bg-gray-900' : 'bg-gray-100'} p-8`}
    >
      {/* content wrapper for the whole content */}
      <div className="flex flex-col">
        {/* Label above the input for the combo box */}
        <label className={classes.label.ClassNames}>
          Label text here
        </label>
        
        {/* Wrapper for the input and down button */}
        <div className="relative mt-2" style={{whiteSpace : 'nowrap'}} onClick={() => handleOpenChange()}>

        {/* Text input to act as combo box */}
        <input
        ref={inputRef}
          type="text"
          className={classes.input.className}
          onChange={changeFilterText}
          ></input>
{/* Chevron down icon */}
<button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden" style={{width: '35px', visibility: isOpen ? 'hidden' : 'visible'}} ref={iconRef}>
    <ChevronDownIcon className={classes.icon.classNames}/>
</button>

<button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden fill-white " style={{width: '35px', visibility: isOpen ? 'visible' : 'hidden'}} ref={buttonRef}>
    <ChevronUpIcon className={classes.icon.classNames} ref={iconRef}/>
</button>

          </div>

          <div style={{visibility : isOpen ? 'visible' : 'hidden', }} ref = {listRef} className={classes.optionsWrapper.classNames}>
            
            {optionsList.map( (option : any) => {
               return <label data-value={option.label}  key={option.label} className={option.classNames} onClick={handleOptionSelect}>{option.label}</label>
            })}
          </div>


      </div>
    </div>
  );
}

export default AutoComplete
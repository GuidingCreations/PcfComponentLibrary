"use client";

import { ClassNames } from "@emotion/react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, XMarkIcon } from "@heroicons/react/20/solid";
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
  data: any[];
  setSelectedRecords: (ids: any[]) => void;
  defaultSelectedValues: string[]
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
  console.log('PROPS DATA', props.data)

  const [optionsList, setOptionsList] = useState<any[]>(props.data);
  console.log("DEFAULT SELECTED VALUES", props.defaultSelectedValues)
  const [selectedValues, setSelectedValues] = useState<any[]>(props.defaultSelectedValues)
 console.log("SELECTED VALUES FROM DEFAULT", selectedValues)
  const masterList : any[] = []
  props.data.forEach((item) => {
    masterList.push(item)
  })
  console.log("MASTER LIST", masterList)

  console.log("OPTIONS: ", optionsList)

  if (optionsList.length == 0) {
    masterList.forEach((item) => {
      optionsList.push(item)
    })
  }
  //Handle when an option is selected

  const handleOptionSelect = (targetValue : any) => {

    console.log("CURRENT SELECTED VALUES", selectedValues)
    console.log("OPTION SELECTED", targetValue)
    

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
    setOptionsList( masterList.filter( (item : any) => item.label.toLowerCase().includes(e.target.value.toLowerCase()) ));
    console.log("FILTERED OPTIONS LIST", optionsList)
  }


  //Styling

  const classes = {
    input: {
      className: `pl-1 ${props.DarkMode ? "relative mt-2 w-full rounded-md py-1.5 text-base text-white bg-gray-900 border border-solid border-white" : 'relative mt-2 w-full rounded-md py-1.5 text-base text-gray-900 border border-solid border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 bg-white'}`
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
    console.log("NEWLY SELECTED VALUES", selectedValues)
    props.setSelectedRecords(selectedValues)
    console.log("GENERATED")
  }, [selectedValues])


  const handleOpenChange = () => {
    setIsOpen(!isOpen)
  }
  
  const [isOpen, setIsOpen] = useState(false)
  const listRef : any = useRef(null);
  const inputRef : any= useRef(null);
  const iconRef : any = useRef(null);
  const iconDownRef : any = useRef(null);
  const buttonRef : any = useRef(null);
  const chipRef: any = useRef(null)
  const xMarkRef: any = useRef(null)
  //Use ref to establish event listener to hide options list when user clicks away

  useEffect(() => {
    const handleClickOutside = async (e : any) => {
      console.log("CLICKED")
      console.log("e", e);
      console.log("e TARGET", e.target);
      console.log("DATA CHIP", e.target.dataset.chip)
      console.log("icon down ref", iconDownRef)
      if (e.target.dataset.chip) {
        console.log("TARGETED VALUE", e.target.dataset.value);
        console.log("SELECTED VALUESS", selectedValues)
        handleOptionSelect(e.target.dataset.value)
      }

      if (
        listRef.current && 
        !listRef.current.contains(e.target) && 
        !inputRef.current.contains(e.target) 
        && !iconRef.current.contains(e.target) 
        && !iconDownRef.current.contains(e.target) 
        // !buttonRef.current.contains(e.target) && 
        // !chipRef.current.contains(e.target) &&
        // !xMarkRef.current.contains(e.target)
      ) {
        console.log("CLOSING")
        setIsOpen(false);
      } else {
        console.log("CLICK EXCLUDED");
        if (e.target.dataset.action == 'open') {
          setIsOpen(true)
        }
      }

    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedValues, isOpen]);


  return (
    // Wrapper for the outer container
    <div
      style={{ width: props.width, height: props.height }}
      className={`flex justify-center p-8`}
    >
      {/* content wrapper for the whole content */}
      <div className="flex flex-col">
        
        {/* Label above the input for the combo box */}
        <label className={classes.label.ClassNames}>
          Label text here
        </label>
        
        {/* Wrapper for the input, chevron up/down icon, and list of selected values */}
        <div className={classes.input.className}>

      {/* wrapper for input and selected values */}
        <div style={{display: "flex", flexWrap: "wrap", width: props.width, maxWidth: props.width}}>

      {/* Wrapper for chips for selected values */}

      <div className="flex flex-wrap gap-1" style={{alignItems: 'center'}}>
        {selectedValues?.map((value) => {
          return ( 
          <div key={value} className='bg-blue-700 text-white border border-solid rounded-md p-1 flex gap-1 pointer' style={{height: '35px', maxHeight:'35px', alignItems: 'center'}} ref={chipRef} data-value = {value} data-chip={true}>
          <label style={{height: '35px', maxHeight: '35px', alignItems: 'center'}} className="flex">
            {value}
          </label>

          <XMarkIcon fill='white' cursor={'pointer'}  data-value={value} width={'1rem'} ref={xMarkRef} className="pointer"/>
            </div>)
        })}
      </div>
        {/* Text input to act as combo box */}
        <input
        ref={inputRef}
          type="text"
          style={{width: props.width, outline: 'none'}}
          onChange={changeFilterText}
          onClick={() => handleOpenChange()}
          placeholder="Enter search text here"
          ></input>
          </div>
        

{/* Chevron down icon */}
<button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden ml-1" style={{width: '35px', visibility: isOpen ? 'hidden' : 'visible'}} ref={iconDownRef} data-action='open'>
    
    <ChevronDownIcon className={classes.icon.classNames} />
</button>

<button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 h-full focus:outline-hidden fill-white ml-1 " style={{width: '35px', visibility: isOpen ? 'visible' : 'hidden'}} ref={buttonRef}>
    <ChevronUpIcon className={classes.icon.classNames} ref={iconRef} onClick={() => handleOpenChange()}/>
</button>
        </div>


          <div style={{visibility : isOpen ? 'visible' : 'hidden', overflow: 'visible'}} ref = {listRef} className={classes.optionsWrapper.classNames}>
            
            {optionsList.map( (option : any) => {
               return <label data-value={option.label}  key={option.label} className={option.classNames} onClick={() => handleOptionSelect(option.label)}>{option.label}</label>
            })}
          </div>


      </div>
    </div>
  );
}

export default AutoComplete
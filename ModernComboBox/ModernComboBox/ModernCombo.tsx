import React, { useState, useEffect, useRef } from "react";
import ChipList from "../../ChipList/ChipList/ChipList";

export interface ModernComboProps {
  width?: number;
  height?: number;
  DarkMode?: boolean;
  labelText?: string;
  useTestData?: boolean;
  items: any[];
  setSelectedRecords: (records: any[]) => void;
  AllowSelectMultiple: boolean;
}

const ModernCombo = (props: ModernComboProps) => {
  
  const testData = [
    { label: "Blue springs (Volusia)", chipBackgroundColor: 'blue', chipTextColor: 'white' },
    { label: "Ginnie Springs", chipBackgroundColor: 'orange', chipTextColor: 'white' },
    { label: "Royal Springs", chipBackgroundColor: 'green', chipTextColor: 'white' },
    { label: "Alexander Springs", chipBackgroundColor: 'red', chipTextColor: 'white' },
    { label: "Three Sisters Springs", chipBackgroundColor: 'black', chipTextColor: 'white' },
  ];
  const testDefaultSelectedValues : any[] = [
    // { label: "label 3" },
    // { label: "label 4" },
  ];

const hasItemsPassed = props.items.length > 0;
const ItemsHaveAtLeastOneLabel = props.items.some(obj => 'label' in obj);
const optionsList = props.useTestData ? testData : ( !hasItemsPassed ? [{label: "NO DATA"}] : (ItemsHaveAtLeastOneLabel ? props.items : [{label: "NO LABEL COLUMN SELECTED"}])   )

  const [filterText, setFilterText] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<any[]>(testDefaultSelectedValues);
  
    const handleOptionSelect = (value: any) => {
      
      if (!props.AllowSelectMultiple) {
        setIsOpen(false)
      }

      if (selectedValues.some((item) => item.label == value.label)) {
        console.log("ALREADY SELECTED");
        setSelectedValues(
          selectedValues.filter((item) => item.label != value.label)
        );
      } else {
        console.log("NOT SELECTED YET");

        if (props.AllowSelectMultiple) {

          setSelectedValues([...selectedValues, value]);
        } else {
          setSelectedValues([value])
        }

      }
      console.log("NEW SELECTED VALUES", selectedValues);
    };

  const handleDestroyChip = (option: any) => {
    console.log("DESTROY CHIP TRIGGERED");
    handleOptionSelect(option);
  };

  const handleFilterTextChange = (value: string) => {
    console.log("NEW FILTER TEXT", value)
    setIsOpen(true);
    setFilterText(value)
  }

  const optionsWrapperRef = useRef<any>(null)
  const inputRef = useRef<any>(null)
  const buttonRef = useRef<any>(null)
 
useEffect(() => {
  props.setSelectedRecords(selectedValues)
}, [selectedValues])

  useEffect(() => {
    const handleClickOutside = async (e : any) => {
      e.stopPropagation();
      
      console.log("EVENT", e);
      console.log("INPUT REF", inputRef.current);
      console.log("OPTIONS WRAPPER REF", optionsWrapperRef.current);

      if (
        !optionsWrapperRef.current.contains(e.target) && 
        !inputRef.current.contains(e.target) && 
        !buttonRef.current.contains(e.target) 
      ) {
        console.log("CLOSING")
        if(e.target.dataset.type == "downIcon") {
          console.log("OPEN ACTUALLY")
          setIsOpen(true)
        } else {
          setIsOpen(false)
        }
      } else {
        console.log("CLICK EXCLUDED");
        
      }

    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    // wrapper for entire component
    <div
      className="p-1 relative"
      style={{ width: props.width == undefined ? 300 : props.width }}
    >
      {/* wrapper for the upper section */}
      <div className={`border border-solid border-black rounded-md bg-white justify-center pl-1 pr-2 flex`} style={{width: props.width, minHeight: props.height}}>
        {/* wrapper for chips and input */}
        <div className="flex-grow">

        {selectedValues.length > 0 ? (
          
          // Chip list wrapper
          <div className="mt-2">

          <ChipList
            chipHeight={25}
            chipFontSize="10px"
            data={selectedValues}
            onDestroyChip={handleDestroyChip}
            />

          </div>) : ("")}

         {selectedValues.length > 0 || isOpen || filterText.length > 0 ? 
         <label style={{position:  'absolute', top: `-.5rem`, left: '1rem', backgroundColor: 'white'}}>{props.labelText || 'Label text'}</label> : ''}

       
        <input
          type="text"
          className={`border-none focus:outline-none p-1 ${selectedValues.length > 0  || isOpen || filterText.length > 0 ? ' mt-1' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          onChange={(e) => handleFilterTextChange(e.target.value)}
          placeholder={selectedValues.length > 0  || isOpen ? `Search for ${props.labelText}` : props.labelText}
          ref = {inputRef}
          style={!props.AllowSelectMultiple && selectedValues.length > 0? {display: 'none'} : {}}
          ></input>
        </div>
        {/*  up/down icons */}

                 
          <button style={!isOpen ? {display: 'block'} : {display: 'none'}} ref={buttonRef}>
          <svg width="1rem" height="1rem" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" data-type ={'downIcon'} onClick={() => setIsOpen(true)}>
 <path d="m967.68 453.03c9.7578-9.7617 9.7578-25.59 0-35.355l-35.355-35.355c-9.7656-9.7617-25.594-9.7617-35.355 0l-296.97 296.97-296.97-296.97c-9.7617-9.7617-25.59-9.7617-35.352 0l-35.355 35.355c-9.7656 9.7656-9.7656 25.594 0 35.355l350 350c9.7578 9.7656 25.59 9.7656 35.355 0z" fillRule="evenodd"/>
</svg>

          </button>

          <button  style={isOpen ? {display: 'block'} : {display: 'none'}}>
          <svg width="1rem" height="1rem" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
          <path d="m931.78 776.81c17.578-17.578 17.578-46.078 0-63.609l-300-300.05c-17.578-17.531-46.078-17.531-63.656 0l-300 300.05c-17.578 17.531-17.578 46.031 0 63.609s46.078 17.578 63.656 0l268.18-268.18 268.18 268.18c17.578 17.578 46.078 17.578 63.656 0z" fillRule="evenodd"/>
</svg>

          </button>
          
    
      </div>

      {/* wrapper for options list */}
      <div className="pr-2" ref ={optionsWrapperRef}>
        <div
          className={`${
            isOpen ? "visible" : "hidden"
          } flex flex-col border border-solid mt-2 bg-white border-black fixed`}
          style={{ width: props.width == undefined ? 300 : props.width * 0.97 }}
        >

{optionsList.filter((item: any) => item.label.toLowerCase().includes(filterText.toLowerCase())).map((item: any) => {
            const isInSelectedValues = selectedValues.some(
              (option) => option.label == item.label
            );
            return (
              <div
                key={item?.label}
                className={` ${
                  isInSelectedValues ? "bg-blue-700 text-white" : ""
                }  flex hover:bg-blue-500 hover:text-white p-1 gap-2 pl-4`}
                onClick={() => handleOptionSelect(item)}
              >

                <input type="checkbox" className="w-5" checked={isInSelectedValues}></input>
                <label className="hover:text-white flex-grow text-left" >{item?.label}</label>
              </div>
            );
          })

        }

        </div>
      </div>
    </div>
  );
};

export default ModernCombo;

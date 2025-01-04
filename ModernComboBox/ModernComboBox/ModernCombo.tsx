import React, { useState, useEffect, useRef } from "react";
import ChipList from "../../ChipList/ChipList/ChipList";

export interface ModernComboProps {
  width?: number;
  height?: number;
  DarkMode?: boolean;
  labelText?: string;
  useTestData?: boolean;
  items: any[];
}

const ModernCombo = (props: ModernComboProps) => {
  const testData = [
    { label: "Blue springs (Volusia)" },
    { label: "Ginnie Springs" },
    { label: "Royal Springs" },
    { label: "Alexander Springs" },
    { label: "Three Sisters Springs" },
  ];

  console.log("TEST DATA", testData)

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
      if (selectedValues.some((item) => item.label == value.label)) {
        console.log("ALREADY SELECTED");
        setSelectedValues(
          selectedValues.filter((item) => item.label != value.label)
        );
      } else {
        console.log("NOT SELECTED YET");
        setSelectedValues([...selectedValues, value]);
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
 


  useEffect(() => {
    const handleClickOutside = async (e : any) => {
      e.stopPropagation();
      
      console.log("EVENT", e);
      console.log("INPUT REF", inputRef.current);
      console.log("OPTIONS WRAPPER REF", optionsWrapperRef.current);

      if (
        !optionsWrapperRef.current.contains(e.target) && 
        !inputRef.current.contains(e.target) 
      ) {
        console.log("CLOSING")
        setIsOpen(false)
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
      <div className={`border border-solid border-black rounded-md bg-white justify-center pl-1`} style={{width: props.width, minHeight: props.height}}>
        {selectedValues.length > 0 ? (
          <div className="mt-2">

          <ChipList
            chipHeight={25}
            chipFontSize="10px"
            data={selectedValues}
            onDestroyChip={handleDestroyChip}
            
            />
            </div>
        ) : (
          ""
        )}
         {selectedValues.length > 0 || isOpen || filterText.length > 0 ?
        <label style={{position:  'absolute', top: `-.5rem`, left: '1rem', backgroundColor: 'white'}}>{props.labelText || 'Label text'}</label> : ''}

       
        <input
          type="text"
          className={`border-none focus:outline-none p-1 ${selectedValues.length > 0  || isOpen || filterText.length > 0 ? ' mt-1' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          onChange={(e) => handleFilterTextChange(e.target.value)}
          placeholder={selectedValues.length > 0  || isOpen ? `Search for ${props.labelText}` : props.labelText}
          ref = {inputRef}
        
        ></input>
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

          /* {props.useTestData ? 
          
          testData.filter((item: any) => item.label.toLowerCase().includes(filterText.toLowerCase())).map((item: any) => {
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

          : 
          props.items?.filter((item: any) => item.label?.toLowerCase().includes(filterText.toLowerCase())).map((item: any) => {
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
          } */}

        </div>
      </div>
    </div>
  );
};

export default ModernCombo;

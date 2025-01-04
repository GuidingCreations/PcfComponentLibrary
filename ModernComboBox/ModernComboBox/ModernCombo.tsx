import React, {useState, useEffect} from 'react'
import ChipList from '../../ChipList/ChipList/ChipList'

export interface ModernComboProps {
  width?: number;
  DarkMode?: boolean;
}



const ModernCombo = (props: ModernComboProps) => {

  

  const testData = [
    {label: 'label 1'},
    {label: 'label 2'},
    {label: 'label 3'},
    {label: 'label 4'},
    {label: 'label 5'}
  ]

  const testDefaultSelectedValues = [
    {label: 'label 3'},
    {label: 'label 4'}
  ]

  const [isOpen, setIsOpen] = useState(false)
  const [selectedValues, setSelectedValues] = useState<any[]>(testDefaultSelectedValues)

  const handleDestroyChip = (option : any) => {
    console.log("DESTROY CHIP TRIGGERED")
    handleOptionSelect(option)
  }


const handleOptionSelect = (value : any) => {

 if (selectedValues.some(item => item.label == value.label)) {
  console.log("ALREADY SELECTED")
  setSelectedValues(selectedValues.filter((item) => item.label != value.label))
 } else {
  console.log("NOT SELECTED YET")
  setSelectedValues([...selectedValues, value])
 }
 console.log("NEW SELECTED VALUES", selectedValues)
}


  return (
    // wrapper for entire component
    <div className='p-1 relative' style={{width: props.width == undefined ? 300 : props.width}}>
     
     {/* wrapper for the upper section */}
     <div className= {`border border-solid border-black rounded-md bg-white`} >
      {selectedValues.length > 0 ? 
      
      <ChipList
      chipHeight={25}
      chipFontSize='10px'
      data={selectedValues}
      onDestroyChip={handleDestroyChip}
      /> : ''
    }
      <input type='text' className='border-none focus:outline-none p-1' onClick={() => setIsOpen(!isOpen)} placeholder='Search text here'></input>

     </div>

     {/* wrapper for options list */}
    <div className='pr-2'>

    <div className={`${isOpen ? 'visible' : 'hidden'} flex flex-col border border-solid mt-2 bg-white border-black fixed`} style={{width: props.width == undefined ? 300 : props.width * .97}}>
        {
          testData.map( (item : any) => {
            const isInSelectedValues = selectedValues.some(option => option.label == item.label)
            return <div key={item?.label } className= {` ${isInSelectedValues ? 'bg-blue-700 text-white' : ''}   hover:bg-blue-500 hover:text-white p-1`} onClick={() => handleOptionSelect(item)}> <label  className='hover:text-white'>{item?.label}</label> </div>
          })
        }
    </div>
    </div>


    </div>

  )
}

export default ModernCombo
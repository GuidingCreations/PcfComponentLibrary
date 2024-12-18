//Imports

import * as React from 'react';
import Select, {SelectChangeEvent} from '@mui/material/Select'
import { FormControl, OutlinedInput } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Theme, useTheme } from '@mui/material/styles';

// Create interface for props

export interface ComboBoxProps {
  data: any;
  setSelectedRecords: (ids: string[]) => void;
}

// Initiate component

const ComboBoxComponent = (props : ComboBoxProps) => {

  // Create function for determining dynamic styling of items

  function generateItemStyles( value: any, selectedValues: any[], theme: Theme) {

    return {
      fontWeight: selectedValues.includes(value)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular
    }

  }

// Declare some variables
  
    const theme = useTheme()
    const displayColumn = "Name"
  
    const [selectedValues, setSelectedValues] = React.useState<string[]>([])
    React.useEffect(() => {
        
      const selectedItems = props.data.filter((item : any) => selectedValues.includes(item[displayColumn]))
      console.log('SELECTED ITEMS');
      console.table(selectedItems);
      const selectedItemIds = selectedItems.map( (item : any) => props.data.findIndex((dataItem : any) => dataItem.id == item.id ));
      console.log('Selected item IDS', selectedItemIds)
      props.setSelectedRecords(selectedItemIds);
      // console.log("NEW SELECTED VALUES");
      // console.table(selectedValues);
      

    }, [selectedValues])
    
    
//Function for handling the selection of an item
    const handleNewSelection = async (e : any) => {
      
      console.log('event', e);
      console.log('target', e.target)

// if the array is empty

      console.log('current values');
      console.table(selectedValues);

      const newSelection = e.target.value
      console.log('new selection');
      console.table(newSelection); 

      setSelectedValues(newSelection);

      
      
      
      
    
  }

    return (

      <FormControl fullWidth>
        
        <InputLabel id="TestLabelID">
          Name
        </InputLabel>

        <Select
        labelId='1'
        label = "ComboBox Label"
        multiple
        value= {selectedValues}
        name='Test Name'
        onChange={handleNewSelection}
        input={<OutlinedInput label = "Name"/>}
        >
            {props.data.map((item : any) => {
              return (
              <MenuItem 
                value = {item[displayColumn]} 
                key= {item[displayColumn]}
                style={generateItemStyles(item[displayColumn], selectedValues, theme)}
                >
                
                {item[displayColumn]}
              
              </MenuItem>
              )
            })}
        </Select>
      </FormControl>

      /*<button
      onClick={() => {
        
        console.log("DATA" + this.props.data[0][displayColumn]);
        
      }}
      >
hhhhhhh
      </button>*/
    )
  }

  export default ComboBoxComponent
//Imports

import * as React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, OutlinedInput } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Theme, useTheme } from "@mui/material/styles";

// Create interface for props

export interface ComboBoxProps {
  data: any;
  setSelectedRecords: (ids: string[]) => void;
  displayField: string;
  height: number;
  width: number;
  labelText: string;
  AllowSelectMultiple: boolean;
  backgroundColorOverride?: string;
  labelTextColor?: string;
  listItemHoverBackgroundColor: string;
  listItemHoverTextColor: string;
  
}


// Initiate component

const ComboBoxComponent = (props: ComboBoxProps) => {
  // Create function for determining dynamic styling of items
  
  const selectStyles = {'--placeholder-color': 'red',width: props.width,
    height: props.height,
    backgroundColor: props.backgroundColorOverride != '' ? props.backgroundColorOverride : '' } as React.CSSProperties

  function generateItemStyles(value: any, selectedValues: any[], theme: Theme) {
    return {
      fontWeight: selectedValues.includes(value)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
      width: props.width,
      '--background-color': props.listItemHoverBackgroundColor == '' ? '' : props.listItemHoverBackgroundColor,
      '--hover-text-color': props.listItemHoverTextColor,
      theme
      
    } as React.CSSProperties;
  }

  // Declare some variables

  const theme = useTheme();
  const displayColumn = props.displayField;

  // Create the state we will use to store the selected values

  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  console.log("INITIAL SELECTED VALUES", selectedValues);

  // Hook we will call whenever selectedValues is updated to pass new values back to the component

  React.useEffect(() => {
    
    // Pass selected values to forumla from manifest to execute from there

    props.setSelectedRecords(selectedValues)

  }, [selectedValues]);

  //Function for handling the selection of an item
  
  const handleNewSelection = async (e: any) => {
  
    // Set selectedValues to target - includes logic from switching between multiple and single select
console.log('SELECTED: ', e.target.value, typeof e.target.value)

if ( typeof e.target.value === 'string') {
  setSelectedValues([e.target.value])
} else {
  setSelectedValues(e.target.value)
}

  
  };

  return (
    <div className="p-1">

    <FormControl fullWidth className="p-1">
      <InputLabel style={{color: props.labelTextColor}}  id="TestLabelID">{props.labelText}</InputLabel>
      

      <Select
        labelId="1"
        label="ComboBox Label"
        className="bg-white option"
        multiple = {props.AllowSelectMultiple}
        value={selectedValues}
        name="Test Name"
        onChange={handleNewSelection}
        input={<OutlinedInput label={props.labelText} />}
        style={selectStyles}
        >
        {props.data.map((item: any) => {
          return (
            <MenuItem
            id="OPTION"
            value={item["displayField"]}
            key={item["displayField"]}
            style={generateItemStyles(
              item["displayField"],
              selectedValues,
                theme
              )}
              >
              {item["displayField"]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
        </div>
  );
};

export default ComboBoxComponent;

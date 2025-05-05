// Imports

import * as React from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useEffect, useRef, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CssBaseline from '@mui/material/CssBaseline';
import { createEndMessage, createInfoMessage, createStartMessage } from '../../utils';
import { Config, PrimaryColor, Theme } from '../../styling/types/types';
import generateTheme from '../../styling/utils/theme-provider'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// Create interface for props

export interface ComboBoxProps {
  displayColumn: string;
  useTestData: boolean;
  Items: any[];
  labelText: string;
  height: number;
  width: any;
  defaultHeight: number;
  allowSelectMultiple: boolean;
  setSelectedRecords: (selectedRecords : any[], outputHeight: number) => void;
  handleNewUserSearchText?: (newSearchText: string) => void
  defaultValues: any[];
  darkMode: boolean;
  borderStyle: string;
  borderWidth: string;
  borderColor: string;
  backgroundColor?: string;
  isDisabled: boolean;
  className?: string;
  searchText?: string
  handleNewHeight?: (newHeight: number) => void
  theme?: any;
}

export default function CheckboxesTags(props: ComboBoxProps) {

  // Create refs / states (we need ref for render count since pcf components don't pass in tabular data on first render)

  const autoRef = useRef<any>(null);
  const searchText = useRef<string>('')
  const height = useRef<number>(props.defaultHeight)
  const [selectedValues, setSelectedValues] = useState<any[]>([])
  const [defaultValues, setDefaultValues] = useState<any>(props.defaultValues || [])
  const renderCount = useRef<number>(0);
  renderCount.current++

  const handleSearchTextChange = (newSearchText: string) => {
  
    createStartMessage(`Combo box mui triggered handleSearchTextChange with: ${newSearchText}`)
    searchText.current = newSearchText;
    props.handleNewUserSearchText ? props.handleNewUserSearchText(searchText.current) : ''
    createEndMessage("Combo box mui ending handleSearchTextChange")

  }

    // Establish test data

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
      title: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
];

/* 

Formula for evaluating whether the default values have changed. Returns true if the current value of the defaultValues ref doesn't match the default values passed in from props. We will use this later to control when to force a new state for the combobox selected values. This is necessary because in canvas apps you will often dynamically change the items a combobox has selected by default based on a gallery item. When we select a new gallery item in power apps, we want to force an update to the state that will reflect the new values.

*/

const compareDefaults = () => {


    const hasChanged = JSON.stringify(defaultValues) != JSON.stringify(props.defaultValues)
  
    if (props.Items.length > 0) {
  
      return hasChanged
  
    } else {
  
      return false
  
    }

}

//Formula for checking the default values, and updating the current ref for defaultValues if they've changed to reflect the new def values from props. Will also update state for combobox to reflect new selected values

const updateDefaults = () => {

    if( compareDefaults() ) {

      setDefaultValues(props.defaultValues);

      if (props.defaultValues != selectedValues) {
        console.log( "TRIGGERING UPDATE FROM COMBO BOX DEFAULTS WITH ", props.defaultValues, " ", selectedValues)
        setSelectedValues(props.defaultValues);
        props.setSelectedRecords(selectedValues, height.current)
      }

    }

};
  
  // If combobox is set to allow multiple selections in power apps, pass in selected values to state directly
  
const handleMultiOptionSelect = (e : any, value : any[]) => {

  if (renderCount.current > 1) {

    createStartMessage(`ComboBoxMui tsx triggered handleMultiOptionSelect with values: `, value)
    setSelectedValues(value)
    createEndMessage(`ComboBoxMui tsx ending handleMultiOptionSelect with new values: `, selectedValues)
  
  }

}

const handleSingleOptionSelect = (e: any, value: any) => {

  if( renderCount.current > 1) {

    
    if (value == null) {
      
      setSelectedValues([]);
      
    } else {
      
      setSelectedValues([value]);
      props.setSelectedRecords(selectedValues, height.current)
      
    }
  }
}
  
// Establish theme

const config : Config = {
  Mode: 'dark',
  primaryColor:  'Green'
}

const theme = generateTheme(config)
// props.theme ? props.theme :  createTheme({
//     palette: {
//       mode:  props.darkMode ? 'dark' : 'light'
//     },
//     components: {

//      MuiAutocomplete: {
//       styleOverrides: {
//         inputRoot: {
//           minHeight: `${props.defaultHeight}px`
//         },
//         root: {
//           minHeight: `${props.defaultHeight}px`
//         }
//       },
//       defaultProps: {
//         sx: {
//           height: props.defaultHeight
//         }
//       }
//      },

//       MuiInputLabel: {
//         styleOverrides: {
//           root: {
//             top: 'auto',
//             bottom: '50%'
//           },
//           shrink: {
//             top: 0
//                     }
//         }
//       },

//       MuiInputBase: {
//         styleOverrides: {
//           root: {
//             minHeight: `${props.defaultHeight}`,
//           '& .MuiOutlinedInput-notchedOutline': {

//               borderStyle: props.borderStyle,
//               borderWidth: props.borderWidth,
//               borderColor: props.borderColor,
//             }
//           }
//         }
//       }
//     }
//   });



const optionsList = props.useTestData ? top100Films :  props.Items

const filterOptions = {
  limit: 100
}

const displayColumn = props.displayColumn

//Use effect hook to get the new output height and pass the new output height and new selected values whenever the selected values state changes

useEffect(() => {


  console.log("ComboBoxMui triggered useEFfect hook with [selectedValues] dependency array")

  if (autoRef.current) {
  console.log("UPDATING AUTO REF HEIGHT")
  
  createInfoMessage("Auto ref before time", autoRef.current.getBoundingClientRect().height)

  setTimeout(() => {
    

      createInfoMessage("Auto ref during time", autoRef.current.getBoundingClientRect().height)
      height.current = autoRef.current.getBoundingClientRect().height
      
      createInfoMessage(`HEIGHT: ${height.current}`)
      props.setSelectedRecords(selectedValues,   props.defaultHeight > height.current ? props.defaultHeight : height.current)
      
    }, 300);
    
  

  }
  

}, [selectedValues])

updateDefaults();

return (

    <div  style={{position: "relative",  width: props.width, height: 'fit-content'}} ref = {autoRef}>
{


    props.allowSelectMultiple ? 
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Autocomplete
      multiple = {props.allowSelectMultiple}
      onChange={handleMultiOptionSelect}
      disabled = {props.isDisabled}
      value={ selectedValues}
      options={optionsList}
      sx={{ backgroundColor: props.backgroundColor ? props.backgroundColor : '', width: '100%'}}
      className={props.className}
      filterOptions={createFilterOptions(filterOptions)}
      defaultValue={props.defaultValues}
      isOptionEqualToValue={(option, value) => {return option[displayColumn] == value[displayColumn]}}
      disableCloseOnSelect
      onInputChange={(e: any) => {
        if (e?.target && e?.target.value != searchText) {
          handleSearchTextChange(e.target.value)
        }
      }}
      getOptionLabel={(option : any) => option[displayColumn]}
      renderOption={(props, option : any, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
              
              />
            {option[displayColumn]}
          </li>
        );
      }}

      renderInput={(params) => (
      <TextField {...params} sx={{height: '100%'}} label= {props.labelText || 'Label'} placeholder = {props.labelText || "Search text here"} onChange={(e: any) => {props.handleNewUserSearchText ? props.handleNewUserSearchText(e.target.value) : ''}}/>
    )}
    
      />
  </ThemeProvider>
  
:

<ThemeProvider theme={theme}>
<CssBaseline />
<Autocomplete
 
  onChange={handleSingleOptionSelect}
  onInputChange={(e: any) => {
    if (e?.target && e?.target.value != searchText) {

      handleSearchTextChange(e.target.value)
    }
  }}
  disabled = {props.isDisabled}
  options={optionsList}
  value={selectedValues[0] || null}
  filterOptions={createFilterOptions(filterOptions)}
  getOptionLabel={(option : any) => option[displayColumn]}
  className = {props.className}
  isOptionEqualToValue={(option, value) => option[displayColumn] == value[displayColumn]}
  renderOption={(props, option : any, { selected }) => {
    const { key, ...optionProps } = props;
    return (
      <li key={key} {...optionProps}>
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selected}
          
          />
        {option[displayColumn]}
      </li>
    );
  }}
  style={{ width: '100%', backgroundColor: props.backgroundColor ? props.backgroundColor : ''}}
  renderInput={(params) => (
    <TextField {...params} label= {props.labelText || 'Label'} placeholder = {props.labelText || "Search text here"}/>
  )}
  />
</ThemeProvider>
}
  </div>

);
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
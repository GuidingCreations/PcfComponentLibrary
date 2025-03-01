// Imports

import * as React from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useRef } from 'react';
import useState from 'react-usestateref'
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
}





export default function CheckboxesTags(props: ComboBoxProps) {

  // Create refs / states (we need ref for render count since pcf components don't pass in tabular data on first render)

  const renderCountRef = useRef(0);
  renderCountRef.current++;
  const elementRef = useRef<any>(null)
  const autoRef = useRef<any>(null);
  const [selectedValues, setSelectedValues] = useState<any[]>([])
  const height = useRef(65)
  const [defaultValues, setDefaultValues] = useState<any>(props.defaultValues || [])
  const searchText = useRef<string>('')

  console.log("RENDER COUNT ComboBoxMUI", renderCountRef.current)


  const handleSearchTextChange = (newSearchText: string) => {
  
    searchText.current = newSearchText;
    props.handleNewUserSearchText ? props.handleNewUserSearchText(searchText.current) : ''
  
  }


  //Use effect hook to get the new output height and pass the new output height and new selected values whenever the selected values state changes

  useEffect(() => {


    if (autoRef.current) {
    
      height.current = autoRef.current.getBoundingClientRect().height
    
    }
    
        props.setSelectedRecords(selectedValues, height.current)

  }, [selectedValues])



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
  
      console.log("OVER 0 records on hasChanged")
      return hasChanged
  
    } else {
  
      return false
  
    }

  }

//Formula for checking the default values, and updating the current ref for defaultValues if they've changed to reflect the new def values from props. Will also update state for combobox to reflect new selected values

  const updateDefaults = () => {

    if( compareDefaults() ) {

      setDefaultValues(props.defaultValues);
      setSelectedValues(props.defaultValues);
      props.setSelectedRecords(selectedValues, height.current)

    }

  };

 
    updateDefaults();
  

// Establish theme

  const theme = createTheme({
    palette: {
      mode:  props.darkMode ? 'dark' : 'light'
    },
    components: {

      MuiInputLabel: {
        styleOverrides: {
          root: {
            top: 'auto',
            bottom: '50%'
          },
          shrink: {
            top: 0
                    }
        }
      },

      MuiInputBase: {
        styleOverrides: {
          root: {
          '& .MuiOutlinedInput-notchedOutline': {

              borderStyle: props.borderStyle,
              borderWidth: props.borderWidth,
              borderColor: props.borderColor,
            },
            height:  `${props.height}px`
          }
        }
      }
    }
  });
  

  // If combobox is set to allow multiple selections in power apps, pass in selected values to state directly
  
  const handleMultiOptionSelect = (e : any, value : any[]) => {

      setSelectedValues(value)
}


const handleSingleOptionSelect = (e: any, value: any) => {

  if (value == null) {

    setSelectedValues([]);

  } else {

    setSelectedValues([value]);
    props.setSelectedRecords(selectedValues, height.current)

  }
}

  const emptyLabel : any = {}
  emptyLabel.label = ""
  const optionsList = props.useTestData ? top100Films :  props.Items




  const multDefaults = props.defaultValues


const filterOptions = {
  limit: 100
}


const displayColumn = props.displayColumn

return (

    <div  style={{position: "relative", height: "auto", minHeight: '100%', width: props.width}}>
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
      className={props.className}
      filterOptions={createFilterOptions(filterOptions)}
      defaultValue={multDefaults}
      isOptionEqualToValue={(option, value) => {console.log("OPTION, ", option, " value, ", value); return option[displayColumn] == value[displayColumn]}}
      disableCloseOnSelect
      ref = {autoRef}
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
      style={{ width: '100%' , backgroundColor: props.backgroundColor ? props.backgroundColor : ''}}
      renderInput={(params) => (
        <TextField {...params} label= {props.labelText || 'Label'} placeholder = {props.labelText || "Search text here"} ref={elementRef} onChange={(e: any) => {props.handleNewUserSearchText ? props.handleNewUserSearchText(e.target.value) : ''}}/>
      )}
      />
  </ThemeProvider>
  
:

<ThemeProvider theme={theme}>
<CssBaseline />
<Autocomplete
 
  onChange={handleSingleOptionSelect}
  onInputChange={(e: any) => { handleSearchTextChange(e.target.value)}}
  disabled = {props.isDisabled}
  options={optionsList}
  value={selectedValues[0] || null}
  filterOptions={createFilterOptions(filterOptions)}
  getOptionLabel={(option : any) => option[displayColumn]}
  className = {props.className}
  isOptionEqualToValue={(option, value) => option[displayColumn] == value[displayColumn]}
  ref = {autoRef}
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
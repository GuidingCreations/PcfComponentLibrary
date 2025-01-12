import * as React from 'react';
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


export interface ComboBoxProps {
  displayColumn: string;
  useTestData: boolean;
  Items: any[];
  labelText: string;
  height: number;
  width: number;
  allowSelectMultiple: boolean;
  setSelectedRecords: (selectedRecords : any[]) => void
  defaultValues: any[];
  darkMode: boolean;
  borderStyle: string;
  borderWidth: string;
  borderColor: string
}





export default function CheckboxesTags(props: ComboBoxProps) {
  
  const renderCountRef = useRef(0)
  const [selectedValues, setSelectedValues, selectedValuesRef] = useState<any[]>([])
  const defaultValues = useRef<any>([])
  renderCountRef.current++
  const comboBoxRef = useRef(null)
  const [height, setHeight] = useState(0);


  console.log("RENDER COUNT", renderCountRef.current)

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

  const compareDefaults = () => {
    console.log("comparing defaults", JSON.stringify(defaultValues.current), "to ", JSON.stringify(props.defaultValues));
    const hasChanged = JSON.stringify(defaultValues.current) != JSON.stringify(props.defaultValues)
    console.log("has changed? ", hasChanged);
    
    return hasChanged
  }

  const updateDefaults = () => {
    if(compareDefaults()) {
      console.log("default values have changed, setting selected values to new state of default values");
      defaultValues.current = props.defaultValues
      setSelectedValues(props.defaultValues)
      console.log("NEW SELECTED VALUES", selectedValuesRef.current)
    }
  };

  updateDefaults();


  const theme = createTheme({
    palette: {
      mode:  props.darkMode ? 'dark' : 'light'
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
          '& .MuiOutlinedInput-notchedOutline': {

              borderStyle: props.borderStyle,
              borderWidth: props.borderWidth,
              borderColor: props.borderColor,
            },
          }
        }
      }
    }
  });
  


  const handleOptionSelect = (e : any, value : any[]) => {
    console.log(e);
    console.log(value);
    if (props.allowSelectMultiple) {
      console.log("IS OF ARRAY TYPE? ", Array.isArray(value) )
      setSelectedValues(value)
    } else {
      console.log("ISARRAY !mult: ", Array.isArray(value))
      setSelectedValues([value]);
      console.log("sel Values at end of !mult handleOptionSelect", selectedValues)
    }
  }
  const displayColumn : string = props.displayColumn;
  const emptyLabel : any = {}
  emptyLabel.label = ""
  const optionsList = props.useTestData ? top100Films :  props.Items

  useEffect(() => {
    console.log("BEFORE SEL", selectedValues)
    setSelectedValues(selectedValues)
    console.log("AFTER SEL", selectedValues)
    props.setSelectedRecords(selectedValues)
  }, [selectedValues])
  console.log("PROP DEFAULTS", props.defaultValues)
  const multDefaults = props.defaultValues
console.log("MULT DEFAULTS", multDefaults)
  return (

    props.allowSelectMultiple ? 
    <ThemeProvider theme={theme}>
<CssBaseline />
    <Autocomplete
      multiple = {props.allowSelectMultiple}
      onChange={handleOptionSelect}
      value={ selectedValuesRef.current || [{title: ""}]}
      id="checkboxes-tags-demo"
      options={optionsList}
      defaultValue={multDefaults}
      isOptionEqualToValue={(option, value) => option[displayColumn] == value[displayColumn]}
      disableCloseOnSelect
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
      style={{ width: props.width , maxWidth: props.width, maxHeight : props.height}}
      renderInput={(params) => (
        <TextField {...params} label= {props.labelText || 'Label'} placeholder = {props.labelText || "Search text here"} />
      )}
      />
  </ThemeProvider>
  
:

<ThemeProvider theme={theme}>
<CssBaseline />
<Autocomplete
 
  onChange={handleOptionSelect}
  id="checkboxes-tags-demo"
  options={optionsList}
  getOptionLabel={(option : any) => option[displayColumn]}
  value={selectedValues[0] || emptyLabel}
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
  style={{ width: props.width , maxWidth: props.width, maxHeight : props.height}}
  renderInput={(params) => (
    <TextField {...params} label= {props.labelText || 'Label'} placeholder="Favorites" />
  )}
  />
</ThemeProvider>


);
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

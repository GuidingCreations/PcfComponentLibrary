import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';

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
}





export default function CheckboxesTags(props: ComboBoxProps) {
  console.log("PROP THEME", props.darkMode)
  const theme = createTheme({
    palette: {
      mode:  props.darkMode ? 'dark' : 'light'
    },
  });
  console.log("theme", theme)
  
  const [selectedValues, setSelectedValues] = useState<any[]>(props.defaultValues)
  const handleOptionSelect = (e : any, value : any[]) => {
    console.log(e);
    console.log(value);
    if (props.allowSelectMultiple) {
      setSelectedValues(value)
    } else {
      setSelectedValues([value])
    }
  }
  const displayColumn : string = props.displayColumn;
  console.log("display column", displayColumn)
  const optionsList = props.useTestData ? top100Films :  props.Items
  console.log("optionsList", optionsList)

  useEffect(() => {
    console.log("BEFORE SEL", selectedValues)
    setSelectedValues(selectedValues)
    console.log("AFTER SEL", selectedValues)
    props.setSelectedRecords(selectedValues)
  }, [selectedValues])
  
  
  return (
    <ThemeProvider theme={theme}>
<CssBaseline />
    <Autocomplete
      multiple = {props.allowSelectMultiple}
      onChange={handleOptionSelect}
      value={selectedValues}
      id="checkboxes-tags-demo"
      options={optionsList}
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
        <TextField {...params} label= {props.labelText || 'Label'} placeholder="Favorites" />
      )}
      />
  </ThemeProvider>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
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
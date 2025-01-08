import * as React from 'react';

import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export interface TextInputProps {
  darkMode: boolean;
  Required: boolean;
  inputType: string;
  variantType: string;
  placeholderText: string;
  labelText: string;
  accentColor: string;
}

export default function TextInput(props : TextInputProps) {

const [isError, setIsError] = useState(false)

const handleChange = (e: any) => {
  const value = e.target.value
  console.log(value);
  if (value.length < 6 ) {
    setIsError(true)
  } else {
    setIsError(false)
  }
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});




  return (
<ThemeProvider theme={props.darkMode ? darkTheme : lightTheme}>
<CssBaseline />
    <TextField id="TextInput" 
      label = {props.labelText} 
      error = {isError}
      variant = {props.variantType == "outlined" ? "outlined" : props.variantType == "filled" ?  "filled" : "standard"}
      required = {props.Required}
      type= {props.inputType || "text"}
      placeholder= {props.placeholderText}
      onChange={ (e) => handleChange(e)}
      />
  </ThemeProvider>
      
  )

}

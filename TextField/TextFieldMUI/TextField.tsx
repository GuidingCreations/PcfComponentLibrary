import * as React from 'react';

import TextField from '@mui/material/TextField';
// import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, Box } from '@mui/material';
// import {makeStyles} from '@mui/styles'

export interface TextInputProps {
  darkMode: boolean;
  labelText: string;
  updateOutput: (value: any, hasError: boolean) => void;
  minLength: number;
  useSearchIcon: boolean;
  accentColor?: string;

}

export default function TextInput(props : TextInputProps) {
  
  
  const renderCount = useRef(0)
  renderCount.current++
  const outputValue = useRef<any>("")
  const minLength = useRef(props.minLength);
  minLength.current = props.minLength
  const isErrored = useRef(minLength.current > 0)
  const hasChanged = useRef(false)
  const errorText = useRef("")
  // On each render, check if the output value is less than the minimum length, and set isErrored if true. This is because component can re-render when a new minimum length is passed in, and the error state would not be updated otherwise
  
  console.log("vala", outputValue.current)
  if (outputValue.current.length < minLength.current) {

    if (isErrored.current == false) {
      isErrored.current = true
      props.updateOutput(outputValue.current, isErrored.current)

    }
  }
  console.log("IS ERRORED", isErrored)
    
    
  //When the value in the text field changes, check to see if it is less than the minimum length. If it is, set the error state. It also always passed the new value to the PCF components output properties.
  
  const handleTextChange = (newValue: any) => {

    if (newValue != "") {
      console.log("CHANGING TO HAS CHANGED")
      hasChanged.current = true

    } 
   
    console.log("OLD VALUE", outputValue.current);
    outputValue.current = newValue
    console.log(outputValue.current)
    if (outputValue.current.length < props.minLength) {
      isErrored.current = true;
      errorText.current = `Minimum length is ${props.minLength}`
    } else {
      isErrored.current = false;
      console.log("NOT ERRORED FOR MIN TEXT")
    }

    props.updateOutput(outputValue.current, isErrored.current)

  }

  // Establish theme

  const theme = createTheme({
    palette: {
      mode: props.darkMode ? 'dark': "light",
      
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides : {

          root: {
            '& .MuiOutlinedInput-notchedOutline': {

              borderStyle: 'solid',
              borderWidth:"1px",
              borderColor: props.accentColor,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: isErrored.current && hasChanged.current ?  'red' : props.accentColor 
          },
          '&:focus .MuiOutlinedInput-notchedOutline': {
            borderColor: props.accentColor
          },
          '&:hasfocus .MuiOutlinedInput-notchedOutline': {
            borderColor: isErrored.current && hasChanged.current ? 'red' : props.accentColor
          },

          '&:hover:hasfocus .MuiOutlinedInput-notchedOutline': {
            borderColor: isErrored.current && hasChanged.current ? 'red' : props.accentColor
          },
        
        },
              }
    }
}});

console.log("HAS CHANGED", hasChanged)

  return (


    <ThemeProvider theme={theme }>
      <CssBaseline />
       <TextField id="TextInput" 
      label = {props.labelText}
      variant='outlined'
      helperText = {isErrored ? errorText.current : ""}
      onChange={(e) => {console.log("TRIGGERING OUTPUT CHANGE FROM COMP: ","e", e,"targ", e.target,"val", e.target.value);   handleTextChange(e.target.value)}}
      error = {renderCount.current > 0 && isErrored.current && hasChanged.current}
      slotProps={{
        input: {
          startAdornment : props.useSearchIcon ? (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ) : ('')
        }
      }}
      />       
  </ThemeProvider>
      
  )

}

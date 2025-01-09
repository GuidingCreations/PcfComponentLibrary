import * as React from 'react';

import TextField from '@mui/material/TextField';
// import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useRef, useState } from 'react';
// import SearchIcon from '@mui/icons-material/Search';
// import { InputAdornment, Box } from '@mui/material';
// import {makeStyles} from '@mui/styles'

export interface TextInputProps {
  darkMode: boolean;
  labelText: string;
  updateOutput: (value: any, hasError: boolean) => void;
  minLength: number;

}

export default function TextInput(props : TextInputProps) {
  
  const renderCount = useRef(0)
  renderCount.current++

  const minLength = useRef(props.minLength);
  minLength.current = props.minLength
  
  const isErrored = useRef(minLength.current > 0)
  
  const outputValue = useRef<any>("")
  console.log("vala", outputValue.current)
  if (outputValue.current.length < minLength.current) {
    isErrored.current = true
    props.updateOutput(outputValue.current, isErrored.current)
  }
    
    
    console.log("IS ERRORED", isErrored)
  const handleTextChange = (newValue: any) => {
    console.log("OLD VALUE", outputValue.current);
    outputValue.current = newValue
    console.log(outputValue.current)
    if (outputValue.current.length < props.minLength) {
      isErrored.current = true
    } else {
      isErrored.current = false
    }

    props.updateOutput(outputValue.current, isErrored.current)

  }


  const theme = createTheme({
    palette: {
      mode: props.darkMode ? 'dark': "light",
    },
  });


  return (


    <ThemeProvider theme={theme }>
      <CssBaseline />
       <TextField id="TextInput" 
      label = {props.labelText}
      variant='outlined'
      onChange={(e) => {console.log("TRIGGERING OUTPUT CHANGE FROM COMP: ","e", e,"targ", e.target,"val", e.target.value);   handleTextChange(e.target.value)}}
      />       
  </ThemeProvider>
      
  )

}

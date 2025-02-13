import * as React from 'react';

import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import { InputAdornment, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import SearchIcon from '@mui/icons-material/Search';


export interface TextInputProps {
  darkMode: boolean;
  labelText: string;
  updateOutput: (value: any, hasError: boolean) => void;
  minLength: number;
  useSearchIcon: boolean;
  accentColor?: string;
  height: number;
  backgroundColor: string;
  labelColor: string;
  inputType: string;
  defaultValue?: string;
  isDisabled: boolean;
  isCurrency: boolean;
  isMultiLine: boolean;  
}

export default function TextInput(props : TextInputProps) {
  
  
  const renderCount = useRef(0)
  renderCount.current++
  const outputValue = useRef<any>("")
  const minLength = useRef(props.minLength);
  minLength.current = props.minLength
  const isErrored = useRef(minLength.current > 0);
  const [defaultValue, setDefaultValue] = useState<any>("")
  const newText = useRef<any>("")
  const [textValue, setTextValue] = useState<any>(props.defaultValue)
  const hasChanged = useRef(false)
  const errorText = useRef("");


  useEffect(() => {
    props.updateOutput(newText.current, isErrored.current)
  }, [newText.current])

  // On each render, check if the output value is less than the minimum length, and set isErrored if true. This is because component can re-render when a new minimum length is passed in, and the error state would not be updated otherwise
  
  
  if (props.defaultValue != defaultValue.current && props.defaultValue != '') {
    defaultValue.current = props.defaultValue;
    setTextValue(props.defaultValue)
    newText.current = props.defaultValue
  }
  
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
    console.log("CHANGING NEW TEXT, orig: ", newText.current)
    setTextValue(newValue)
    newText.current = newValue;
    console.log("NEW NEWTEXT", newText.current)
    if (newValue != "") {
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


  }

  // Establish theme

  const theme = createTheme({
    palette: {
      mode: props.darkMode ? 'dark': "light",
      
      
    },

    components: {
      MuiFormControl: {
        styleOverrides: {
          root: {
            margin: '0px'
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            margin: '0px'
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides : {

          root: {
            backgroundColor:  props.backgroundColor ? props.backgroundColor : '',
            
            margin: '0px',
            "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        color: 'red'
      }
    },

            

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
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: `${props.height}px`,
        
        },
        input: {
          marginBottom: 'auto'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: props.labelColor ? props.labelColor : '',
          '& .Mui-focused': {
            color: 'red'
          }
        },
    
        
      }
    }
  
}});


console.log("HAS CHANGED", hasChanged)


console.log("PROPS IN TEXT FIELD", props)

  return (


    <ThemeProvider theme={theme }>
      <CssBaseline />
           
       <TextField id="TextInput" 
      
       disabled = {props.isDisabled}
       defaultValue={defaultValue.current || ''}
      label = {props.labelText}
      variant='outlined'
      value = {textValue}
      fullWidth
      multiline = {props.inputType == 'text' || props.inputType == ''}
      className='h-full '
      helperText = {isErrored.current ? errorText.current : ""}
      onChange={(e) => {console.log("TRIGGERING OUTPUT CHANGE FROM COMP: ","e", e,"targ", e.target,"val", e.target.value);   handleTextChange(e.target.value)}}
      error = {renderCount.current > 0 && isErrored.current && hasChanged.current}
      slotProps={{
        input: {
          startAdornment : props.useSearchIcon ? (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ) : 
          
          props.isCurrency ?
          
          (
          <InputAdornment position='start' sx={{marginTop: '4px'}}>
            $
          </InputAdornment>
          
        ) : null,
          type: props.inputType == 'number' || props.isCurrency ? 'number' : props.inputType == 'password' ? 'password' : 'text'
        },
        inputLabel: {
          color: props.labelColor ? props.labelColor : 'white'
        }
      }}
      />




  </ThemeProvider>
      
  )

}

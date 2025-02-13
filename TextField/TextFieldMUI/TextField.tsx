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
 
  const [outputValue, setOutputValue] = useState<any>("")
  
  const [minLength, setMinLength] = useState(props.minLength);
  
  const [isErrored, setIsErrored] = useState(minLength > 0);
  
  const [defaultValue, setDefaultValue] = useState<any>("")
  
  const [newText, setNewText] = useState<any>("")
  
  const [textValue, setTextValue] = useState<any>(props.defaultValue)
  
  const [hasChanged, setHasChanged] = useState(false)
  
  const [errorText, setErrorText] = useState("");


  useEffect(() => {
    props.updateOutput(newText, isErrored)
  }, [newText])

  if (minLength !== props.minLength) {
    
    setMinLength(props.minLength)
  
  }

  // On each render, check if the output value is less than the minimum length, and set isErrored if true. This is because component can re-render when a new minimum length is passed in, and the error state would not be updated otherwise
  
  
  if (props.defaultValue != defaultValue && props.defaultValue != '') {
    setDefaultValue(props.defaultValue);
    setTextValue(props.defaultValue)
    setNewText(props.defaultValue)
  }
  
  if (outputValue.length < minLength) {

    if (!isErrored) {
      setIsErrored(true);
      props.updateOutput(outputValue, isErrored)

    }
  }
  

    
  //When the value in the text field changes, check to see if it is less than the minimum length. If it is, set the error state. It also always passed the new value to the PCF components output properties.
  
  const handleTextChange = (newValue: any) => {
    console.log("CHANGING NEW TEXT, orig: ", newText)
    setTextValue(newValue)
    setNewText(newValue);
    console.log("NEW NEWTEXT", newText)
    if (newValue != "") {
      setHasChanged(true)

    } 
   
    console.log("OLD VALUE", outputValue);
    setOutputValue(newValue);
    console.log(outputValue)
    if (outputValue.length < props.minLength) {
      setIsErrored(true);
      setErrorText(`Minimum length is ${props.minLength}`)
    } else {
      setIsErrored(false);
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
            borderColor: isErrored && hasChanged ?  'red' : props.accentColor 
          },
          '&:focus .MuiOutlinedInput-notchedOutline': {
            borderColor: props.accentColor
          },
          '&:hasfocus .MuiOutlinedInput-notchedOutline': {
            borderColor: isErrored && hasChanged ? 'red' : props.accentColor
          },

          '&:hover:hasfocus .MuiOutlinedInput-notchedOutline': {
            borderColor: isErrored && hasChanged ? 'red' : props.accentColor
          },
        
        },
        input: {
          marginTop: !props.isMultiLine ? 'auto' : '',
          marginBottom: !props.isMultiLine ? 'auto' : ''

        }
        

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
       defaultValue={defaultValue || ''}
      label = {props.labelText}
      variant='outlined'
      value = {textValue}
      fullWidth
      multiline = {props.isMultiLine}
      className='h-full '
      helperText = {isErrored ? errorText : ""}
      onChange={(e) => {console.log("TRIGGERING OUTPUT CHANGE FROM COMP: ","e", e,"targ", e.target,"val", e.target.value);   handleTextChange(e.target.value)}}
      error = {renderCount.current > 0 && isErrored && hasChanged}
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

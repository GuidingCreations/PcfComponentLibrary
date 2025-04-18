/* eslint-disable */
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import generateTheme from '../../styling/utils/theme-provider'
import { Config, PrimaryColor } from '../../styling/types/types';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';

export interface RadioGroupProps {
    useDarkMode: boolean;
    labelText: string;
    Options: any[];
    PrimaryColor: string;
    useTestData: boolean;
    displayField: string;
    handleValueChange: (newValue: string ) => void
}

const RadioGroupComponent = (props: RadioGroupProps) => {
 
  const optionsList = props.useTestData ? [{Value: "option 1"}, {Value: "option 3"}, {Value: "option 3"}] : props.Options
  const displayField = props.useTestData ? "Value" : props.displayField
 
  console.log("OPTIONS: ", optionsList);

  const [selectedValue, setSelectedValue] = useState('')

  useEffect(() => {
    console.log("SELECTED VALUES: ", selectedValue);
    props.handleValueChange(selectedValue)
  }, [selectedValue])

  const config : Config = {
    Mode: props.useDarkMode ? 'dark' : 'light',
    primaryColor: props.PrimaryColor as PrimaryColor
  }

  const theme = generateTheme(config)
  console.log(theme)
  return (
    
    <ThemeProvider theme={theme}>

       <FormControl>
      <FormLabel style={{textAlign: 'left'}} id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={selectedValue}
        onChange={(e: any) => setSelectedValue(e.target.value)}
        
        >
        {
          optionsList.map((option : any) => {
            return <FormControlLabel value={option[displayField]} sx={{color: props.useDarkMode ? 'white' : 'black'}}  control={<Radio/>} label = {option[displayField]} />
          })
        }
       
      </RadioGroup>
    </FormControl>
        </ThemeProvider>
  )
}

export default RadioGroupComponent
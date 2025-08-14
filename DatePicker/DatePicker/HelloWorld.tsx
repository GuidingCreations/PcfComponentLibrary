/* eslint-disable */
import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { memo, useEffect, useRef, useState } from "react";

// Create type interface for props

export interface DatePickerComponentProps {
  useDarkMode: boolean;
  handleChange: (date:string) => void;
  labelText: string;
  defaultDate: string;
  fontColor: string;
  backgroundColor: string;
  width: number;
  height: number;
  borderColor: string;
  borderStyle: string;
  borderWidth: number;
  isDisabled: boolean;
  isRequired: boolean;
}

// Start component

const DatePickerComponent = memo(function (props: DatePickerComponentProps) {

// Establish refs for default and selected date. We leave the selected date null so we can trigger the useEffect to update our output state on default render 

  const [defaultDate, setDefaultDate] = useState<string>(props.defaultDate)
  const [selectedDate, setSelectedDate] = useState<any>(props.defaultDate ? dayjs(props.defaultDate) : null)

// Use effect hook for whenever the selected date changes

 useEffect(() => {
  
   const date = selectedDate
  
  
  date ? props.handleChange(`${date.$M + 1}/${date.$D}/${date.$y}`) : ''

 }, [selectedDate])


// Check on each render to see if current value of default ref is different than value passed in from props. If so, adjust the ref and selected date accordingly. We need this to reflect changes whenever a dynamic value changes from power apps

  if (defaultDate != props.defaultDate) {
    
    console.log("GENERATING NEW DEFAULT")
    setDefaultDate(props.defaultDate)
    setSelectedDate(dayjs(props.defaultDate))
    console.log("NEW DAYJS", selectedDate)
  
  }

// Create theme

  const theme = createTheme({
    palette: {

      mode: props.useDarkMode ? "dark" : "light",
    
    },

    components: {
    
      MuiInputBase: {
    
        styleOverrides: {
    
          root: {
    
            color: props.fontColor,
            height: props.height
    
          }
    
        }
    
      },
      MuiInputLabel: {
    
        styleOverrides: {
    
          root: {
    
            color: props.fontColor
    
          }
    
        }
      }
    }
  });


// Function to handle any change in date in the control

  const handleDateChange = (e: any) => {
    
  
    setSelectedDate(e)

  }

console.log("PROPS - datepicker", props);
console.log("THEME", theme)
console.log("SELECTED DATE", selectedDate)


// Render component

  return (
    <ThemeProvider theme={theme}>
      
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    
    <DatePicker 
      value={selectedDate ? selectedDate : null}  
      onChange={(e) => {console.log("EVENT", e); handleDateChange(e)}}
      label = {`${props.labelText} ${props.isRequired ? "*" : ""}` }
      sx={{
        backgroundColor: props.backgroundColor || '',
        minHeight: `${props.height}px`,
        width: `${props.width}px`,
        borderColor: props.borderColor,
        borderStyle: props.borderStyle,
        borderWidth: `${props.borderWidth}px`
      }}
      disabled = {props.isDisabled}
   
      />
  
    </LocalizationProvider>
  
    </ThemeProvider>
  )
})

export default DatePickerComponent

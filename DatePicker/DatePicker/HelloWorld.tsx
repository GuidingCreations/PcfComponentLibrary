import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CssBaseline from "@mui/material/CssBaseline";
import dayjs from 'dayjs';
import { useRef } from "react";

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
}

// Start component

const DatePickerComponent = (props: DatePickerComponentProps) => {

// Establish refs for default and selected date. 

  const defaultDate = useRef<string>(props.defaultDate)
  const selectedDate = useRef<any>(dayjs(props.defaultDate))

// Check on each render to see if current value of default ref is different than value passed in from props. If so, adjust the ref and selected date accordingly. We need this to reflect changes whenever a dynamic value changes from power apps

  if (defaultDate.current != props.defaultDate) {
    
    defaultDate.current = props.defaultDate
    selectedDate.current = dayjs(defaultDate.current)
  
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
    selectedDate.current = e
    props.handleChange(`${e.$M + 1}/${e.$D}/${e.$y}`)

  }

console.log("PROPS - datepicker", props);
console.log("THEME", theme)


// Render component

  return (
    <ThemeProvider theme={theme}>
      
    <CssBaseline/>
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    
    <DatePicker 
      value={selectedDate.current}  
      onChange={(e) => {console.log("EVENT", e); handleDateChange(e)}} 
      label = {props.labelText}
      sx={{
        backgroundColor: props.backgroundColor || '',
        minHeight: `${props.height}px`,
        width: `${props.width}px`
      }}
   
      />
  
    </LocalizationProvider>
  
    </ThemeProvider>
  )
}

export default DatePickerComponent

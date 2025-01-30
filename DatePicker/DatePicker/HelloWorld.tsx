import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CssBaseline from "@mui/material/CssBaseline";
import dayjs from 'dayjs';
import { useRef, useState } from "react";

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


const DatePickerComponent = (props: DatePickerComponentProps) => {

  const defaultDate = useRef<string>(props.defaultDate)
  const selectedDate = useRef<any>(dayjs(props.defaultDate))

  if (defaultDate.current != props.defaultDate) {
    defaultDate.current = props.defaultDate
    selectedDate.current = dayjs(defaultDate.current)
  }

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


  const handleDateChange = (e: any) => {
    console.log("DAY", e.$D)
    console.log("Month", e.$M + 1)
    console.log("DAY", e.$y)
    selectedDate.current = e
    props.handleChange(`${e.$M + 1}/${e.$D}/${e.$y}`)

  }

console.log("PROPS - datepicker", props);
console.log("THEME", theme)


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

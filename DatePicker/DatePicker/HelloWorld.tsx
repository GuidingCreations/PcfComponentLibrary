import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CssBaseline from "@mui/material/CssBaseline";

export interface DatePickerComponentProps {
  useDarkMode: boolean;
  handleChange: (date:string) => void;
  labelText: string;
}


const DatePickerComponent = (props: DatePickerComponentProps) => {

    
  const theme = createTheme({
    palette: {
      mode: props.useDarkMode ? "dark" : "light",
    },
  });


  const handleDateChange = (e: any) => {
    console.log("DAY", e.$D)
    console.log("Month", e.$M + 1)
    console.log("DAY", e.$y)

    props.handleChange(`${e.$M + 1}/${e.$D}/${e.$y}`)

  }

console.log("PROPS", props);
console.log("THEME", theme)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker onChange={(e) => {console.log("EVENT", e); handleDateChange(e)}} label = {props.labelText}/>
  </LocalizationProvider>
  </ThemeProvider>
  )
}

export default DatePickerComponent

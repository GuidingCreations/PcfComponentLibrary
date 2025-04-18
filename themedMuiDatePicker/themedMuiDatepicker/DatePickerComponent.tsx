import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ThemeProvider } from '@mui/material/styles';
import {Config, PrimaryColor} from '../../styling/types/types'
import generateTheme from '../../styling/utils/theme-provider'
import { CssBaseline } from '@mui/material';

export interface DatePickerProps {
    useDarkMode: boolean,
    primaryColor: string;
    handleDateSelection: (newDate: string) => void;
    labelText: string
}

const DatePickerComponent = (props: DatePickerProps) => {


    const config : Config = {
        Mode: props.useDarkMode ? 'dark' : 'light', 
        primaryColor: props.primaryColor as PrimaryColor
    }

    return (
        <div style={{width: '100%', height: '100%'}}>

        <ThemeProvider theme={generateTheme(config)}>
            <CssBaseline/>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{width: '100%', height: '100%'}} onChange={(e : any, value: any) => props.handleDateSelection(`${e.$M}/${e.$D}/${e.$y}`)} label= {props.labelText} />
            </LocalizationProvider>
        
        </ThemeProvider>

        </div>
)
}

export default DatePickerComponent
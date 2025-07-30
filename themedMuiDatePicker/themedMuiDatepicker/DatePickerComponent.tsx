/* eslint-disable */
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ThemeProvider } from '@mui/material/styles';
import {Config, PrimaryColor} from '../../styling/types/types'
import generateTheme from '../../styling/utils/theme-provider'
import { memo, useEffect, useRef, useState } from 'react';
import * as dayjs from 'dayjs';

export interface DatePickerProps {
    useDarkMode: boolean;
    primaryColor: string;
    handleDateSelection: (newDate: string) => void;
    labelText: string;
    DefaultDate: string;
    isRequired: boolean
}

const DatePickerComponent = memo(function (props: DatePickerProps) {



    const config : Config = {
        Mode: props.useDarkMode ? 'dark' : 'light', 
        primaryColor: props.primaryColor as PrimaryColor
    }

    const defaultSelectedDate = useRef<string>('');
    const [selectedDate, setSelectedDate] = useState<any>('')

    if (defaultSelectedDate.current != props.DefaultDate) {
        defaultSelectedDate.current = props.DefaultDate;
        setSelectedDate(defaultSelectedDate.current)
    }


    useEffect(() => {
        props.handleDateSelection(selectedDate)
    }, [selectedDate])

    return (
        <div style={{width: '100%', height: '100%'}}>

        <ThemeProvider theme={generateTheme(config)}>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    value={selectedDate ? dayjs(selectedDate) : null} 
                    sx={{width: '100%', height: '100%'}} 
                    onChange={(e : any, value: any) => setSelectedDate(`${e.$M + 1}/${e.$D}/${e.$y}`)} 
                    label= {`${props.labelText} ${props.isRequired ? "*" : ""}`} />
                    
            </LocalizationProvider>
        
        </ThemeProvider>

        </div>
)
})

export default DatePickerComponent
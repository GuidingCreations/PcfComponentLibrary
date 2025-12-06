/* eslint-disable */
"use client"
import * as React from "react"
import { Calendar } from "../components/ui/calendar"
import { type DateRange } from "react-day-picker"
import {generateShadCnTheme} from '../../utils'
export interface CalenderComponentProps {
  Width: number;
  Height: number;
  updateSelectedDate: (newDate: Date) => void;
  updateSelectedDateRange: (startDate: Date | undefined, endDate: Date | undefined) => void;
  calendarMode: "single" | "range";
  useDarkMode: boolean;
  themeColor: string;
}
export default function CalendarComponent(props: CalenderComponentProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined)
  const root = window.document.documentElement
  
  if (props.useDarkMode) {
    root.classList.add("dark");
    root.classList.remove("light")
  } else {
    root.classList.add("light");
    root.classList.remove("dark")
  }

  React.useEffect(() => {
    console.log("Date range: ", dateRange),
    props.updateSelectedDateRange(dateRange?.from, dateRange?.to)
  }, [dateRange])
  
  const ThemeStyles = generateShadCnTheme(props.themeColor, props.useDarkMode);
  const sizeStyles = {height: `${props.Height}px`, width: `${props.Width}px`} as React.CSSProperties
  const CalendarStyles = {...ThemeStyles, ...sizeStyles} as React.CSSProperties

  return  props.calendarMode == "single" ? (

      <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className= {`rounded-md border  bg-background shadow-sm ${props.useDarkMode ? "dark": ''}`}
      captionLayout="dropdown"
      style={CalendarStyles}
      darkMode = {props.useDarkMode}
      onDayClick={(e) => props.updateSelectedDate(e)}
      />
    
    ) :
    
    props.calendarMode == "range" ?

    <Calendar
      mode="range"
      className= {`rounded-md border  bg-background shadow-sm ${props.useDarkMode ? "dark": ''}`}
      selected={dateRange}
      onSelect={setDateRange}
      endMonth={new Date('12/31/2050')}
      captionLayout="dropdown"
      style={CalendarStyles}
      darkMode = {props.useDarkMode}
      />
    
    
    
    
    
    : null
  
  
  }

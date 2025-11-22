"use client"
import * as React from "react"
import { Calendar } from "../components/ui/calendar"
import { type DateRange } from "react-day-picker"
export interface CalenderComponentProps {
  Width: number;
  Height: number;
  updateSelectedDate: (newDate: Date) => void;
  updateSelectedDateRange: (startDate: Date | undefined, endDate: Date | undefined) => void;
  calendarMode: "single" | "range"
}
export default function CalendarComponent(props: CalenderComponentProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined)
  const root = window.document.documentElement
  root.classList.add("dark")

  React.useEffect(() => {
    console.log("Date range: ", dateRange),
    props.updateSelectedDateRange(dateRange?.from, dateRange?.to)
  }, [dateRange])
  
  return  props.calendarMode == "single" ? (

      <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border  bg-background shadow-sm dark"
      captionLayout="dropdown"
      style={{width: `${props.Width}px`, height: `${props.Height}px`}}
      darkMode
      
      onDayClick={(e) => props.updateSelectedDate(e)}
      />
    
    ) :
    
    props.calendarMode == "range" ?

    <Calendar
      mode="range"
      selected={dateRange}
      onSelect={setDateRange}
      endMonth={new Date('12/31/2050')}
      className="rounded-md border  bg-background shadow-sm dark"
      captionLayout="dropdown"
      style={{width: `${props.Width}px`, height: `${props.Height}px`}}
      darkMode
      />
    
    
    
    
    
    : null
  
  
  }

# ShadCN Calendar Component

### This component is a full-size calendar component that allows for a selection of either a single date or an entire date range. It comes with multiple theming options, the full list of which can be found in the primaryColorNames at https://github.com/GuidingCreations/PcfComponentLibrary/blob/main/styling/colors.ts


### Demonstration




## Table of Contents

- [Demo](#Demo)
- [Input Properties](#input-properties)
- [Output properties](#output-properties)
- [Events](#events)

# Input Properties Links
- [useDarkMode](#usedarkmode)
- [themecolor](#themecolor)
- [calendarMode](#calendarmode)
- [componentwidth](#componentwidth)
- [componentheight](#componentheight)

# Output Properties Links

- [selectedDate](#selecteddate)
- [selectedEndDate](#selectedenddate)


## Demo

![DarkRange](<Images/Dark range.png>)
<br><br>
![LightRange](<Images/Light range.png>)
<br><br>
![DarkSingle](<Images/Dark single.png>)
<br><br>
![LightSingle](<Images/Light single.png>)




# Input Properties

## calendarMode
### Type: ENUM (choice drop-down)
### This will control whether the calendar is a single select calendar, or selects a range of dates

## useDarkMode
### Type: boolean;
### When turned on, this component renders in dark mode, when turned off it renders in light mode (why would you do that to yourself?)

<br>

## themeColor
### Type: string;
### This property will determine the color theme that the control uses. Acceptable values which can be found in the primaryColorNames at https://github.com/GuidingCreations/PcfComponentLibrary/blob/main/styling/colors.ts

<br>

## componentWidth
### Type: number
### A necessary property due to a bug on Microsoft's side that causes components to occassionally not fill their parent container, even when using the context.mode.trackContainerResize() function. The default value is Self.Width, and that's what it should remain as. 

<br>

## componentHeight
### Type: number
### A necessary property due to a bug on Microsoft's side that causes components to occassionally not fill their parent container, even when using the context.mode.trackContainerResize() function. The default value is Self.Height, and that's what it should remain as. 

<br>


# Output properties

## selectedDate
### Type: DateTime.Date
### The selected date in the calendar. In range mode, it will be the starting date in the range

<br>

## selectedEndDate
### Type: DateTime.Date
### The end date in a date range (range mode only)

<br>





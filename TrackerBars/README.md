# Tracker Bars for Power Apps (PCF COMPONENT)

## Description
This component is meant to be a quick visual indicator of color-coordinated values, such as statuses. It allows the developer to display a list of bars horizontally that are all colored differently depending on internal values. This comes with the ability to include tooltips, which allow for more focused information when needed.

## Table of Contents

- [Demo](#Demo)
- [Input Properties](#input-properties)
- [Output properties](#output-properties)

## Demo

![Tracker demo](<images/Demo/Demo.png>)


# Input Properties
- [Fields](#fields)
- [trackerData](#trackerdata)
- [useTestData](#usetestdata)
- [useDarkMode](#usedarkmode)
- [containerHeight](#containerheight)
- [containerWidth](#containerwidth)

<br>

# Input Properties

<br>

## Fields 
This property is contained within Power Apps itself, it won't appear in the code here, but it is a field well in power apps that will allow you to select which fields are passed to the component.

![Fields well](<images/Fields well/Fields well.png>)

## trackerData
### Type: Table
This is your main table of data that you'll be passing into the component. In order for this to properly render the component, you'll want two basic properties:
- color (string, required): this will be the color of the bar. It supports all normal web development colors, including hex code. 
- tooltip (string | string[], optional): This will be the tooltip that is displayed when you hover over a particular bar. This can either be a string or a table of strings. If it is one string, it will be displayed on a single line, whereas an array of strings will have each value in the array separated by line break.

![Table data](<images/tableData/tableData.png>)

## useTestData
#### Type: boolean;
This property controls whether the component will render with the default test data, or the data you passed in. You should set up all your data, add your fields to the field well, then turn this off.

## useDarkMode
#### Type: boolean
Whether the component will use dark mode. Default value is set to varUseDarkMode in all themed components, so you can define it once in your App.OnStart and know it will be accessible across all components the moment you insert them onto the canvas

## containerHeight
#### Type: number
This property is used because of a glitch currently present in PCF components where context.mode.allocatedHeight and context.mode.allocatedWidth are not always passed in correctly, which can lead to components taking odd dimensions. This property will default to Self.Height, and you should leave it there.

## containerWidth
#### Type: number
This property is used because of a glitch currently present in PCF components where context.mode.allocatedHeight and context.mode.allocatedWidth are not always passed in correctly, which can lead to components taking odd dimensions. This property will default to Self.Height, and you should leave it there.

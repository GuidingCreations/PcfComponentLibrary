# Material UI Data Table/Grid for Power Apps (PCF COMPONENT)

## Description

This component utilizes the free version of MUI's DataGrid React Component. It speeds up the development process and makes for a much nice aesthetic than the default components available in Power Apps

## Table of Contents

- [Demo](#Demo)
- [Input Properties](#input-properties)
- [Output properties](#output-properties)

## Demo

Standard data table state

![Standard data table state](./images/Standard%20Data%20table.png)

Selected Data table state

![Selected Data Table state](./images/Selected%20State%20Data%20Table.png)


## Input Properties

- tableData: This is the array of data that will be passed into the Data Table directly. This is your 'main' data for this component.

- Fields: This property is container within Power Apps itself, it won't appear in the code here, but it is a field well in power apps that will allow you to select which fields are passed to the component. This will control what fields are available to you to use as option labels in the combo box

- columnWidthTable: This dataset will be passed in as a list of values mapped to your main dataset's columns, and it will control the default width. It is an array of objects. Each object will have two properties: columnName and columnWidth. columnName is the name of the corresponding column in your tableData dataset, and it needs to match exactly, so make sure you're looking at the underlying name in your Fields well, because Dataverse will attach weird prefixes to it. columnWidth is a number property that dictates the default width of the corresponding column. For example, if you have a column called TestChoices that you want to have a default width of 100, you would use: [
    {
        columnName: "TestChoices",
        columnWidth: 100
    }
]

## Output properties


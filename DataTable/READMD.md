# Material UI Data Table/Grid for Power Apps (PCF COMPONENT)

## Description

This component utilizes the free version of MUI's DataGrid React Component. It is part of a suite of components that utilizes Material UI's components, and includes out-of-the-box theme options that coordinate seamlessly across multiple components. It speeds up the development process and makes for a much nice aesthetic than the default components available in Power Apps. It allows for complex filtering and sorting with minimal setup.

## Table of Contents

- [Demo](#Demo)
- [Input Properties](#input-properties)
- [Output properties](#output-properties)

## Demo

Standard data table state


Selected Data table state



## Input Properties

- ReadMeLink: Text type; Link to this ReadMe, set as input for easy readability when using component

- useDarkMode: Boolean type; Whether the component will use dark mode. Default value is set to varUseDarkMode in all themed components, so you can define it once in your App.OnStart and know it will be accessible across all components the moment you insert them onto the canvas

- showToolbar: Boolean type; This controls whether the data table will display the toolbar at the top of the component that includes the buttons for Filters, Columns, Density, and Export. Setting this will remove the toolbar, but users will still be able to filter and hide columns from the column header itself. They will not be able to export data with this set to false.

- useTheming: Boolean type; This will control whether the component uses the custom pre-defined themes like Green, Red, Pink, Royal Blue, etc. With this set to false, it will ignore the primaryColor property and instead use Material UI's default theme, which is a generic blue color.

- useTestData: Boolean type; This will control whether the control uses the static test data included within the component itself. Turning this to false will have the component use the live data passed in from the canvas app.

- primaryColor: String type; The primary color for the theme to be used in the component. All themed components have a default value of varAppPrimaryColor, so you can define that variable once in the App.OnStart, and it will be avaiable to all components once you insert them onto the canvas. The options for the themes are contained in the styling/color-schemes.ts file. In the event that an invalid string is passed, it will default to the Green theme.

- showCheckboxes: Boolean type; This will control whether the checkbox for selection will appear in each row of the data table. When set to false, the checkboxes will never show in the data table. When set to true, the checkboxes will be shown by default, but the user can still hide that column if they wish.

- hideFooter: Boolean type; This will control whether the footer is displayed. When set to true, the footer will be hidden.

- allowSelectMultipe: Boolean type; This will control whether the data table allows you to select multiple records at once. When set to true, you can select multiple rows, when set to false, trying to select a second row will un-select your first selected row as it selects the new selected row.

- useServerSide: Boolean type; This controls whether filtering expressions (and eventually sorting expressions) will be delegated to the server to execute instead of the client. This is currently only available for Dataverse. The benefit of server-side execution is that it saves huge amounts of time when working with very large datasets, so if you're using Dataverse you should pretty much always have this on. If you are not using Dataverse, turn this off. The limit for records on client-side execution (which happens when you have this turned off) is 100,000 records.

- 



- tableData: This is the array of data that will be passed into the Data Table directly. This is your 'main' data for this component. Make sure to adjust the "fields" well in your property pane after linking your data source, otherwise the fields won't be passed to the component. 

- Fields: This property is contained within Power Apps itself, it won't appear in the code here, but it is a field well in power apps that will allow you to select which fields are passed to the component.

- columnWidthTable: This dataset will be passed in as a list of values mapped to your main dataset's columns, and it will control the default width. It is an array of objects. Each object will have two properties: columnName and columnWidth. columnName is the name of the corresponding column in your tableData dataset, and it needs to match exactly, so make sure you're looking at the underlying name in your Fields well, because Dataverse will attach weird prefixes to it. columnWidth is a number property that dictates the default width of the corresponding column. For example, if you have a column called TestChoices that you want to have a default width of 100, you would use: [
    {
        columnName: "TestChoices",
        columnWidth: 100
    }
]

- columnVisibility: this dataset will be passed in as a list of values mapped to your main dataset's columns, and it will control the default column visibility. Each record of the visibilityModel

## Output properties


# Material UI Data Table/Grid for Power Apps (PCF COMPONENT)

## Description

This component utilizes the free version of MUI's DataGrid React Component. It is part of a suite of components that utilizes Material UI's components, and includes out-of-the-box theme options that coordinate seamlessly across multiple components. It speeds up the development process and makes for a much nice aesthetic than the default components available in Power Apps. It allows for complex filtering and sorting with minimal setup. 

## Table of Contents

- [Demo](#Demo)
- [Input Properties](#input-properties)
- [Output properties](#output-properties)



## Demo

![Demo](<images/Demo/Demo.png>)


# Input Properties
- [tableData](#tabledata)
- [Fields](#fields)
- [columnWidthTable](#columnwidthtable)
- [columnOverrides](#columnoverrides)
- [readMeLink](#readmelink)
- [useDarkMode](#usedarkmode)
- [showToolbar](#showtoolbar)
- [useTheming](#usetheming)
- [useTestData](#usetestdata)
- [primaryColor](#primarycolor)
- [showCheckboxes](#showcheckboxes)
- [hideFooter](#hidefooter)
- [allowSelectMultiple](#allowselectmultiple)
- [useServerSide](#useServerSide)
- [noRowsText](#norowstext)
- [columnVisibility](#columnvisibility)

# Output Properties
 - [changeType](#changetype)
 - [outputValue](#outputvalue)
 - [outputObject](#outputobject)
 - [outputObjectSchema](#outputobjectschema)

 # Events
  - [onOptionSelected](#onOptionSelected)

<br>
<br>

# Input Properties

<br>

## tableData
#### Type: Table
This is the array of data that will be passed into the Data Table directly. This is your 'main' data for this component. Make sure to adjust the "fields" well in your property pane after linking your data source, otherwise the fields won't be passed to the component. 

## Fields 
This property is contained within Power Apps itself, it won't appear in the code here, but it is a field well in power apps that will allow you to select which fields are passed to the component.

![Fields well](<images/Fields well/Fields well.png>)

## columnWidthTable 
#### Type: Table
This dataset will be passed in as a list of values mapped to your main dataset's columns, and it will control the default width. It is an array of objects. Each object will have two properties: columnName and columnWidth. columnName is the name of the corresponding column in your tableData dataset, and it needs to match exactly, so make sure you're looking at the underlying name in your Fields well, because Dataverse will attach weird prefixes to it. columnWidth is a number property that dictates the default width of the corresponding column. For example, if you have a column called TestChoices that you want to have a default width of 100, you would use: [
    {
        columnName: "TestChoices",
        columnWidth: 100
    }
]

## columnVisibility
#### Type: Table
This dataset will be passed in as a list of values mapped to your main dataset's columns, and it will control the default column visibility. Each record of this table will need the following properties:
    1. columnName (string): this will be the name of the column that is in the field well
    2. isVisible (boolean): set this to false if you want the column to be hidden by default, but still accessible for the end user if they want to un-hide it


## columnOverrides
#### Type: Table
#### NOTE: After adding a record, you will need to cut and re-paste the control on the canvas to see it take effect in the editor, or refresh the website after saving
This is a table that will pass in customizations to the columns themselves, which can change what's displayed in the data table. For example, you can change column names, choose to render a custom component like a Chip or SquashedButtonGroup, and change the formatting for values. The abilities of this table are as follows: 

- [Change a column name](#change-column-name)

- [Change the format type of a column](#change-format-type-of-column)

- [Render a squashedButtonGroup](#render-a-squashedbuttongroup)
        
### Change column name
This is simple, you simply need to have a record with two properties: columnName and newName. columnName will contain the Field name of the column (Always double check this in the the field well, as it can sometimes be different than what's displayed. For example, Sharepoint will occasionally replace spaces with something like _x0200), and newName will be the new name of the column to be displayed.
### Before pic 
![Before column name change](<images/columnName/beforePicColumnName.png>)

### Formula example
![Formula example](<images/columnName/columnNameFormulaExample.png>)

### After pic 
![After pic](<images/columnName/columnNameAfterImage.png>)


### Change format type of column
Right now, the only format change accepted is Currency. To format as currency, pass in a record with the columnName property, and a property of formatType with a value of Currency
### Before pic 
![Before change](<images/columnName/columnNameAfterImage.png>)

### Formula example
![Formula example](<images/formatType/formatTypeFormulaExample.png>)

### After pic 
![After change](<images/formatType/formatTypeAfterPic.png>)

### Render a squashedButtonGroup
You can render out a custom component called a squashedButtonGroup that will allow users to select an option from a drop-down list of actions, then select that button to trigger an event. In order for this to be set up, you will need to create a record with the following properties:
- columnName : this will be the field name of the column you want the component to render in
- componentType : you will set this to a value of squashedButtonGroup
- optionsList : this will be an array of strings that will serve as your list of options

### Example formula
![Formula example](<images/squashedButtonGroup/formulaExample.png>)

### After render
![After](<images/squashedButtonGroup/After.png>)

### Render out a chip
You can render a chip, which is like a little colored oval with text, usually meant to convey status or type information at a glance. For example, if you had a Status column with the options of Fully Operational, Partially operational, and Not operational, you could convey that information better to the user with Green, yellow, and red chips, so they can tell the color ( and therefore status ) at a glance, instead of having to read the full value. There are several properties you can use here:
- columnName: (required) - the field name of the column to be rendered
- componentType: (required) - Set this to "chip"
- fontColor: (optional) - This will be the DEFAULT color of the text in your chips, this color will only be used if there is no matching fontColor in your colorGenerator
- backgroundColor: (optional) - This will be the DEFAULT background color for your chip. This color will only be used if there is no matching backgroundColor in your colorGenerator
- colorGenerator: (optional) - This will be an array of records that you pass in your columnOverride record to indicate which rows should generate what color for your chips. There are several properties you can pass into each record in your colorGenerator array:
    - matchingValue: (required) - This is the value that will attempt to match with the value being displayed in your data table. If you have a column with the values Fully Operational, Partially operational, and Not operational, those values would each have to appear in a record as the matchingValue in order to be applied
    - fontColor: (optional) - This is the font color to be displayed inside the chip itself
    - backgroundColor: (optional) - This is the background color for the chip to use

### Formula example

- Note that in this example, we do not pass in a backgroundColor for Choice 1, or a fontColor for Choice 3. In the "After" picture, you will see that since it didn't find a value in those records, it uses the fontColor and backgroundColor from the parent instead

![Formula example](<images/Chip/formulaExample.png>)

### After pic 
![After change](<images/Chip/After.png>)








## ReadMeLink
#### Type: String;
Link to this ReadMe, set as input for easy readability when using component

## useDarkMode
#### Type: Boolean
Whether the component will use dark mode. Default value is set to varUseDarkMode in all themed components, so you can define it once in your App.OnStart and know it will be accessible across all components the moment you insert them onto the canvas

## showToolbar
#### Type: Boolean
This controls whether the data table will display the toolbar at the top of the component that includes the buttons for Filters, Columns, Density, and Export. Setting this will remove the toolbar, but users will still be able to filter and hide columns from the column header itself. They will not be able to export data with this set to false.

## useTheming
#### Type: Boolean
This will control whether the component uses the custom pre##defined themes like Green, Red, Pink, Royal Blue, etc. With this set to false, it will ignore the primaryColor property and instead use Material UI's default theme, which is a generic blue color.

## useTestData
#### Type: Boolean
This will control whether the control uses the static test data included within the component itself. Turning this to false will have the component use the live data passed in from the canvas app.

## primaryColor
#### Type: String
The primary color for the theme to be used in the component. All themed components have a default value of varAppPrimaryColor, so you can define that variable once in the App.OnStart, and it will be avaiable to all components once you insert them onto the canvas. The options for the themes are contained in the styling/color-schemes.ts file. In the event that an invalid string is passed, it will default to the Green theme.

## showCheckboxes
#### Type: Boolean
This will control whether the checkbox for selection will appear in each row of the data table. When set to false, the checkboxes will never show in the data table. When set to true, the checkboxes will be shown by default, but the user can still hide that column if they wish.

## hideFooter
#### Type: Boolean
This will control whether the footer is displayed. When set to true, the footer will be hidden.

## allowSelectMultiple
#### Type: Boolean
This will control whether the data table allows you to select multiple records at once. When set to true, you can select multiple rows, when set to false, trying to select a second row will un-select your first selected row as it selects the new selected row.

## useServerSide
#### Type: Boolean 
This controls whether filtering expressions (and eventually sorting expressions) will be delegated to the server to execute instead of the client. This is currently only available for Dataverse. The benefit of server-side execution is that it saves huge amounts of time when working with very large datasets, so if you're using Dataverse you should pretty much always have this on. If you are not using Dataverse, turn this off. The limit for records on client-side execution (which happens when you have this turned off) is 100,000 records.

## noRowsText
#### Type: String
This is the text that will be displayed in the data table when there are no results found. This can happen when you pass an empty table, or no records match your filter criteria.


<br>

# Output properties

<br>

## changeType
#### Type: String
Meant to indicate type of change that triggers notifyOutputChanged() function. Right now it only has one real value - selectedOption, which is triggered when you have a squashedButtonGroup component as a custom render and you select the button

## outputValue
#### Type: String
This will indicate the text value of the option you selected from the squashedButtonGroup

## outputObject
#### Type: Record 
This will output the selected record from the datatable. This differs from the Selected property because it is available even when the row is not selected. For example, let's say that you have a squashedButtonGroup in each row of the table, and whenever you click on the button, you want to store the selected record and navigate to another screen. You can't do this with the normal Selected property, because if a user already has a row selected, then clicks on the button in the row they want to use, it will un-select that row before triggering the button event, so it will no longer be the SelectedItem. This outputObject property, however, is directly generated when you select an option, so it will always be available in those events.

## outputObjectSchema
#### Type: String;
The schema of the outputObject. This is required so Power Apps can utilize dot notation on the outputObject

<br>

# Events

<br>

## onOptionSelected
This event will occur whenever you select an option from the squashedButtonGroup in a custom rendered column generated through the columnOverrides





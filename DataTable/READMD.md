# Material UI Data Table/Grid for Power Apps (PCF COMPONENT)

## Description

This component utilizes the free version of MUI's DataGrid React Component. It speeds up the development process and makes for a much nice aesthetic than the default components available in Power Apps

## Table of Contents

- [Demo](#Demo)
- [Input Properties](#input-properties)
- [Output properties](#output-properties)

## Demo

Standard data table state

![Standard data table state](./images/Dark%20combo%20box%20demo%20single%20select%20empty%20state.png)


## Input Properties

- Items: This property is the input property for the list of items you want to appear as options in the ComboBox. There is no specific format required for these, but Power Apps will expect it to be a table.
- Fields: This property is container within Power Apps itself, it won't appear in the code hear, but it is a field well in power apps that will allow you to select which fields are passed to the component. This will control what fields are available to you to use as option labels in the combo box
- DefaultSelectedItems: this property controls which options are selected by default in power apps. Use this if you want to select certain options by defaults, such as changing the selected options based on which gallery item you have selected in Power Apps. To keep it simple, just reference the same datasource you used for your Items property, and just filter/lookup to get the option(s) you want selected by default. For example, if the datasource you're using is "Apps", and you have a vertical gallery in Power Apps where you put Apps as the datasource, you can reference the gallery's selected item by saying GalleryName.Selected. This is the preferred method, but you could also use filter or lookup. For example, if you wanted all apps that did not have "test" in the Name property of your Apps datasource, you could set the DefaultSelectedItems property to Filter(Apps, !"test" in ThisRecord.Name )
- DisplayField: This property controls which field will be displayed as the option label. Different data sources will have different naming conventions, so make sure you get the exact field name from the field well (the second property listed). For example, for a column with a display name of 'App Name', Dataverse may call it something like "cr999_appname", Sharepoint may call it something like "App_x0200_Name", and a custom array typed in would call it "App Name".
- backgroundColor: This property will control the background color of the component if you want it customized. It has default states for light and dark mode, but you can use this to create a custom background color. This property will work with any of the many recognized web colors such as white, black, blue, lightblue, etc., but will also accept hex values such as #FFFFFF
- labelText: This property will control what text is display as the label. If you don't have a selected value in the combo box, the label text will display inside the combo box itself, almost like placeholder text, but once you click into the combo box or select a value, the label will smoothly transition to the top of the control. This accepts text.
- borderStyle: This will control the border style. Accepts the following values: solid, dashed, none, dotted, inset, dashed solid
- borderWidth: This will control how large the border is. Accepts various web development values for width, such as pixels (1px would be one pixel wide), rem (responsive property), and vh or vw (viewport height and width). It is recommended to just use pixels.
- borderColor: Color of the border. This accepts the same values as backgroundColor
- Allow multiple select: This property controls whether the end user can select multiple values or only one value. Boolean property, accepts either true or false
- Dark mode: This property controls whether or not Dark mode is enabled. When toggled on, will change the look of the component to match a dark theme. It's important to note that for this to look good, the background of the container/app will need to be dark as well. Boolean property, accepts true or false value
- useTestData

## Output properties

- Selected:
- SelectedItems:
- outputHeight:

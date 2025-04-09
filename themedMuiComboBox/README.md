# Themed MUI ComboBox for Power Apps (PCF COMPONENT)

## Description








This component utilizes Material UI to provide a sleek aesthetic that offers a much more appealing visual than vanilla power apps. It has built-in theming that works in tandem with other Themed controls in this component library

## Table of Contents

- [Demo](#Demo)
- [Input Properties](#input-properties)
- [Output properties](#output-properties)
- [Known issues](#known-issues)

## Demo


https://github.com/user-attachments/assets/df4d08e4-fafd-4845-9bca-0309457d41b9


### Standard ComboBox state

This is the standard ComboBox state, shown with a "Green" theme

![Standard ComboBox state](./images/Basic%20view%20themed%20mui%20combo%20box.png)


### Single select state

This is what it looks like when you're clicked into it and you already have one item selected. This would be with the "allowSelectMultiple" property turned off.

![Single select state](./images/Single%20select%20state%20themed%20mui%20combo%20box.png)


### Multiple select state

This is what it looks like when you're clicked into it and you already have multiple items selected. This would be with the "allowSelectMultiple" property turned on.

![Multiple select state](./images/Single%20select%20state%20themed%20mui%20combo%20box.png)


## Input Properties

- ReadMeLink (String): Convenient URL so you can always have the ReadMe URL available

- useDarkMode (Boolean): Whether or not the control will use dark mode

- allowSelectMultiple (Boolean): Whether or not you can select multiple values simultaneously

- useTestData (Boolean): Whether control will use test data

- primaryColor (String): The theme variant that will be used. Current acceptable values are Green, Neon Blue, Royal Blue, Orange. If anything else is passed, will use Green.

- labelText (String): The text used in the label

- displayField (String): The field from your Items that will be displayed as the options label


## Output properties

- searchText (String): The text typed into the TextField search area

- outputHeight (Number): The height of the adjusted ComboBox - useful when you want to change height of actual component in power apps based on the actual rendered component, such as when selecting multiple values and rendering out extra rows for the chips

# Known issues

- If you switch it from single select to multiple select in the maker's portal, it will break you click into it. Just cut and paste the control back into the page and it will be fine again. The Autocomplete from Material UI doesn't like when you switch from single to multiple select, or vice versa.
- As with all PCFs as of the time of 4/9/2025, if you have them located inside some kind of container or gallery when you update to a new version, it will break some of the dimensions and you'll have to manually cut and paste every instance back into the current container. Because of this, it is advised you develop without containers if you plan on implementing PCFs heavily


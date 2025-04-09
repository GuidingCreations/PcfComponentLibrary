# Themed MUI ComboBox for Power Apps (PCF COMPONENT)

## Description

This component utilizes Material UI to provide a sleek aesthetic that offers a much more appealing visual than vanilla power apps. It has built-in theming that works in tandem with other Themed controls in this component library

## Table of Contents

- [Demo](#Demo)
- [Input Properties](#input-properties)
- [Output properties](#output-properties)
- [Known issues](#known-issues)

## Demo

[Demo](./images/Themed%20MUI%20ComboBox%20Demo.mp4)


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


## Output properties

# Known issues

- If you switch it from single select to multiple select in the maker's portal, it will break you click into it. Just cut and paste the control back into the page and it will be fine again. The Autocomplete from Material UI doesn't like when you switch from single to multiple select, or vice versa.
- As with all PCFs as of the time of 4/9/2025, if you have them located inside some kind of container or gallery when you update to a new version, it will break some of the dimensions and you'll have to manually cut and paste every instance back into the current container. Because of this, it is advised you develop without containers if you plan on implementing PCFs heavily


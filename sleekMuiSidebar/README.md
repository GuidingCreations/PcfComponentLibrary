# Sleek MUI Sidebar

## Description
This sidebar is a multi-level expanding and collapsing sidebar that will allow you to infuse professional and aesthetically pleasing navigation into your application.

## Table of Contents

- [Demo](#Demo)
- [Input Properties](#input-properties)
- [Output properties](#output-properties)

## Demo

![alt text](sleekMuiSidebar/images/image.png)


# Input Properties
- [Fields](#fields)

# Output Properties

 # Events

<br>
<br>

# Input Properties

<br>

## Fields 
This property is contained within Power Apps itself, it won't appear in the code here, but it is a field well in power apps that will allow you to select which fields are passed to the component.

![alt text](/PcfComponentLibrary/sleekMuiSidebar/images/Field%20well.png)

<br>

## navItems
### Type: Table
### This table will be the table of navigation items that you want the sidebar to display. Each parent level object will be a "section", which is basically a heading used to group navigation items together. The parent objects will have the following properties:
- ### sectionTitle (required - string): The section title will be the text you want displayed as your section header.
- ### isHidden (optional - boolean): Set this property to dynamically hide entire sections based on security implementations. For example, if you had a single-column collection of users named Admins you want to have access to an admin section, but no one else, you would set the isHidden property on the admin section to be !User().Email in Admins
- ### children ( required: array ): This is the navigation items that will render under the parent section. If this item does not have any children itself, it will be a normal selectable navigation item. If it does have children, it will render as an expand/collapse item to show the children. Each child of a section has the following available properties:
    ### 1. navTitle (required - string): This is the display text for the navigation item.
    ### 2. icon (optional - string): This renders an icon based on a single-path svg. You can find useable icons by going to https://fonts.google.com/icons, finding the icon you want, exporting it as svg, and extracting the 'd' property from the svg.
    ### 3. isHidden (optional - boolean): This operates exactly the same as the isHidden in the parent section, except it only controls visibility for this item
    ### 4. children (optional - array): This is a child navigation item that will be rendered under the parent, and gives the parent an expand/collapse functionality instead of a normal navigation functionality. The children here have all the same properties as parent, except it can't have more children itself (currently limited to 3 layers deep - Section, parent, child. Will eventually switch to a recursive function that renders infinitely )

### Example code (App.Formulas):
```
sidebarNavigation = [
    {
        // Section
        sectionTitle: "General",  
        isHidden: false,
        children: [
            //Parents
            {navTitle: "Home"},
            {
                navTitle: "Best practices", 
                icon: "M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z", 
                children: [
                    //Children
                    {navTitle: "Code comments"},
                    {navTitle: "Variables"},
                    {navTitle: "Concurrent"},
                    {navTitle: "Naming conventions"},
                    {navTitle: "Error handling"},
                    {navTitle: "Responsive design"},
                    {navTitle: "Delegation limits"}
                ]
            },
        {navTitle: "Power FX formulas", icon: "M200-120q-33 0-56.5-23.5T120-200v-500q0-14 4.5-26.5T138-750l56-68q9-11 20.5-16.5T240-840h480q14 0 25.5 5.5T766-818l56 68q9 11 13.5 23.5T840-700v500q0 33-23.5 56.5T760-120H200Zm16-600h528l-34-40H250l-34 40Zm-16 520h560v-440H200v440Zm382-78 142-142-142-142-58 58 84 84-84 84 58 58Zm-202 0 58-58-84-84 84-84-58-58-142 142 142 142Zm-180 78v-440 440Z", children: [
            {navTitle: "Power FX Overview"},
            {navTitle: "Set"},
            {navTitle: "UpdateContext"},
            {navTitle: "With"},
            {navTitle: "ClearCollect"},
            {navTitle: "Collect"},
            {navTitle: "Clear"},
            {navTitle: "Remove"},
            {navTitle: "RemoveIf"},
            {navTitle: "LookUp"},
            {navTitle: "Filter"},
        ]},
        {
            navTitle: "Named formulas",
            children: [
                {navTitle: "Overview"},
                {navTitle: "Basic named formulas"},
                {navTitle: "User-defined formulas"},
                {navTitle: "User-defined types"}
            ]
        },
        {
            navTitle: "PCF components",
            children: [
                {navTitle: "Overview"},
                {navTitle: "Pre-requisites"},
                {navTitle: "Create component library"},
                {navTitle: "Create a PCF component"},
                {navTitle: "Common/useful code"},
                {navTitle: "Publishing/pushing changes"},

            ]
        },
        {
            navTitle: "App types",
            icon: "M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z",
            children: [
                {navTitle: "Canvas"},
                {navTitle: "Model-driven"}
            ]
        },
        {
        navTitle: "Demos",
        isHidden: false,
        children: [
            {navTitle: "Data table"}
        ]
    }
    ]},
    
];

```




# Output properties

<br>

# Events

<br>





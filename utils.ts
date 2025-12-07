/* eslint-disable */


import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { JSONSchema4 } from "json-schema";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import React from "react";
import * as Colors from './styling/colors';
import { colorSchemaType } from "./styling/colors";
type DataSet = ComponentFramework.PropertyTypes.DataSet;
type DataSetInterfaces = ComponentFramework.PropertyTypes.DataSet;


export function sourceNeedsUpdate (context: any, sourceName: any, currentArray: any[]) {
    const needsUpdated = 
      context.updatedProperties.indexOf("dataset") > -1 || 
      context.updatedProperties.indexOf("records") > -1 || 
      context.parameters[sourceName].sortedRecordIds.length > currentArray.length
    return needsUpdated
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args))
}

export function populateDataset(dataset: DataSet) {
  const items: any[] = [];
  
    dataset.sortedRecordIds.map((recordID) => {
    const recordToAdd: any = {};
    dataset.columns.map((column: DataSetInterfaces.Column) => {
      const formattedTypes = ["OptionSet", "multiselectpicklist", "DateAndTime.DateAndTime", "DateAndTime.DateOnly"]

      let value : any;
      if (formattedTypes.includes(column.dataType)) {
        value = dataset.records[recordID].getFormattedValue(
          column.name
        );
      } else {

       value = dataset.records[recordID].getValue(
          column.name
        );
      }

      recordToAdd[column.name] = value
    });
    recordToAdd.recordID = dataset.records[recordID].getRecordId();
    items.push(recordToAdd);
  });
  return items;

}

export function generateOutputObject(
  row: ComponentFramework.PropertyHelper.DataSetApi.EntityRecord,
  dataset: DataSet
) {
  const outputObject: Record<
    string,
    string | number | boolean | number[] | undefined
  > = {};
  dataset.columns.forEach((c) => {
    const value = getRowValue(row, c);
    outputObject[c.displayName || c.name] = value;
  });

  return outputObject;
}

function getRowValue(
  row: ComponentFramework.PropertyHelper.DataSetApi.EntityRecord,
  column: ComponentFramework.PropertyHelper.DataSetApi.Column
) {

  switch (column.dataType) {
    // Number Types
    case "TwoOptions":
      return row.getValue(column.name) as boolean;
    case "Whole.None":
    case "Currency":
    case "Decimal":
    case "FP":
    case "Whole.Duration":
      return row.getValue(column.name) as number;
    // String Types
    case "SingleLine.Text":
    case "SingleLine.Email":
    case "SingleLine.Phone":
    case "SingleLine.Ticker":
    case "SingleLine.URL":
    case "SingleLine.TextArea":
    case "Multiple":
      return row.getFormattedValue(column.name);
    // Date Types
    case "DateAndTime.DateOnly":
    case "DateAndTime.DateAndTime":
      return (row.getValue(column.name) as Date)?.toISOString();
    // Choice Types
    case "OptionSet":
      // TODO: Can we return an enum?
      return row.getFormattedValue(column.name) as string;
    case "MultiSelectPicklist":
      return row.getValue(column.name) as number[];
    // Lookup Types
    case "Lookup.Simple":
    case "Lookup.Customer":
    case "Lookup.Owner":
    case "Whole.TimeZone":
    case "Whole.Language":
      return row.getFormattedValue(column.name);
  }
}

export function generateOutputObjectSchema(
  context: ComponentFramework.Context<any>,
  data: DataSet,
  currentSchema: any
) {
  const newSchema = JSON.stringify(getInputSchema(context, data));
  if (newSchema !== currentSchema) {
    return newSchema;
  } else return currentSchema;
}

export function generateOutputSchema(
  context: ComponentFramework.Context<any>,
  outputDataset: DataSet
): Promise<Record<string, unknown>> {
  const outputObjectSchema: JSONSchema4 = {
    $schema: "http://json-schema.org/draft-04/schema#",
    title: "outputObject",
    type: "object",
    properties: getInputSchema(context, outputDataset),
  };

  return Promise.resolve(outputObjectSchema);
}

export function inputSchemaHasChanged() {}

export function getInputSchema(
  context: ComponentFramework.Context<any>,
  inputDataset: DataSet
) {
  const columnProperties: Record<string, any> = {};
  inputDataset.columns
    .filter((c) => !c.isHidden && (c.displayName || c.name))
    .forEach((c) => {
      const properties = getColumnSchema(c);
      columnProperties[c.displayName || c.name] = properties;
    });

  return columnProperties;
}

function getColumnSchema(
  column: ComponentFramework.PropertyHelper.DataSetApi.Column
): JSONSchema4 {
  switch (column.dataType) {
    // Number Types
    case "TwoOptions":
      return { type: "boolean" };
    case "Whole.None":
      return { type: "integer" };
    case "Currency":
    case "Decimal":
    case "FP":
    case "Whole.Duration":
      return { type: "number" };
    // String Types
    case "SingleLine.Text":
    case "SingleLine.Email":
    case "SingleLine.Phone":
    case "SingleLine.Ticker":
    case "SingleLine.URL":
    case "SingleLine.TextArea":
    case "Multiple":
      return { type: "string" };
    // Other Types
    case "DateAndTime.DateOnly":
    case "DateAndTime.DateAndTime":
      return {
        type: "string",
        format: "date-time",
      };
    // Choice Types
    case "OptionSet":
      // TODO: Can we return an enum type dynamically?
      return { type: "string" };
    case "MultiSelectPicklist":
      return {
        type: "array",
        items: {
          type: "number",
        },
      };
    // Lookup Types
    case "Lookup.Simple":
    case "Lookup.Customer":
    case "Lookup.Owner":
      // TODO: What is the schema for lookups?
      return { type: "string" };
    // Other Types
    case "Whole.TimeZone":
    case "Whole.Language":
      return { type: "string" };
  }
  return { type: "string" };
}

export function determineScreenSize() {
  const theme = useTheme();

  const matchesXL = useMediaQuery(theme.breakpoints.up("xl"));
  const matchesL = useMediaQuery(theme.breakpoints.up("lg"));
  const matchesMedium = useMediaQuery(theme.breakpoints.up("md"));
  const matchesSmall = useMediaQuery(theme.breakpoints.up("sm"));

  const screenSize = matchesXL
    ? "xl"
    : matchesL
    ? "lg"
    : matchesMedium
    ? "md"
    : matchesSmall
    ? "sm"
    : "xs";

  return screenSize;
}

export function createStartMessage(messageText: string, object?: any) {

  console.log(`%c${messageText}`, "background-color: green; padding: 8px; border-radius: 8px", object)

}

export function createEndMessage(messageText: string, object?: any) {

  console.log(`%c${messageText}`, "background-color: red; padding: 8px; border-radius: 8px", object)

}

export function createPropsMessage(messageText: string, object?: any) {

  console.log(`%c${messageText}`,  "background-color: gold; padding: 8px; border-radius: 8px; color: black", object, "background-color: gold; padding: 8px; border-radius: 8px; color: black")

}

export function createInfoMessage(messageText: string, object?: any) {

  console.log(`%c${messageText}`,  "background-color: blue; padding: 8px; border-radius: 8px; color: white", object)

};

export function datasetChanged(updatedProps: any, dataset: DataSet, localVariable: any[]) {
 
  return (updatedProps.indexOf("dataset") > -1 || updatedProps.indexOf("records") > -1 || localVariable.length > dataset.sortedRecordIds.length) 

}

export function getCookie(name : string) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    // Check if the cookie starts with the name we want
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1, cookie.length);
    }
  }
  return null;
}

export function newCookieString(key: string, value: any) {
  var expiration_date = new Date();
  expiration_date.setFullYear(expiration_date.getFullYear() + 1);
  const newCookieString = `${key}=${value}; path=/; expires=${expiration_date}`
  return newCookieString
}

export function generateShadCnTheme(themeColor: string, useDarkMode: boolean) {

          let colorSchemeName: string;
          let colorScheme: any;
          colorSchemeName = Colors.primaryColorNames.filter((colorName) => colorName.toLowerCase() == themeColor.toLowerCase())[0] ?? 'Green'
          let matchingTheme : colorSchemaType = Colors.Themes.filter((theme) => theme.Name.toLowerCase() == colorSchemeName.toLowerCase())[0].Theme




          console.log('colorSchemeName: ', colorSchemeName, matchingTheme)

          colorScheme  = {
            '--primary':  matchingTheme.main ?? matchingTheme[400],
            '--primary-foreground':  matchingTheme.contrastText ?? 'white',
            '--neutralTextColor': useDarkMode ? "white" : 'black'
          }

          console.log("COLOR SCHEME: ", colorScheme)

          if (colorScheme) {
            return colorScheme
          }
          
          
          
          
          
          
          else {
              if (useDarkMode) {
              return {
                '--background':  'oklch(0.141 0.005 285.823)',
                '--foreground':  'oklch(0.985 0 0)',
                '--card':  'oklch(0.21 0.006 285.885)',
                '--card-foreground':  'oklch(0.985 0 0)',
                '--popover':  'oklch(0.21 0.006 285.885)',
                '--popover-foreground':  'oklch(0.985 0 0)',
                '--primary':  "#3acd7e",
                '--primary-foreground':  'oklch(0.986 0.031 120.757)',
                '--secondary':  'oklch(0.274 0.006 286.033)',
                '--secondary-foreground':  'oklch(0.985 0 0)',
                '--muted':  'oklch(0.274 0.006 286.033)',
                '--muted-foreground':  'oklch(0.705 0.015 286.067)',
                '--accent':  'oklch(0.274 0.006 286.033)',
                '--accent-foreground':  'oklch(0.985 0 0)',
                '--destructive':  'oklch(0.704 0.191 22.216)',
                '--border':  'oklch(1 0 0 / 10%)',
                '--input':  'oklch(1 0 0 / 15%)',
                '--ring':  'oklch(0.405 0.101 131.063)',
                '--chart-1':  'oklch(0.871 0.15 154.449)',
                '--chart-2':  'oklch(0.723 0.219 149.579)',
                '--chart-3':  'oklch(0.627 0.194 149.214)',
                '--chart-4':  'oklch(0.527 0.154 150.069)',
                '--chart-5':  'oklch(0.448 0.119 151.328)',
                '--sidebar':  'oklch(0.21 0.006 285.885)',
                '--sidebar-foreground':  'oklch(0.985 0 0)',
                '--sidebar-primary':  'oklch(0.768 0.233 130.85)',
                '--sidebar-primary-foreground':  'oklch(0.986 0.031 120.757)',
                '--sidebar-accent':  'oklch(0.274 0.006 286.033)',
                '--sidebar-accent-foreground':  'oklch(0.985 0 0)',
                '--sidebar-border':  'oklch(1 0 0 / 10%)',
                '--sidebar-ring':  'oklch(0.405 0.101 131.063)',
              } as React.CSSProperties
              } else {
              return {
                '--background':  'oklch(1 0 0)',
                '--foreground':  'oklch(0.141 0.005 285.823)',
                '--card':  'oklch(1 0 0)',
                '--card-foreground':  'oklch(0.141 0.005 285.823)',
                '--popover':  'oklch(1 0 0)',
                '--popover-foreground':  'oklch(0.141 0.005 285.823)',
                '--primary':  "#3acd7e",
                '--primary-foreground':  'oklch(0.986 0.031 120.757)',
                '--secondary':  'oklch(0.967 0.001 286.375)',
                '--secondary-foreground':  'oklch(0.21 0.006 285.885)',
                '--muted':  'oklch(0.967 0.001 286.375)',
                '--muted-foreground':  'oklch(0.552 0.016 285.938)',
                '--accent':  'oklch(0.967 0.001 286.375)',
                '--accent-foreground':  'oklch(0.21 0.006 285.885)',
                '--destructive':  'oklch(0.577 0.245 27.325)',
                '--border':  'oklch(0.92 0.004 286.32)',
                '--input':  'oklch(0.92 0.004 286.32)',
                '--ring':  'oklch(0.841 0.238 128.85)',
                '--chart-1':  'oklch(0.871 0.15 154.449)',
                '--chart-2':  'oklch(0.723 0.219 149.579)',
                '--chart-3':  'oklch(0.627 0.194 149.214)',
                '--chart-4':  'oklch(0.527 0.154 150.069)',
                '--chart-5':  'oklch(0.448 0.119 151.328)',
                '--sidebar':  'oklch(0.985 0 0)',
                '--sidebar-foreground':  'oklch(0.141 0.005 285.823)',
                '--sidebar-primary':  'oklch(0.648 0.2 131.684)',
                '--sidebar-primary-foreground':  'oklch(0.986 0.031 120.757)',
                '--sidebar-accent':  'oklch(0.967 0.001 286.375)',
                '--sidebar-accent-foreground':  'oklch(0.21 0.006 285.885)',
                '--sidebar-border':  'oklch(0.92 0.004 286.32)',
                '--sidebar-ring':  'oklch(0.841 0.238 128.85)',
              }
                }
            }
          }
      
  export function useIsMobile(mobileBreakpoint = 768) {
    const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
    
    React.useEffect(() => {
      const mql = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`)
      const onChange = () => {
        console.log("MQL: ", mql)
      setIsMobile(window.innerWidth < mobileBreakpoint)
    }
    
    mql.addEventListener("change", onChange)
    
    setIsMobile(window.innerWidth < mobileBreakpoint)
    
    return () => mql.removeEventListener("change", onChange)
  
  }, [mobileBreakpoint])

  return !!isMobile
}
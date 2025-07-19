import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { JSONSchema4 } from "json-schema";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;
type DataSetInterfaces = ComponentFramework.PropertyTypes.DataSet;


export function sourceNeedsUpdate (context: any, sourceName: any, currentArray: any[]) {
    const needsUpdated = context.updatedProperties.indexOf("dataset") > -1 || context.updatedProperties.indexOf("records") > -1 || context.parameters[sourceName].sortedRecordIds.length > currentArray.length
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
      console.log("COLUMN INFO: ", column)
      

      
      const value : any = dataset.records[recordID].getValue(
        column.name
      );
      
      recordToAdd[column.name] = value
    });

    recordToAdd.recordID = dataset.records[recordID].getRecordId();
    items.push(recordToAdd);
  });

  console.log("ITEMS LENGTH: ", items.length)
  return items;
}

export function generateOutputObject(
  row: ComponentFramework.PropertyHelper.DataSetApi.EntityRecord,
  dataset: DataSet
) {
  console.log("HITTING GENERATE OUTPUT OBJECT");
  const outputObject: Record<
    string,
    string | number | boolean | number[] | undefined
  > = {};
  dataset.columns.forEach((c) => {
    const value = getRowValue(row, c);
    console.log("VALUE FROM GOO: ", value);
    outputObject[c.displayName || c.name] = value;
  });

  return outputObject;
}

function getRowValue(
  row: ComponentFramework.PropertyHelper.DataSetApi.EntityRecord,
  column: ComponentFramework.PropertyHelper.DataSetApi.Column
) {
  console.log("ROW getRowValue: ", row);
  console.log("COLUMN getRowValue: ", column);
  console.log("COLUMN DATA TYPE", column.dataType);
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
  console.log("TESTING SCHEMA UPDATE");
  const newSchema = JSON.stringify(getInputSchema(context, data));
  console.log("GENERATED SCHEMA", newSchema);
  if (newSchema !== currentSchema) {
    console.log("NEW SCHEMA", newSchema);
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

  console.log("COLUMN PROPERTIES: ", columnProperties);

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
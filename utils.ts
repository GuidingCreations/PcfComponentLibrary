import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import { JSONSchema4 } from "json-schema";
type DataSet = ComponentFramework.PropertyTypes.DataSet;
type DataSetInterfaces = ComponentFramework.PropertyTypes.DataSet
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function populateDataset(dataset: DataSet) {
  console.log("DATASET", dataset)

  const items : any[] = []
  
  dataset.sortedRecordIds.map( (recordID) => {
    
    const recordToAdd : any = {}

    dataset.columns.map( (column : any) => {
    
      recordToAdd[column.name] = dataset.records[recordID].getValue(column.name)
      
    })
    
    recordToAdd.recordID = dataset.records[recordID].getRecordId()
    items.push(recordToAdd)
    
  })

  return items

}

export function generateOutputObject(row: ComponentFramework.PropertyHelper.DataSetApi.EntityRecord, dataset: DataSet) {

  console.log("HITTING GENERATE OUTPUT OBJECT")
  const outputObject: Record<string, string | number | boolean | number[] | undefined> = {};
  dataset.columns.forEach((c) => {
      
      const value = getRowValue(row, c);
      console.log("VALUE FROM GOO: ", value)
      outputObject[c.displayName || c.name] = value;
  
    });
  
    return outputObject;
  
  }


    function  getRowValue(
    row: ComponentFramework.PropertyHelper.DataSetApi.EntityRecord,
    column: ComponentFramework.PropertyHelper.DataSetApi.Column,
    ) {
        console.log("ROW getRowValue: ", row);
        console.log("COLUMN getRowValue: ", column);
        console.log("COLUMN DATA TYPE", column.dataType)
    switch (column.dataType) {
        // Number Types
        case 'TwoOptions':
            return row.getValue(column.name) as boolean;
        case 'Whole.None':
        case 'Currency':
        case 'Decimal':
        case 'FP':
        case 'Whole.Duration':
            return row.getValue(column.name) as number;
        // String Types
        case 'SingleLine.Text':
        case 'SingleLine.Email':
        case 'SingleLine.Phone':
        case 'SingleLine.Ticker':
        case 'SingleLine.URL':
        case 'SingleLine.TextArea':
        case 'Multiple':
            return row.getFormattedValue(column.name);
        // Date Types
        case 'DateAndTime.DateOnly':
        case 'DateAndTime.DateAndTime':
            return (row.getValue(column.name) as Date)?.toISOString();
        // Choice Types
        case 'OptionSet':
            // TODO: Can we return an enum?
            return row.getFormattedValue(column.name) as string;
        case 'MultiSelectPicklist':
            return row.getValue(column.name) as number[];
        // Lookup Types
        case 'Lookup.Simple':
        case 'Lookup.Customer':
        case 'Lookup.Owner':
        case 'Whole.TimeZone':
        case 'Whole.Language':
            return row.getFormattedValue(column.name);
    }
    }



    export function generateOutputObjectSchema(context: ComponentFramework.Context<any>, data: DataSet, currentSchema: any) {
      
        console.log("TESTING SCHEMA UPDATE")
        const newSchema = JSON.stringify(getInputSchema(context, data));
        console.log("GENERATED SCHEMA", newSchema)
        if (newSchema !== currentSchema) {
            console.log("NEW SCHEMA", newSchema)
            return newSchema
        } else return currentSchema
    }
    

    export function generateOutputSchema(context: ComponentFramework.Context<any>, outputDataset: DataSet): Promise<Record<string, unknown>> {

     

      const outputObjectSchema: JSONSchema4 = {
          $schema: 'http://json-schema.org/draft-04/schema#',
          title: 'outputObject',
          type: 'object',
          properties: getInputSchema(context,  outputDataset),
      };

      return Promise.resolve({
          outputObject: outputObjectSchema,
      });
  }


  export function inputSchemaHasChanged() {

  }


   export function getInputSchema(context: ComponentFramework.Context<any>,  inputDataset: DataSet) {
    
    const columnProperties: Record<string, any> = {};
    inputDataset.columns
        .filter((c) => !c.isHidden && (c.displayName || c.name))
        .forEach((c) => {
            const properties = getColumnSchema(c);
            columnProperties[c.displayName || c.name] = properties;
        });

        console.log("COLUMN PROPERTIES: ", columnProperties)

    return columnProperties;
    }


    function getColumnSchema(column: ComponentFramework.PropertyHelper.DataSetApi.Column): JSONSchema4 {
      switch (column.dataType) {
          // Number Types
          case 'TwoOptions':
              return { type: 'boolean' };
          case 'Whole.None':
              return { type: 'integer' };
          case 'Currency':
          case 'Decimal':
          case 'FP':
          case 'Whole.Duration':
              return { type: 'number' };
          // String Types
          case 'SingleLine.Text':
          case 'SingleLine.Email':
          case 'SingleLine.Phone':
          case 'SingleLine.Ticker':
          case 'SingleLine.URL':
          case 'SingleLine.TextArea':
          case 'Multiple':
              return { type: 'string' };
          // Other Types
          case 'DateAndTime.DateOnly':
          case 'DateAndTime.DateAndTime':
              return {
                  type: 'string',
                  format: 'date-time',
              };
          // Choice Types
          case 'OptionSet':
              // TODO: Can we return an enum type dynamically?
              return { type: 'string' };
          case 'MultiSelectPicklist':
              return {
                  type: 'array',
                  items: {
                      type: 'number',
                  },
              };
          // Lookup Types
          case 'Lookup.Simple':
          case 'Lookup.Customer':
          case 'Lookup.Owner':
              // TODO: What is the schema for lookups?
              return { type: 'string' };
          // Other Types
          case 'Whole.TimeZone':
          case 'Whole.Language':
              return { type: 'string' };
      }
      return { type: 'string' };
  }
  
  
    
// imports

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import DataTableComponent, { DataTableProps } from "./DataTable";
import * as React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Button, colors } from "@mui/material";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import { JSONSchema4 } from "json-schema";
import { populateDataset } from "../../utils";
export class DataTable
  implements ComponentFramework.ReactControl<IInputs, IOutputs>
{
  // Declare variables

  private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
  context: ComponentFramework.Context<IInputs>;
  private notifyOutputChanged: () => void;
  private _selectedRecords: any[] = [];
  private _columnWidthTable: any[] = [];
  private _columnOverrides: any[] = [];
  private _pageNumber = 0;
  private _columnVisibility: any = {};
  private outputType: string = "";
  private outputValue: string = "";
  private compOutputObj: any = {};
  private inputSchema: string = "";
  private tableColumns: any[] = [];
  private columnProperties: Record<string, JSONSchema4>;
  private _tableData: any[] = []

  // Function to check if column visibility defaults have changed, and update local variable if so

  updateColVisibility = () => {
    
    if (this.context.updatedProperties.indexOf("columnVisibility_dataset") > -1) {

      
      const colVis: any = {
        recordID: false,
      };
  
      this.context.parameters.columnVisibility.sortedRecordIds.map((recordID: any) => {
        colVis[
          this.context.parameters.columnVisibility.records[recordID].getFormattedValue(
            "columnName"
          )
        ] =
          this.context.parameters.columnVisibility.records[recordID].getValue(
            "isVisible"
          );
      });
      this._columnVisibility = colVis;
  
  
      }
    
  }

  // Function to check if column width defaults have changed, and update local variable if so
  
  updateColWidth = () => {

    if (this.context.updatedProperties.indexOf("columnWidthTable_dataset") > -1) {
    
      this._columnWidthTable = [];

    this.context.parameters.columnWidthTable.sortedRecordIds.forEach((id) => {
      const objToAdd: any = {};
      objToAdd.columnName =
        this.context.parameters.columnWidthTable.records[id].getFormattedValue(
          "columnName"
        );
      objToAdd.columnWidth =
        this.context.parameters.columnWidthTable.records[id].getFormattedValue(
          "columnWidth"
        );

      this._columnWidthTable.push(objToAdd);
    });

  }
}

  // Function to run whenever an option is selected from a split button rendered in data table, to update output properties based on selection

  onOptionSelect = (recordID: any, outputType: string, optionValue: string) => {
    
    console.log("DATA TABLE - On option select triggered")
    this.outputType = outputType;
    this.outputValue = optionValue;
    
    this.compOutputObj = this.getOutputObjectRecord(
    
      this.context.parameters.tableData.records[recordID]
    
    );


    this.notifyOutputChanged();

    setTimeout(() => {
      
      this.context.events.onOptionSelected()
      
    }, 500);

  };

  // Function to update the selected records when useEffect is triggered from TSX

  setSelectedRecords = (selectedRecordIDS: any[]) => {

    this._selectedRecords = [];

    // If there is 1 or more selected records, set the component selected records, otherwise clear selected records

    if (selectedRecordIDS.length > 0) {
      
      this.context.parameters.tableData.setSelectedRecordIds(selectedRecordIDS);
    
    } else {
    

      this.context.parameters.tableData.clearSelectedRecordIds();

    }

    this.notifyOutputChanged();
  };


  updateTableData = () => {

    if (this.context.updatedProperties.indexOf("dataset") > -1 || (this.context.parameters.tableData.sortedRecordIds.length > this._tableData.length)) {

      this._tableData = populateDataset(this.context.parameters.tableData);
    
      // Loop through each column to get the column info and use it to creat a correctly typed object to use for the column in MUI's data grid

      
    const tableColumns: GridColDef<typeof this._tableData>[] = [];

    // Start loop through columns

    this.context.parameters.tableData.columns.map((column) => {
      // Search for matching record in column width table

      const matchingObjs = this._columnWidthTable.filter((columnFilter) => {
        return column.name == columnFilter.columnName;
      });

      // If there is a matching record in column width table, set colWidth variable to that width, otherwise, set it to 250

      const colWidth =
        matchingObjs.length > 0 ? matchingObjs[0].columnWidth : 250;

      // Search for matching record in columnOverrides table

      // Generate columnOverrides table from dataset
      this._columnOverrides = [];

      this.context.parameters.columnOverrides.sortedRecordIds.forEach(
        (recordID: any) => {
          const _record = this.context.parameters.columnOverrides.records[recordID];

          const acceptableFields = [
            "columnName",
            "backgroundColor",
            "componentType",
            "fontColor",
            "isDisabled",
            "colorGenerator",
            "optionsList",
            "componentWidth",
            "componentHeight",
          ];

          const recordToAdd: any = {
            recordID:
              this.context.parameters.columnOverrides.records[
                recordID
              ].getRecordId(),
          };

          acceptableFields.map((field) => {
            recordToAdd[field] = _record.getValue(field);
          });

          this._columnOverrides.push(recordToAdd);
        }
      );

      // Search for matching column override

      const matchingOverride = this._columnOverrides.filter((override) => {
        return column.name == override.columnName;
      });

      // If the column name is not id, add the field, headerName, width, and display to columnToAdd object

      if (column.name != "id") {
        const columnToAdd: any = {};
        columnToAdd.field = column.name;
        columnToAdd.headerName = column.displayName;
        columnToAdd.width = colWidth;
        columnToAdd.display = "flex";
        matchingOverride.length > 0
          ? (columnToAdd.matchingOverride = matchingOverride[0])
          : "";

        tableColumns.push(columnToAdd);
      }
    });

    tableColumns.push({ field: "recordID", headerName: "recordID", width: 50 });
    this.tableColumns = tableColumns

    }


  }

  constructor() {}

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary
  ): void {
    this.notifyOutputChanged = notifyOutputChanged;
    this.context = context;
  }

  // Update view portion of component lifecycle. Called when any property is changed. Causes re-render.

  public updateView(
  
    context: ComponentFramework.Context<IInputs>
  
  ): React.ReactElement {
    
    this.updateInputSchemaIfChanged();

    // Set default column visibility properties

    this.updateColVisibility()
    
    // Set page size to 2000. Temporary measure, will eventually include more advanced pagination.

    if ( context.parameters.tableData.paging.pageSize !== 2000 ) {

      context.parameters.tableData.paging.setPageSize(2000);
    
    }


    // Set default column width props

    this.updateColWidth()
    
    console.log("UPDATED PROPS: ", context.updatedProperties)
    
    //  Populate Table data

   this.updateTableData()


    



    const props: DataTableProps = {
      tableData: this._tableData,
      tableColumns: this.tableColumns,
      height: context.parameters.containerHeight.raw || 500,
      width: context.parameters.containerWidth.raw || 500,
      setSelectedRecords: this.setSelectedRecords,
      defaultColumnWidths: this._columnWidthTable,
      useDarkMode: context.parameters.useDarkMode.raw,
      allowSelectMultiple: context.parameters.allowSelectMultiple.raw,
      pageSize: context.parameters.tableData.paging.pageSize,
      pageNumber: this._pageNumber,
      totalRowCount: context.parameters.tableData.paging.totalResultCount,
      onOptionSelect: this.onOptionSelect,
      columnVisibility: this._columnVisibility,
      hideFooter: context.parameters.hideFooter.raw,
      showCheckboxes: context.parameters.showCheckboxes.raw,
      noRowsText: context.parameters.noRowsText.raw || "No results found",
    };

    console.log("DATA TABLE PROPS FROM INDEX.TS", props);

    return React.createElement(DataTableComponent, props);
  }

  public getOutputs(): IOutputs {
    console.log("INPUT SCHEMA on get outputs", this.inputSchema);
    return {
      changeType: this.outputType,
      outputObject: this.compOutputObj,
      outputObjectSchema: this.inputSchema,
      outputValue: this.outputValue,
    };
  }
  public destroy(): void {}

  private getOutputObjectRecord(
    row: ComponentFramework.PropertyHelper.DataSetApi.EntityRecord
  ) {
    const outputObject: Record<
      string,
      string | number | boolean | number[] | undefined
    > = {};
    this.context.parameters.tableData.columns.forEach((c) => {
      const value = this.getRowValue(row, c);
      outputObject[c.displayName || c.name] = value;
    });
    return outputObject;
  }

  private getRowValue(
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

  public async getOutputSchema(
    context: ComponentFramework.Context<IInputs>
  ): Promise<Record<string, unknown>> {
    const outputObjectSchema: JSONSchema4 = {
      $schema: "http://json-schema.org/draft-04/schema#",
      title: "outputObject",
      type: "object",
      properties: this.columnProperties || this.getInputSchema(context),
    };

    return Promise.resolve({
      outputObject: outputObjectSchema,
    });
  }

  private updateInputSchemaIfChanged() {
    console.log("TESTING SCHEMA UPDATE");
    const newSchema = JSON.stringify(this.getInputSchema(this.context));
    if (newSchema !== this.inputSchema) {
      console.log("NEW SCHEMA", newSchema);
      this.inputSchema = newSchema;
      //this.compOutputObj = undefined;
      this.notifyOutputChanged();
    }
  }

  private getInputSchema(context: ComponentFramework.Context<IInputs>) {
    const dataset = context.parameters.tableData;
    const columnProperties: Record<string, any> = {};
    dataset.columns
      .filter((c) => !c.isHidden && (c.displayName || c.name))
      .forEach((c) => {
        const properties = this.getColumnSchema(c);
        columnProperties[c.displayName || c.name] = properties;
      });
    this.columnProperties = columnProperties;
    return columnProperties;
  }

  private getColumnSchema(
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
}

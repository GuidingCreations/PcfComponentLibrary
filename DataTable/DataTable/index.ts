/* eslint-disable */

// imports

import { GridColDef, GridRenderCellParams, GridFilterModel, getGridStringOperators, getGridDateOperators, getGridNumericOperators } from "@mui/x-data-grid";
import DataTableComponent, { DataTableProps, paginationModelType } from "./DataTable";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { populateDataset } from "../../utils";
import { JSONSchema4 } from "json-schema";
import * as React from "react";

export class DataTable implements ComponentFramework.ReactControl<IInputs, IOutputs> {
  
  // Declare variables

  context: ComponentFramework.Context<IInputs>;
  private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
  private notifyOutputChanged: () => void;
  private _selectedRecords: any[] = [];
  private _columnWidthTable: any[] = [];
  private _columnOverrides: any[] = [];
  private _pageNumber = 0;
  private _columnVisibility: any = {
    recordID: false
  };
  private outputType: string = "";
  private outputValue: string = "";
  private compOutputObj: any = {};
  private inputSchema: string = "";
  private tableColumns: any[] = [];
  private columnProperties: Record<string, JSONSchema4>;
  private _tableData: any[] = []
  private _isLoading : boolean = true;

 getApplicableMuiFilterOperators (dataType: string, isServerSide: boolean ) {

  let operators : any =[];

  switch (dataType) {
    
    case "DateAndTime.DateAndTime":

    let dateOperatorsToExclude = ["isNotEmpty", "is",  "not", "after", "before", "onOrBefore"]


    operators = isServerSide ? getGridDateOperators(true).filter((operator) => !dateOperatorsToExclude.includes(operator.value)) : getGridDateOperators(true)

    break;

    case "SingleLine.Text" :
      
      let stringOperatorsToExclude = [
          "doesNotContain"
      ];
      operators = isServerSide ? getGridStringOperators().filter((operator) => !stringOperatorsToExclude.includes(operator.value))  : getGridStringOperators();
    break;

    

    case "Decimal" :

    let operatorsToExclude = [ "isNotEmpty"];

    operators = isServerSide ? getGridNumericOperators().filter( (operator) => !operatorsToExclude.includes(operator.value)) : getGridNumericOperators()

    break;

    default:  
        stringOperatorsToExclude = [
            "doesNotContain",
            "isAnyOf" 
      ];
      operators = isServerSide ? getGridStringOperators().filter((operator) => !stringOperatorsToExclude.includes(operator.value))  : getGridStringOperators();
    break;
      


    
  }
  
  return operators

}

  // Function to run when the filter model in the data table changes - will only be effective in Dataverse

  private onFilterModelChange = (filterModel: GridFilterModel) => {
    
    console.log("FILTER MODEL CHANGE: ", filterModel)

    if (this.context.parameters.useServerSide.raw) {  
      
      if (filterModel.items.length == 0) {
        
        this.context.parameters.tableData.filtering.clearFilter()
      
      } else {
        
        filterModel.items.forEach((filterItem) => {
        
        const operator = filterItem.operator
        
        this.context.parameters.tableData.filtering.setFilter({
          
          filterOperator: 0,
          conditions: [
            {
              attributeName: filterItem.field,
            
              conditionOperator: 
              operator == "contains" ? 49 :
              operator == "equals" ? 0 :
              operator == "doesNotEqual" ? 1 :
              operator == "isEmpty" ? 12 :
              operator == "onOrAfter" ? 27 :
              operator == "onOrBefore" ? 26 :
              operator == "is" ? 0 :
              operator == "not" ? 1 :
              operator == "after" ? 2 :
              operator == "before" ? 2 :
              operator == "onOrBefore" ? 26 :
              operator == "!=" ? 1 :
              operator == ">" ? 2 :
              operator == "<" ? 3 :
              operator == ">=" ? 4 :
              operator == "<=" ? 5 :
              operator == "isNotEmpty" ? 13 as DataSetInterfaces.Types.ConditionOperator :
              operator == "startsWith" ? 54 as DataSetInterfaces.Types.ConditionOperator :
              operator == "endsWith" ? 56 as DataSetInterfaces.Types.ConditionOperator :
              operator == "isAnyOf" ? 87 as DataSetInterfaces.Types.ConditionOperator

              
              
              : 0
              
              ,
              value:  filterItem.value
            }
          ]
        })
      });
      };

    this.context.parameters.tableData.refresh();
    console.log("FILTER RESULT: ", populateDataset(this.context.parameters.tableData))
  }
    
  }

  // Pagination model state

  private paginationModel : paginationModelType = {
    page: 1,
    pageSize: 25
  }

  // Function to run when pagination model changes to pull new records. Only effective when useServerSidePagination is set to true


  private onPaginationModelChange = (paginationModel : paginationModelType) => {
    this.paginationModel = {
      page: paginationModel.page + 1,
      pageSize: !this.context.parameters.isDelegable.raw ? 100000 : paginationModel.pageSize
    }

    this.context.parameters.tableData.paging.setPageSize(this.paginationModel.pageSize);
    this.context.parameters.tableData.paging.loadExactPage(paginationModel.page + 1);

  }

  // Function to check if column visibility defaults have changed, and update local variable if so

  updateColVisibility = () => {

    // Get current number of objects in columnVisibility object and compare new number
    
    const currentLength = Object.keys(this._columnVisibility).length;
    const newLength = this.context.parameters.columnVisibility.sortedRecordIds.length

    const needsUpdated = this.context.updatedProperties.indexOf("columnVisibility_dataset") > -1 || newLength > currentLength

    if (needsUpdated) {

      // Update column visibility

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

    // Check if column width needs to be updated

    const needsUpdated = 
      this.context.updatedProperties.indexOf("columnWidthTable_dataset") > -1 || 
      this.context.parameters.columnWidthTable.sortedRecordIds.length > this._columnWidthTable.length

    if (needsUpdated) {
    
      // Update column width

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

  onOptionSelect = (outputType: string, optionValue: string, recordID: any) => {
    
    this.outputType = outputType;
    this.outputValue = optionValue;
    this.compOutputObj = this.getOutputObjectRecord(this.context.parameters.tableData.records[recordID]);

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
    
    // If the dataset has been updated, pull latest data

    const propsToCheck = ['dataset', 'records', 'columnOverrides_dataset', 'columnOverrides_records', 'columnWidthTable_dataset', 'columnWidthTable_records', 'columnVisibility_dataset', 'columnVisibility_records']
    const needsUpdated = propsToCheck.some((prop) => this.context.updatedProperties.includes(prop))

    if (needsUpdated || this.context.parameters.tableData.sortedRecordIds.length != this._tableData.length) {


      const tablePageSize = !this.context.parameters.isDelegable.raw ? 100000 : this.paginationModel.pageSize
      
      if (!this.context.parameters.isDelegable.raw) {
        this.context.parameters.tableData.paging.setPageSize(tablePageSize)
      } else {
        this.context.parameters.tableData.paging.setPageSize(this.paginationModel.pageSize)
       }

      // update actual table data  
     
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

      // Generate columnOverrides table from dataset
      
      this._columnOverrides = [];

      this.context.parameters.columnOverrides.sortedRecordIds.forEach(
        (recordID: any) => {
          const _record = this.context.parameters.columnOverrides.records[recordID];

          // List of acceptable fields to map over, in arr format, so they can be added to easily

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
            "formatType",
            "newName"
          ];

          // Add a static recordID field with the guid populated by the dataset

          const recordToAdd: any = { recordID: this.context.parameters.columnOverrides.records[ recordID ].getRecordId() };

          // Map over acceptableFields array to establish values for column override
          
          acceptableFields.map( ( field ) => { recordToAdd[ field ] = _record.getValue( field ) } );

          // Add to column overrides table

          this._columnOverrides.push(recordToAdd);
        }
      
      );

      // Search for matching column override

      const matchingOverride = this._columnOverrides.filter((override) => { return column.name == override.columnName } );

      // If the column name is not id, add the field, headerName, width, and display to columnToAdd object, as well as adjust filter operators for server-side pagination if needed

     
      const dataType = column.dataType;

      const operators = this.getApplicableMuiFilterOperators(dataType, this.context.parameters.useServerSide.raw)


      if (column.name != "id") {
        const columnToAdd: any = {};
        columnToAdd.field = column.name;
        columnToAdd.filterOperators = operators
        columnToAdd.headerName = matchingOverride[0]?.newName ?? column.displayName;
        columnToAdd.width = colWidth;
        columnToAdd.display = "flex";
        columnToAdd.valueFormatter =  function(params : any ) {
          const isCurrency = matchingOverride[0]?.formatType?.toLowerCase() == "currency"
          const value = isCurrency ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
          }).format(params) : params
          return value
        }
        matchingOverride.length > 0
          ? (columnToAdd.matchingOverride = matchingOverride[0])
          : "";
        tableColumns.push(columnToAdd);
      }
      });

    tableColumns.push({ field: "recordID", headerName: "recordID", width: 50, filterable: false });
    
    
    this.tableColumns = tableColumns

    this._isLoading = false
    
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
    this._isLoading = true;
    this.paginationModel = {
      page: 1,
      pageSize: !this.context.parameters.isDelegable.raw ? 100000 : 25
    }
    
  }

  // Update view portion of component lifecycle. Called when any property is changed. Causes re-render.

  public updateView(
  
    context: ComponentFramework.Context<IInputs>
  
  ): React.ReactElement {

    if (!context.parameters.useServerSide.raw && context.parameters.tableData.paging.pageSize != this.paginationModel.pageSize && context.parameters.isDelegable.raw) {
      context.parameters.tableData.paging.setPageSize(this.paginationModel.pageSize);
    }

    this.updateInputSchemaIfChanged();
    
    // Set default column visibility properties

    this.updateColVisibility()

    // update column width tables

    this.updateColWidth()
    
    //  Populate Table data

    this.updateTableData()

    context.mode.trackContainerResize(true);

    const compResultCount = !context.parameters.isDelegable.raw ? this._tableData.length : context.parameters.useServerSide.raw ? context.parameters.tableData.paging.hasNextPage ? -1 : (context.parameters.tableData.paging.pageSize - 1 * this.paginationModel.page) + this._tableData.length : context.parameters.tableData.paging.totalResultCount
    const props: DataTableProps = {
      showToolbar: context.parameters.showToolbar.raw,
      isDelegable: context.parameters.isDelegable.raw,
      tableData: this._tableData,
      tableColumns: this.tableColumns,
      height: context.mode.allocatedHeight,
      width: context.mode.allocatedWidth,
      setSelectedRecords: this.setSelectedRecords,
      defaultColumnWidths: this._columnWidthTable,
      useDarkMode: context.parameters.useDarkMode.raw,
      allowSelectMultiple: context.parameters.allowSelectMultiple.raw,
      pageSize: context.parameters.tableData.paging.pageSize,
      pageNumber: this._pageNumber,
      totalRowCount: compResultCount,
      onOptionSelect: this.onOptionSelect,
      columnVisibility: this._columnVisibility,
      hideFooter: context.parameters.hideFooter.raw,
      showCheckboxes: context.parameters.showCheckboxes.raw,
      noRowsText: context.parameters.noRowsText.raw || "No results found",
      primaryColor: context.parameters.primaryColor.raw || 'Green',
      useTheming: context.parameters.useTheming.raw,
      paginationModel: this.paginationModel,
      useTestData: context.parameters.useTestData.raw,
      onPaginationModelChange: this.onPaginationModelChange,
      onFilterModelChange: this.onFilterModelChange,
      datasetLoading: this.context.parameters.tableData.loading || this._isLoading || this.context.parameters.columnOverrides.loading || this.context.parameters.columnVisibility.loading || this.context.parameters.columnWidthTable.loading,
      useServerSidepagination: context.parameters.useServerSide.raw,
      showQuickFilter: context.parameters.showQuickFilter.raw
      
    };
    
    return React.createElement(DataTableComponent, props);
  }

  public getOutputs(): IOutputs {
   
    return {
      changeType: this.outputType,
      outputObject: this.compOutputObj,
      outputObjectSchema: this.inputSchema,
      outputValue: this.outputValue,
    };
  
  }
  public destroy(): void {
    this.context.parameters.tableData.clearSelectedRecordIds()
  }

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
    const newSchema = JSON.stringify(this.getInputSchema(this.context));
    if (newSchema !== this.inputSchema) {
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

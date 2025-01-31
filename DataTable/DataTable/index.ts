// imports

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import DataTableComponent, { DataTableProps } from "./DataTable";
import * as React from "react";
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;

export class DataTable implements ComponentFramework.ReactControl<IInputs, IOutputs> {

// Declare variables

    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private _tableData : any[] = []
    private _selectedRecords : any[] = [];
    private _columnWidthTable: any[] = [];
    private _columnOverrides: any[] = [];
    context: ComponentFramework.Context<IInputs>

// Function to update the selected records when useEffect is triggered from TSX

    setSelectedRecords = (selectedRecordIDS: any[]) => {

        this._selectedRecords = [];

// If there is 1 or more selected records, set the component selected records, otherwise clear selected records

        if(selectedRecordIDS.length > 0) {
            this.context.parameters.tableData.setSelectedRecordIds(selectedRecordIDS)
        } else {
            this.context.parameters.tableData.clearSelectedRecordIds()
        }
         
        this.notifyOutputChanged()
    
    }

// Empty constructor

    constructor() { }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context;
    }

// Update view portion of component lifecycle. Called when any property is changed. Causes re-render.

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        this._tableData = [];

// Set page size to 2000. Temporary measure, will eventually include more advanced pagination.

        context.parameters.tableData.paging.setPageSize(2000);

//  Loop through each id in sortedRecordsIds

        context.parameters.tableData.sortedRecordIds.forEach( (recordID) => {
 
// Create recordToAdd object and give it the same ID from the dataset

            const recordToAdd : any = {recordID: context.parameters.tableData.records[recordID].getRecordId()};

// Loop through the columns and retrieve the relevant value for the record, then append that property to the recordToAdd object

            context.parameters.tableData.columns.map( (column) => {
                
                const propName : string = column.name;
                recordToAdd[propName] = context.parameters.tableData.records[recordID].getFormattedValue(`${column.name}`);
            
            })

// Push record to tableData

            this._tableData.push(recordToAdd)
            
        })

// Generate column width table from passed in prop

        this._columnWidthTable = [];

        context.parameters.columnWidthTable.sortedRecordIds.forEach((id) => {
            
            const objToAdd : any = {};
            objToAdd.columnName = context.parameters.columnWidthTable.records[id].getFormattedValue("columnName");
            objToAdd.columnWidth = context.parameters.columnWidthTable.records[id].getFormattedValue("columnWidth");

            this._columnWidthTable.push(objToAdd)
        })

// Loop through each column to get the column info and use it to creat a correctly typed object to use for the column in MUI's data grid


        const tableColumns : GridColDef<typeof this._tableData>[] =[];

// Start loop through columns

        context.parameters.tableData.columns.map( (column) => {

            // Search for matching record in column width table

            const matchingObjs = this._columnWidthTable.filter((columnFilter) => {
                return column.name == columnFilter.columnName
            })

            // If there is a matching record in column width table, set colWidth variable to that width, otherwise, set it to 250

                const colWidth = matchingObjs.length > 0 ?  matchingObjs[0].columnWidth : 250

            // Search for matching record in columnOverrides table

          // Generate columnOverrides table from dataset
        
          this._columnOverrides = [];

            context.parameters.columnOverrides.sortedRecordIds.forEach((id) => {
            
            const objToAdd : any = {};
            
            objToAdd.componentType = context.parameters.columnOverrides.records[id].getFormattedValue("componentType");
            objToAdd.columnName = context.parameters.columnOverrides.records[id].getFormattedValue("columnName")

            this._columnOverrides.push(objToAdd)
        })  

        // Search for matching column override

        const matchingOverride = this._columnOverrides.filter((override) => {
            return column.name == override.columnName
        })

        console.log("MATCHING OVERRIDE - ", matchingOverride)
            
            // If the column name is not id, add the field, headerName, width, and display to columnToAdd object

            if (column.name != "id") {

                const columnToAdd : any = {};
                columnToAdd.field = column.name;
                columnToAdd.headerName = column.displayName;
                columnToAdd.width = colWidth;
                columnToAdd.display = 'flex'
                matchingOverride.length > 0 ? columnToAdd.matchingOverride = matchingOverride[0] : ''
                
                
                tableColumns.push(columnToAdd)
            }
        });

        tableColumns.push({field: "recordID", headerName: "recordID", width: 50})


        console.log("COMP ITEMS COLUMNS", context.parameters.tableData.columns)
        console.log("COLUMNS", tableColumns);
        console.log("DATA");
       

        




        const props : DataTableProps = {
            tableData: this._tableData,
            tableColumns: tableColumns,
            height: context.parameters.containerHeight.raw || 500,
            width: context.parameters.containerWidth.raw || 500,
            setSelectedRecords: this.setSelectedRecords,
            defaultColumnWidths: this._columnWidthTable,
            useDarkMode: context.parameters.useDarkMode.raw,
            allowSelectMultiple: context.parameters.allowSelectMultiple.raw
        }


        return React.createElement(
            DataTableComponent, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {
        };
    }
    public destroy(): void {
    }
}

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import DataTableComponent, { DataTableProps } from "./DataTable";
import * as React from "react";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import { GridColDef } from '@mui/x-data-grid';
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class DataTable implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private _tableData : any[] = []
    private _selectedRecords : any[] = [];
    private _columnWidthTable: any[] = [];
    context: ComponentFramework.Context<IInputs>

    setSelectedRecords = (selectedRecordIDS: any[]) => {
        console.log("PARAMS", this.context.parameters)
        console.log("SELECTED RECORD IDS", selectedRecordIDS)
        this._selectedRecords = [];
        if(selectedRecordIDS.length > 0) {

            this.context.parameters.tableData.setSelectedRecordIds(selectedRecordIDS)
        } else {
            this.context.parameters.tableData.clearSelectedRecordIds()
        }
        
        
        
        this.notifyOutputChanged()
    }


    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context;
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        
        this._tableData = [];

        const totalCount = context.parameters.tableData.paging.totalResultCount
        console.log("TOTAL COUNT", context.parameters.tableData.paging.totalResultCount) 
        context.parameters.tableData.paging.setPageSize(2000);
        console.log("page size", context.parameters.tableData.paging.pageSize)


        console.log("ATTEMPTING TO ADD NUMBER OF RECORDS :", context.parameters.tableData.sortedRecordIds.length )

        context.parameters.tableData.sortedRecordIds.forEach( (recordID) => {
            console.log("HIT RECORD MAP")
            const recordToAdd : any = {recordID: context.parameters.tableData.records[recordID].getRecordId()};

            context.parameters.tableData.columns.map( (column) => {
                const propName : string = column.name;
              


                recordToAdd[propName] = context.parameters.tableData.records[recordID].getFormattedValue(`${column.name}`);
            })

            this._tableData.push(recordToAdd)
            
        })

        this._columnWidthTable = [];

        context.parameters.columnWidthTable.sortedRecordIds.forEach((id) => {
            const objToAdd : any = {};
            objToAdd.columnName = context.parameters.columnWidthTable.records[id].getFormattedValue("columnName");
            objToAdd.columnWidth = context.parameters.columnWidthTable.records[id].getFormattedValue("columnWidth");

            this._columnWidthTable.push(objToAdd)
        })
        
        const tableColumns : GridColDef<typeof this._tableData>[] =[];

        context.parameters.tableData.columns.map( (column) => {

            const matchingObjs = this._columnWidthTable.filter((columnFilter) => {
                return column.name == columnFilter.columnName
            })

            

                const colWidth = matchingObjs.length > 0 ?  matchingObjs[0].columnWidth : 250
            


            if (column.name != "id") {

                const columnToAdd : any = {};
                columnToAdd.field = column.name;
                columnToAdd.headerName = column.displayName;
                columnToAdd.width = colWidth;
                columnToAdd.display = 'flex'
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
            outputTest: this.context.parameters.tableData.getSelectedRecordIds()[0]
        };
    }
    public destroy(): void {
    }
}
